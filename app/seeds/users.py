from app.models import db, User, Category, Item, UserItem, FavoriteDish
from datetime import datetime
import random


categories = [
    'Bakery',
    'Seafood',
    'Meat',
    'CAN Food',
    'Eggs',
    'Milk & Cream',
    'Fruits',
    'Vegetables',
    'Beverages',
    'Snacks',
    'Desserts',
    'Sauces'
]
categoryImages = [
    'https://cdn.pixabay.com/photo/2014/12/21/23/30/buns-575506_1280.png ',
    'https://cdn.pixabay.com/photo/2021/10/05/03/20/lobster-6681672_1280.png',
    'https://cdn.pixabay.com/photo/2014/12/21/23/40/steak-575806_1280.png ',
    'https://cdn.pixabay.com/photo/2013/07/12/15/00/canned-food-149221__480.png',
    'https://cdn.pixabay.com/photo/2014/04/02/17/08/box-308052_1280.png',
    'https://cdn.pixabay.com/photo/2012/04/03/13/41/milk-25175_1280.png',
    'https://cdn.pixabay.com/photo/2020/03/31/16/26/watermelon-4988432__480.png',
    'https://cdn.pixabay.com/photo/2013/07/13/12/50/basket-160442_1280.png',
    'https://cdn.pixabay.com/photo/2012/04/03/14/44/juice-25189_1280.png',
    'https://cdn.pixabay.com/photo/2017/02/01/10/29/bag-2029481_1280.png ',
    'https://cdn.pixabay.com/photo/2014/04/02/11/11/cupcake-305458_1280.png',
    'https://cdn.pixabay.com/photo/2014/12/21/23/36/sauce-575634__480.png'
]

items = [
    ['Bread', 'Donuts', 'Bagel', 'Scones', 'Burrito', 'Tiramisu Slice'],
    ['Shrimp', 'Salmon Fillet', 'Sea Bass Fillet', 'Lobster', 'Crab'],
    ['Beef', 'Chicken', 'Lamb', 'Turkey', 'Bacon', 'Sausage'],
    ['Green Peas', 'Yellow Corn', 'Mixed Vegetables', 'Carrots&Peas', 'Wild Blueberries'],
    ['Eggs', 'Egg White' ],
    ['Whole Milk', 'Half&Half', 'Cream', 'Cheese'],
    ['Apple', 'Banana', 'Blueberry', 'Chery', 'Mango', 'Orange', 'Pear', 'Strawberry', 'Watermelon'],
    ['Potato', 'Tomato','Carrot', 'Onion', 'Cabbage', 'Cucumber', 'Broccoli'],
    ['Orange Juice', 'Sparkling', 'Coke', 'Green Tea'],
    ['Peanut', 'Chips', 'Rolls']
]
# 'https://cdn.pixabay.com/photo/2014/12/21/23/57/jar-576438_1280.png'
#  https://cdn.pixabay.com/photo/2013/07/12/15/00/canned-food-149221__480.png
# prepared food 'https://cdn.pixabay.com/photo/2012/04/13/01/53/spaghetti-31784_1280.png',
# watermelo https://cdn.pixabay.com/photo/2019/05/28/15/22/watermelon-4235381__480.png
#  strawberry https://cdn.pixabay.com/photo/2020/01/31/06/11/cartoon-4807190_1280.png
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
    for i in range(0, len(categories)):
        record = Category(name=categories[i], image_url=categoryImages[i], user_id=1)
        db.session.add(record)

    #for record in records:
        
    # db.session.commit()

    # seed items

    fav_dish_1 = FavoriteDish(name="Mapo Tofu", image_url="https://cp1.douguo.com/upload/caiku/5/d/0/yuan_5d3d43ff267cafe4b6271849683c3ec0.jpeg", des="Sichuan cuisine", user_id=1)
    fav_dish_2 = FavoriteDish(name="Kung Pao Chicken", image_url="https://i.ytimg.com/vi/YszICai7Ibk/maxresdefault.jpg", des="Sichuan cuisine", user_id=1)
    
    for idx in range(0, len(items)):
        for i in items[idx]:
            item=Item(name=i, image_url='../../img/profileimage.png', category_id=idx+1)
            if i == 'Chicken' or i=='Cucumber' or  i=='Carrot':
                fav_dish_1.dish_items.append(item)
            # db.session.add(item)
            demo.user_items.extend([
                UserItem(item=item, purchase_date=datetime.now(), quantity=random.randint(1,10),expiration_date=datetime.now())
            ])
    db.session.commit()


    
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
