from flask import Blueprint, request
from app.models import FavoriteDish, User, db, Item
from flask_login import login_required, current_user
from app.forms import FavoriteDishForm
import json

favorite_dish_routes = Blueprint('favorite_list', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages


# get all dishes of current user
@favorite_dish_routes.route('/current')
@login_required
def get_favorite_dishes():
    user_id = current_user.id
    fav_dishes = FavoriteDish.query.filter(FavoriteDish.user_id == user_id).all()
    return { "result" : [dish.to_dict() for dish in fav_dishes] } ,200


# edit dish
@favorite_dish_routes.route('/<int:dish_id>', methods=['POST'])
@login_required
def update_fav_dish(dish_id):
    fav_dish = FavoriteDish.query.filter(FavoriteDish.id == dish_id).first()
    data = json.loads(request.data)
    item_ids = data['item_ids']

    item_ids = data['item_ids']
    name= data['name']
    image_url=data['image_url']

    print('jjjjjjjjjjjjj', item_ids )
    print('jjjjjjjjjjjjj', name )
    print('jjjjjjjjjjjjj', image_url )
    if name:
        fav_dish.name=name
    if image_url:
        fav_dish.image_url=image_url
    if item_ids is None or len(item_ids) == 0:
        db.session.commit()
    else:
        if fav_dish.dish_items is not None and len(fav_dish.dish_items)>0 :
            fav_dish.dish_items[:] = [] 
        for key in item_ids:
            if (item_ids[key]):
                item = Item.query.filter(Item.id==key).first()
                fav_dish.dish_items.append(item)
            db.session.commit()
    return {'result': fav_dish.to_dict()}, 200

    


    # if fav_dish.dish_items:
    #     print('********** length before ', len(fav_dish.dish_items))
    #     fav_dish.dish_items[:] = []  
    #     print('********** length after', len(fav_dish.dish_items))
    # for key in item_ids:
    #     print("********** key", key, item_ids[key])
    # if item_ids:
    #     if (item_ids[key]):
    #         item = Item.query.filter(Item.id==key).first()
    #         fav_dish.dish_items.append(item)
    #     db.session.commit()
    # return {'result': fav_dish.to_dict()}, 200



# create a favorite dish
@favorite_dish_routes.route('/new', methods=['POST'])
@login_required
def create_fav_dish():
    data = json.loads(request.data)
    item_ids = data['item_ids']
    name= data['name']
    image_url=data['image_url']
    fav_dish = FavoriteDish(name=name, image_url=image_url, des="",user_id=current_user.id)
    db.session.add(fav_dish)
    db.session.commit()
    print('newly add fav_dish ',fav_dish)
    for item_id in item_ids:
        item = Item.query.filter(Item.id==item_id).first()
        fav_dish.dish_items.append(item)
    db.session.commit()
    return {'result': fav_dish.to_dict()}, 201


# delete a fav_dish
@favorite_dish_routes.route('/<int:dish_id>', methods=['DELETE'])
@login_required
def delete_favorite_dish(dish_id):
    dish = FavoriteDish.query.filter(FavoriteDish.id == dish_id).first()
    if dish is not None:
        db.session.delete(dish)
        db.session.commit()
        return { "message": "favorite dish successfully deleted"}, 200
    else:
        return { "errors": "dish not found"}, 404



    




    
