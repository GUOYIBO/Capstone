from app.models import Category, Item, db
from datetime import datetime

categories = [
    'Breads & Bakery',
    'Pantry',
    'Seafood',
    'Meat',
    'Frozen Food',
    'Diary & Eggs',
    'Fruit',
    'Alcohol',
    'Snacks'
]

records = []
for cate in categories:
    record = Category(name=cate, image_url='test.png', user_id=1)
    records.append(record)


def seed_categories():  
    for record in records:
        db.session.add(record)
    db.session.commit()
    item1 = Item(name='maffin', image_url='xx.jpg', purchase_date=datetime.now(),
    expiration_date=datetime.now(), category_id=1)
    item3 = Item(name='crab', image_url='xx.jpg', purchase_date=datetime.now(),
    expiration_date=datetime.now(), category_id=3)
    item4 = Item(name='beef', image_url='xx.jpg', purchase_date=datetime.now(),
    expiration_date=datetime.now(), category_id=4)
    db.session.add(item1)
    db.session.add(item3)
    db.session.add(item4)
    db.session.commit()






def undo_categories():
  db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
  db.session.commit()