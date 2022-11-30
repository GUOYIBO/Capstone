from flask import Blueprint, request
from app.models import Category, Item, User, db
from flask_login import login_required, current_user
from app.forms import CategoryForm, ItemTypeForm
from app.api.aws_utils import generate_filename, upload_file, delete_file_from_s3

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


@category_routes.route('/<int:category_id>/itemtypes', methods=['POST'])
@login_required
def create_new_itemtype(category_id):
    print("get file from req1", request.files)

    file = request.files['file']

    print("get file name from req-----", file.filename)
    file.filename = generate_filename(file.filename)
    print('new name: ', file.filename)
    file_url = upload_file(file)["url"]
    print("generated url", file_url)
    form = ItemTypeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        itemtype = Item()
        form.populate_obj(itemtype)
        itemtype.category_id = category_id
        itemtype.image_url = file_url
        db.session.add(itemtype)
        db.session.commit()
        return {"result": itemtype.to_dict()},201
    else:
        return { "errors": validation_errors_to_error_messages(form.errors)}, 400



@category_routes.route('/current')
@login_required
def get_categories():
    user_id = current_user.id
    categories = Category.query.filter(Category.user_id == user_id).all()
    print ('user category #########  ', categories)
    return { "result": [category.to_dict() for category in categories]}



# create/edit a category
@category_routes.route('/', methods=['POST'])
@login_required
def create_category():
    print("from here-------") 
    user_id = current_user.id
    file = request.files['file']
    file.filename = generate_filename(file.filename)
    file_url = upload_file(file)["url"]
    print("generated category url", file_url)
    form = CategoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if (form.validate_on_submit()):
        category = Category()
        form.populate_obj(category)
        category.user_id = user_id
        category.image_url = file_url
        db.session.add(category)
        db.session.commit()
        return { "result": category.to_dict()}, 201
    else:
        return { "errors": validation_errors_to_error_messages(form.errors)}, 400



# edit a category
@category_routes.route('/<int:category_id>', methods=['PUT'])
@login_required
def update_category(category_id):
   
    # user_id = current_user.id
    category = Category.query.filter(Category.id==category_id).first()
    print('modify category ', category)
    if not category:
        return {'errors': 'category not found'},404
    else:
        form = CategoryForm(obj=category)
        form['csrf_token'].data = request.cookies['csrf_token']
        if (form.validate_on_submit()):
            try:
                file = request.files['file']
            except Exception as e:
                print('No file in request', e)
                form.populate_obj(category)
                print('2-category ', category)
                db.session.commit()
                return { "result": category.to_dict()}, 200
            orig_file_name = category.image_url
            if "aws.com/" not in orig_file_name:
                print('this is a local file ',orig_file_name)
            else:
                res = delete_file_from_s3(orig_file_name)['result']
                if res:
                    print('successfully deleted categoy img file  on s3 bucket ',orig_file_name)
                else:
                    print('deleting categoy img file falied on s3 bucket ',orig_file_name)
            file.filename = generate_filename(file.filename)
            file_url = upload_file(file)["url"]
            form.populate_obj(category)
            category.image_url = file_url
            print('1-category ', category)
            db.session.commit()
            return { "result": category.to_dict()}, 200
        else:
            return { "errors": validation_errors_to_error_messages(form.errors)}, 400



    # if category:
    #     form = CategoryForm()
    #     print('modify category  data form', form)
    #     form['csrf_token'].data = request.cookies['csrf_token']
    #     if (form.validate_on_submit()):
    #         form.populate_obj(category)
    #         db.session.commit()
    #         return { "result": category.to_dict()}, 200
    #     else:
    #         return { "errors": validation_errors_to_error_messages(form.errors)}, 401
    # return  {'errors': "category not found"}, 404 


# delete a category
@category_routes.route('/<int:category_id>', methods=['DELETE'])
@login_required
def delete_category(category_id):
    category = Category.query.filter(Category.id == category_id).first()
    if not category:
        return { "errors": "category not found"}, 404
    else:
        file_name = category.image_url
        print('being deleted category filename', file_name)
        if "aws.com/" not in file_name:
            db.session.delete(category)
            db.session.commit()
            print("delete category locally")
            return { "message": "ite type successfully deleted"}, 200
        else:
            res = delete_file_from_s3(file_name)['result']
            print("delete aws bucket res", res)
            if res:
                db.session.delete(category)
                db.session.commit()
                return { "message": "category successfully deleted"}, 200

            else:
                return {"errors": "deleting file from bucket failed "},



    # if category is not None:
    #     db.session.delete(category)
    #     db.session.commit()
    #     return { "message": "category successfully deleted"}, 200
    # else:
    #     return { "errors": "category not found"}, 404






