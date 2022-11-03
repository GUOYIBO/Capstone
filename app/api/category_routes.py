from flask import Blueprint, request
from app.models import Category, Item, User, db
from flask_login import login_required, current_user
from app.forms import CategoryForm


category_routes = Blueprint('categories', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages


@category_routes.route('/current')
@login_required
def get_categories():
    print("-///////////////")
    user_id = current_user.id
    print("----------", user_id)
    #### TODO
    categories = Category.query.filter(Category.user_id == user_id).all()
    print ('user category #########  ', categories)
    return { "result": [category.to_dict() for category in categories]}

# create/edit a category
@category_routes.route('/', methods=['POST'])
@login_required
def create_category():
    print("from here-------") 
    user_id = current_user.id
    form = CategoryForm()
    print('get form data for creating a category', form.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if (form.validate_on_submit()):
        category = Category()
        form.populate_obj(category)
        category.user_id = user_id
        db.session.add(category)
        db.session.commit()
        return { "result": category.to_dict()}, 201
    else:
        return { "errors": validation_errors_to_error_messages(form.errors)}, 400


@category_routes.route('/<int:category_id>', methods=['POST'])
@login_required
def update_category(category_id):
   
    user_id = current_user.id
    category = Category.query.filter(Category.id==category_id).first()
    print('modify category ', category)
    if category:
        form = CategoryForm()
        print('modify category  data form', form)
        form['csrf_token'].data = request.cookies['csrf_token']
        if (form.validate_on_submit()):
            form.populate_obj(category)
            db.session.commit()
            return { "result": category.to_dict()}, 200
        else:
            return { "errors": validation_errors_to_error_messages(form.errors)}, 400
    return  {'errors': "category not found"}, 404 


# delete a category
@category_routes.route('/<int:category_id>', methods=['DELETE'])
@login_required
def delete_category(category_id):
    category = Category.query.filter(Category.id == category_id).first()
    if category is not None:
        db.session.delete(category)
        db.session.commit()
        return { "message": "category successfully deleted"}, 200
    else:
        return { "errors": "category not found"}, 404






