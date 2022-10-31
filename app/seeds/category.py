from app.models import Category, Item, db
from datetime import datetime

categories = [
    'Breads & Bakery',
    'Pantry',
    'Seafood',
    'Meat',
    'Frozen Food',
    'Eggs',
    'Milk & Cream'
    'Fruit',
    'Alcohol',
    'Snacks'
]

items = [
    ['Whole Grains Bread','Bagel', 'Scones', 'Donuts','Burrito', 'Tiramisu Cake Slice'],
    ['Coconut Milk', 'Broth Chicken', 'Black Beans', 'Garbanzo Beans', 'Dark Red Kidney Beans'],
    ['Shrimp', 'Salmon Fillet', 'Sea Bass Fillet', 'Sea Scallops', 'Lobster', 'Crab'],
    ['Beef', 'Chicken', 'Lamb', 'Beef Groud', 'Turkey', 'Bacon', 'Steak'],
    ['Green Peas', 'Yellow Corn', 'Mixed Vegetables', 'Carrots and Peas', 'Wild Blueberries'],
    ['1 Dozen Eggs', 'Egg White' ],
    ['Whole milk', 'Half & Half', 'Viping Cream', 'Cream Cheese'],
    ['Apple', 'Banana', 'Blueberry', 'Chery', 'Mango', 'Orange', 'Pear', 'Strawberry', 'Watermelon'],
    ['Vodka', 'Blue Moon 12pk, 12oz bottles','Chardonnay Whilte Wine']
]

records = []
for cate in categories:
    record = Category(name=cate, image_url='test.png', user_id=1)
    records.append(record)


def seed_categories():  
    # for record in records:
    #     db.session.add(record)
    # db.session.commit()
    # item1 = Item(name='maffin', image_url='xx.jpg', purchase_date=datetime.now(),
    # expiration_date=datetime.now(), category_id=1)
    # item3 = Item(name='crab', image_url='xx.jpg', purchase_date=datetime.now(),
    # expiration_date=datetime.now(), category_id=3)
    # item4 = Item(name='beef', image_url='xx.jpg', purchase_date=datetime.now(),
    # expiration_date=datetime.now(), category_id=4)
    # db.session.add(item1)
    # db.session.add(item3)
    # db.session.add(item4)
    # db.session.commit()

    for record in records:
        db.session.add(record)
    db.session.commit()

    for idx in range(0, len(items)):
        for i in items[idx]:
            item=Item(name=i, image_url='../../img/profileimage.png', category_id=idx+1)
            db.session.add(item)
    db.session.commit()






# def seed_proj():
#     proj1= Project(name="Proj A")
#     proj2= Project(name="Proj B")
#     proj3= Project(name="Proj C")

#     emp1 = Employee(name="emp1")
#     emp2 = Employee(name="emp2")

#     proj1.project_employees.extend([
#     EmployeeProject(employee=emp1, role_name="tech lead", created_at=datetime.now()),
#     EmployeeProject(employee=emp2, role_name="account executive",  created_at=datetime.now())])
#     proj2.project_employees.extend([
#     EmployeeProject(employee=emp1, role_name="TA lead", created_at=datetime.now())])
#     proj3.project_employees.extend([
#     EmployeeProject(employee=emp1, role_name="Archi", created_at=datetime.now())])


    
#     db.session.add(proj1)
#     db.session.add(proj2)
#     db.session.add(proj3)
#     db.session.add(emp1)
#     db.session.add(emp2)
    
#     db.session.commit()




def undo_categories():
  db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
  db.session.commit()