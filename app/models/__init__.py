from .db import db
from .user import User
from .category import Category
from .item import Item
from .favorite_dish import FavoriteDish
from .purchase_list import PurchaseList


class UserItem(db.Model):
    __tablename__ = 'user_item'
    id = db.Column(db.Integer,  autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id') )
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))
    quantity = db.Column(db.Integer)
    purchase_date = db.Column(db.DateTime)
    expiration_date = db.Column(db.DateTime)

    user = db.relationship("User", backref="user_items")
    itemtype = db.relationship("Item", back_populates="type_items")

    def to_dict(self):
        print ('---', self.user)
        print ('===', self.itemtype)

        return {
            "id": self.id,
            "user_id" : self.user_id,
            "item_id" : self.item_id,
            "quantity": self.quantity,
            "purchase_date"  : str(self.purchase_date),
            "expiration_date" : str(self.expiration_date),
            "user"  : self.user.to_dict(),
            "itemtype" : self.itemtype.to_dict()
        }







# class Employee(db.Model):
#     __tablename__ = 'employee'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(30))


#     def to_dict(self):
#         return {
#             "id": self.id,
#             "name": self.name
#         }


#     def __repr__(self):
#         return f'<Employee, id={self.id}, name={self.name}>'


# class Project(db.Model):
#     __tablename__ = 'project'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(30))

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "name": self.name
#         }

#     def __repr__(self):
#         return f'<Project, id={self.id}, name={self.name}>'


# class EmployeeProject(db.Model):
#     __tablename__ = 'employee_project'

#     id = db.Column(db.Integer, primary_key=True)
#     employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
#     project_id = db.Column(db.Integer, db.ForeignKey('project.id'))
#     role_name = db.Column(db.String(30))
#     created_at = db.Column(db.DateTime)

#     project = db.relationship("Project", backref="project_employees")
#     employee = db.relationship("Employee", backref="employee_projects")

#     def to_dict(self):
#         print ('---', self.employee)
#         print ('===', self.project)

#         return {
#             "id": self.id,
#             "employee_id" : self.employee_id,
#             "project_id" : self.project_id,
#             "role_name" : self.role_name,
#             "created_at" : self.created_at,
#             "projects"  : self.project.to_dict(),
#             "employees" : self.employee.to_dict()
#         }