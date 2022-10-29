from flask import Blueprint, request
from app.models import Item, User, db
from flask_login import login_required, current_user
from app.forms import ItemForm
from datetime import datetime

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
    user = User.query.filter(User.id == user_id).first()
    items = user.items



@item_routes.route('/index')
def test():
   
    # project = Project(name='capstone')
    # employee = Employee(name='54321')
    # project.project_employees.extend([
    # EmployeeProject(employee=employee, role_name="tech lead", created_at=datetime.now())])
    # db.session.add(employee)
    # db.session.add(project)
    # db.session.commit()

    relationships = Item.query.all()
    result = []
    for re in relationships:
        #print("----------------" ,re.to_dict())
        result.append(re.to_dict())

    return {"result ": result} ,200
