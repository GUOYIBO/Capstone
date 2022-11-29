from flask import Blueprint, request
from app.models import Item, User, db, UserItem
from flask_login import login_required, current_user
from app.forms import ItemForm, ItemTypeForm
from datetime import datetime, timedelta
from app.api.aws_utils import delete_file_from_s3
import json


itemtype_routes = Blueprint('itemtypes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages



# edit
@itemtype_routes.route('/int:<itemtype_id>', methods=['POST'])
@login_required
def edit_an_itemtype(itemtype_id):
    item_type = Item.query.filter(Item.id == itemtype_id).first()
    if item_type:
        form = ItemForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if (form.validate_on_submit()):
            form.populate_obj(item_type)
            db.session.commit()
            return {"result": item_type.to_dict()}, 200
        else :
            return { "errors": validation_errors_to_error_messages(form.errors)}, 400

    return {'errors': 'item type not found'},404
    


# delete an item type
@itemtype_routes.route('/int:<itemtype_id>', methods=['DELETE'])
@login_required
def delete_an_itemtype(itemtype_id):
    item_type = Item.query.filter(Item.id == itemtype_id).first()
    print ("being deleted item type ", item_type)
    if not item_type:
        return { "errors": "item type not found"}, 404
    else:
        file_name = item_type.image_url
        #  delete bucket
        res = delete_file_from_s3(file_name)['result']
        if res:
            db.session.delete(item_type)
            db.session.commit()
            return { "message": "item type successfully deleted"}, 200

        else:
            return {"errors": "deleting file from bucket failed "},


