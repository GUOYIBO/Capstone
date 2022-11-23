from flask import Blueprint, request
from app.models import Item, User, db, UserItem
from flask_login import login_required, current_user
from app.forms import ItemForm, ItemTypeForm
from datetime import datetime, timedelta
import json


item_routes = Blueprint('itemtypes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages





@item_routes.route('/int:<itemtype_id>', methods=['DELETE'])
@login_required
def delete_a_itemtype(itemtype_id):
    item = Item.query.filter(Item.id == itemtype_id).first()
    if item:
        db.session.delete(item)
        db.session.commit()
        return { "message": "item type successfully deleted"}, 200
    else:
        return { "errors": "item type not found"}, 404

