from flask import Blueprint, request
from app.models import Item, User, db, UserItem
from flask_login import login_required, current_user
from app.forms import ItemForm
from datetime import datetime
import json

item_routes = Blueprint('items', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages

# get all items of current user
@item_routes.route('/current')
@login_required
def get_all_items():
    user_id = current_user.id
    print("user___id", user_id)
    items = UserItem.query.filter(UserItem.user_id == user_id).all()
    print ('user item#########  ', items)
    return { "result" : [item.to_dict() for item in items]}, 200


@item_routes.route('/index')
def test():
   
    # project = Project(name='capstone')
    # employee = Employee(name='54321')
    # project.project_employees.extend([
    # EmployeeProject(employee=employee, role_name="tech lead", created_at=datetime.now())])
    # db.session.add(employee)
    # db.session.add(project)
    # db.session.commit()




    # relationships = Item.query.all()
    # result = []
    # for re in relationships:
    #     #print("----------------" ,re.to_dict())
    #     result.append(re.to_dict())
    user_id = 1
    user = User.query.filter(User.id == user_id).first()

    return {"result ": user.to_dict()} ,200



@item_routes.route('/user_items', methods=['POST'])
@login_required
def add_user_items():
    user = User.query.filter(User.id == current_user.id).first()
    print('get request', request)
    data = json.loads(request.data)
    print ('600 request data', data)
    item_ids = data['item_ids']
    quantities = data['quantities']
    purchase_dates = data['purchase_date']
    expiration_dates = data['expiration_date']
    for key in item_ids:
        if (item_ids[key]):
            id = key
            item = Item.query.filter(Item.id ==id).first()
            if (item):
                qty = quantities[key]
                if qty is None:
                    qty = 1
                # p_date = purchase_dates[key]
                # if p_date is None:
                #     p_date = datetime.now()
                # exp_date = expiration_dates[key]
                # if exp_date is None:
                #     exp_date = datetime.now()
                p_date = datetime.now()
                exp_date = datetime.now()
                
                user.user_items.extend([
                UserItem(item=item, purchase_date=p_date, quantity=qty, expiration_date=exp_date)
            ])
    db.session.commit()
    return { 'result': user.to_dict()}, 201
