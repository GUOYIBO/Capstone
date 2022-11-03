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


@purchase_list_routes.route('/current')
@login_required
def get_all():
    user_id = current_user.id
    print("user_id", user_id)
    # user_id =1  ############ TODO  remove after testing
    purchase_lists = PurchaseList.query.filter(PurchaseList.user_id == user_id).all()
    return { "result" : [list.to_dict() for list in purchase_lists] }


# edit a purchase list
@purchase_list_routes.route('/<int:list_id>', methods=['POST'])
@login_required
def edit_purchase_list(list_id):
    pur_list = PurchaseList.query.filter(PurchaseList.id == list_id).first()
    print('going to edit this purList' , pur_list)

    if pur_list:
        form = PurchaseListForm() 
        print ('get form data ', form.data)
        if form.validate_on_submit:
            print ("get here")
            form['csrf_token'].data = request.cookies['csrf_token']
            form.populate_obj(pur_list)
            db.session.commit()
        return {"result" : pur_list.to_dict()}, 200
    else:
        return {'errors': "purchase list not found"}, 404 



@purchase_list_routes.route('/', methods=['POST'])
@login_required
def create_purchase_list():
    print("from here-------") 
    user_id = current_user.id
    form = PurchaseListForm()
    
    print('get form data for creating a category', form)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        list = PurchaseList()
        form.populate_obj(list)
        list.user_id = user_id
        db.session.add(list)
        db.session.commit()
        return { "result": list.to_dict()}, 201

    else:
        return { "errors": validation_errors_to_error_messages(form.errors)}, 400


@purchase_list_routes.route('/<int:purchase_list_id>', methods=['DELETE'])
@login_required
def delete_purchase_list(purchase_list_id):
    purchase_list = PurchaseList.query.filter(PurchaseList.id == purchase_list_id).first()
    print ('get purchase list to delete ', purchase_list)
    if purchase_list is not None:
        db.session.delete(purchase_list)
        db.session.commit()
        return { "message": "purchase list successfully deleted"}, 200
    else:
        return { "errors": "purchase list not found"}, 404 

