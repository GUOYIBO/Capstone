from flask import Blueprint, request
from app.models import FavoriteDish, User, db
from flask_login import login_required, current_user
from app.forms import FavoriteDishForm

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
    user = User.query.get(user_id)
    fav_dishes = user.favorite_dishes
    return { "result" : fav_dishes} ,200


# edit dish
@favorite_dish_routes.route('/<int:dish_id>', methods=['POST'])
@login_required
def update_fav_dish():
    pass


# create a favorite dish
@favorite_dish_routes.route('/', methods=['POST'])
@login_required
def create_fav_dish():
    pass


# delete a fav_dish
@favorite_dish_routes.route('/<int:dish_id>', methods=['DELETE'])
@login_required
def delete_favorite_dish(dish_id):
    dish = FavoriteDish.query.filter(FavoriteDish.id == dish_id).first()
    if dish is not None:
        db.session.delete(dish)
        db.commit()
        return { "message": "favorite dish successfully deleted"}, 200
    else:
        return { "errors": "dish not found"}, 404



    




    
