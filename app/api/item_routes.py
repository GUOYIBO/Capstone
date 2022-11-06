from flask import Blueprint, request
from app.models import Item, User, db, UserItem
from flask_login import login_required, current_user
from app.forms import ItemForm
from datetime import datetime, timedelta
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
    items = UserItem.query.filter(UserItem.user_id == current_user.id).all()
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


# edit a useritem
@item_routes.route('/user_items/<int:user_item_id>', methods=['POST'])
@login_required
def edit_user_items(user_item_id):
    user_item = UserItem.query.filter(UserItem.id==user_item_id).first()
    if user_item :
        form = ItemForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if (form.validate_on_submit()):
            form.populate_obj(user_item)
            p_date = form.data.get('purchase_date')
            exp_date = form.data.get('expiration_date')
            user_item.purchase_date = datetime.strptime(p_date, '%Y-%m-%d').date()
            user_item.expiration_date = datetime.strptime(exp_date, '%Y-%m-%d').date()
            db.session.commit()
            return { "result": user_item.to_dict()} ,200
        else:
            return { "errors": validation_errors_to_error_messages(form.errors)}, 401
    else:
        return  {'errors': "user item not found"}, 404 




@item_routes.route('/user_items', methods=['POST'])
@login_required
def add_user_items():
    user = User.query.filter(User.id == current_user.id).first()
    data = json.loads(request.data)
    item_ids = data['item_ids']
    quantities = data['quantities']
    purchase_dates = data['purchase_date']
    expiration_dates = data['expiration_date']
    for key in item_ids:
        if (item_ids[key]):
            id = key
            item = Item.query.filter(Item.id ==id).first()
            if (item):
                qty = quantities.get(id)
                if qty is None:
                    qty = 1
                # p_date = purchase_dates[key]
                # if p_date is None:
                #     p_date = datetime.now()
                # exp_date = expiration_dates[key]
                # if exp_date is None:
                #     exp_date = datetime.now()
                p_date = purchase_dates.get(id)
                exp_date = expiration_dates.get(id)
                if p_date is None:
                    p_date = datetime.now()
                else:
                    p_date = datetime.strptime(p_date, '%Y-%m-%d').date()
                if exp_date is None:
                    exp_date = datetime.now() + timedelta(days=5)
                else:
                    exp_date = datetime.strptime(exp_date, '%Y-%m-%d').date()
                    
                print ('p_date', p_date)
                print ('exp_date', exp_date)
                user.user_items.extend([
                UserItem(item=item, purchase_date=p_date, quantity=qty, expiration_date=exp_date)])
    db.session.commit()
    # return { 'result': user.to_dict()}, 200
    items = UserItem.query.filter(UserItem.user_id == current_user.id).all()
    return { "result" : [item.to_dict() for item in items]}, 200



@item_routes.route('/user_items/<int:user_item_id>', methods=['DELETE'])
@login_required
def delete_user_items(user_item_id):
    user_item = UserItem.query.filter(UserItem.id==user_item_id).first()
    if user_item :
        db.session.delete(user_item)
        db.session.commit()
        return { "message": "user item successfully deleted"}, 200
    else:
        return  {'errors': "user item not found"}, 404 

   