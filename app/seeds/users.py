from app.models import db, User, Category, Item, UserItem, FavoriteDish
from datetime import datetime, timedelta
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
    'bakery.png',
    'seafood.png',
    'meat.png',
    'canfood.png',
    'eggs.png',
    'milk.png',
    'fruit.png',
    'veg.png',
    'bev.png',
    'snack.png',
    'dessert.png',
    'sauce.png'
]

# items = [
#    ['Bread', 'Donuts'],
#    ['Shrimp', 'Salmon', 'Lobster', 'Crab'],
#    ['Beef', 'Chicken', 'Short Rib' ],
#    ['Green Peas', 'Yellow Corn' ],
#    ['Eggs', 'Tofu'],
#    ['Whole Milk', 'Cream', 'Cheese'],
#    ['Apple', 'Banana', 'Blueberry'],
#    ['Onion', 'Daikon Radish', 'Carrot', 'Cucumber'],
#    ['Orange Juice', 'Sparkling Water' ],
#    ['Nuts', 'Chips', 'Cracker'],
#    ['Tiramisu'],
#    ['Tomato Sauce']
# ]


items = [
   [('Bread','bread.png'), ('Donuts','donut.png')],
   [('Shrimp','shrimp.png'), ('Salmon','salmon.png'), ('Lobster','lobster.png'), ('Crab','crab.png')],  
   [('Beef', 'beef.jpg'), ('Chicken', 'chicken.png'), ('Short Rib', 'rib.png') ],  
   [('Green Peas', 'peas.png'), ('Yellow Corn', 'corn.png') ],
   [('Eggs & Tofu', 'egg.png'), ('Tofu', 'tofu.png')],  
   [('Whole Milk','milk-item.png'), ('Cream','cream.png'), ('Cheese','cheese.png')],
   [('Apple','apple.png'), ('Banana','banana.png'), ('Blueberry','blueberry.png')],
   [('Onion','onions.png'), ('Daikon Radish', 'daikon.jpg'), ('Carrot', 'carrort.png'), ('Cucumber', 'cucumber.png')],
   [('Orange Juice','juice.png'), ('Sparkling Water', 'sparkling.png') ],
   [('Nuts','nuts.png'), ('Chips', 'chips.png'), ('Cracker', 'cracker.png')],
   [('Tiramisu','tiramisu.png')],
   [('Tomato Sauce','tomato-sauce.png')]
]

# imageUrls = [
#    ['bread.png', 'donut.png'],
#    ['shrimp.png', 'salmon.png', 'lobster.png', 'crab.png'],
#    ['beef.jpg', 'chicken.png', 'rib.png' ],
#    ['peas.png', 'corn.png' ],
#    ['egg.png', 'tofu.png'],
#    ['milk-item.png', 'cream.png', 'cheese.png'],
#    ['apple.png', 'banana.png', 'blueberry.png'],
#    ['onions.png', 'daikon.jpg', 'carrort.png', 'cucumber.png'],
#    ['juice.png', 'sparkling.png' ],
#    ['nuts.png', 'chips.png', 'cracker.png'],
#    ['tiramisu.png'],
#    ['tomato-sauce.png']
# ]


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


   

    fav_dish_1 = FavoriteDish(name="Kung Pao Shrimp", image_url="shrimp.jpg", des="Sichuan cuisine", user_id=1)
    fav_dish_2 = FavoriteDish(name="Mapo Tofu", image_url="mapotofu.jpg", des="Sichuan cuisine", user_id=1)
    
    for idx in range(0, len(items)):
        for i in items[idx]:
            item=Item(name=i[0], image_url=i[1], category_id=idx+1)
            if i == 'Shrimp' or i=='Cucumber' or  i=='Carrot':
               fav_dish_1.dish_items.append(item)
            if i == 'Tofu':
               fav_dish_2.dish_items.append(item)
            # db.session.add(item)
            demo.user_items.extend([
                UserItem(item=item, purchase_date=datetime.now(), quantity=random.randint(1,10),expiration_date=datetime.now()+timedelta(days=5))
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

    db.session.execute('TRUNCATE items RESTART IDENTITY CASCADE;')
    db.session.commit()

    db.session.execute('TRUNCATE dish_items RESTART IDENTITY CASCADE;')
    db.session.commit()

    db.session.execute('TRUNCATE favorite_dishes RESTART IDENTITY CASCADE;')
    db.session.commit()

    db.session.execute('TRUNCATE purchaselists RESTART IDENTITY CASCADE;')
    db.session.commit()

    db.session.execute('TRUNCATE user_item RESTART IDENTITY CASCADE;')
    db.session.commit()