from app.forms import login_form
from flask import Blueprint, request
from app.models import PurchaseList, db
from app.forms import PurchaseListForm
from flask_login import login_required, current_user

purchase_list_routes = Blueprint('purchase_lists', __name__)



def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@purchase_list_routes.route('/' , methods=['GET'])
@login_required
def get_all():
    user_id = current_user.id
    purchase_lists = PurchaseList.query.filter(PurchaseList.user_id == user_id).all()
    return { "result" : [list.to_dict() for list in purchase_lists] }


# edit a purchase list
@purchase_list_routes.route('/<int:list_id>', methods=['POST'])
@login_required
def edit_purchase_list():
    pass



@purchase_list_routes.route('/', methods=['POST'])
@login_required
def create_purchase_list():
    form = PurchaseListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        list = PurchaseList()
        form.populate_obj(list)
        list.user_id = current_user.id
        db.session.add(list)
        db.commit()
        return { "result": list.to_dict()}, 201

    else:
        return { "errors": validation_errors_to_error_messages(form.errors)}, 400



