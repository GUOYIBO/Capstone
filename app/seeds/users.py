from app.models import db, User, Category, Item, UserItem, FavoriteDish
from datetime import datetime
import random


categories = [
    'Bread&Bakery',
    'Pantry',
    'Seafood',
    'Meat',
    'Frozen Food',
    'Eggs',
    'Milk&Cream',
    'Fruit',
    'Alcohol',
    'Snacks'
]

items = [
    ['Bread', 'Donuts', 'Bagel', 'Scones', 'Burrito', 'Tiramisu Slice'],
    ['Chicken Broth', 'Black Beans', 'Garbanzo Beans', 'Dark Red Beans'],
    ['Shrimp', 'Salmon Fillet', 'Sea Bass Fillet', 'Lobster', 'Crab'],
    ['Beef', 'Chicken', 'Lamb', 'Groud Beef', 'Turkey', 'Bacon', 'Steak'],
    ['Green Peas', 'Yellow Corn', 'Mixed Vegetables', 'Carrots&Peas', 'Wild Blueberries'],
    ['Eggs', 'Egg White' ],
    ['Whole Milk', 'Half&Half', 'Viping Cream', 'Cream Cheese'],
    ['Apple', 'Banana', 'Blueberry', 'Chery', 'Mango', 'Orange', 'Pear', 'Strawberry', 'Watermelon'],
    ['Vodka', 'Beer','Whilte Wine'],
    ['Peanut', 'Chips', 'Rolls']
]



# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()



    #seed categories
    records = []
    for cate in categories:
        record = Category(name=cate, image_url='test.png', user_id=1)
        db.session.add(record)

    #for record in records:
        
    # db.session.commit()

    # seed items
    for idx in range(0, len(items)):
        for i in items[idx]:
            item=Item(name=i, image_url='../../img/profileimage.png', category_id=idx+1)
            # db.session.add(item)
            demo.user_items.extend([
                UserItem(item=item, purchase_date=datetime.now(), quantity=random.randint(1,6),expiration_date=datetime.now())
            ])
    db.session.commit()


    fav_dish_1 = FavoriteDish(name="Mapo Tofu", image_url="tt.png", des="This is from Sichuan cuisine", user_id=1)
    fav_dish_2 = FavoriteDish(name="Kung Pao Chicken", image_url="tt.png", des="This is from Sichuan cuisine", user_id=1)
    db.session.add(fav_dish_1)
    db.session.add(fav_dish_2)
    db.session.commit()










# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
