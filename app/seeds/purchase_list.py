from csv import list_dialects
from app.models import Category, Item, db, PurchaseList
from datetime import datetime


lists = [
    'apple, orange, grapes, milk, broccoli, kale, eggs, chicken, beef',
    'banana, tomato, onion, patato, cheese, bacon, wine, yogurt, fish',
    'strawberry, blueberry, pineapple, pizza, corn, asparagus, cucumber',
    'cracker, chips, choclate, coffee, nuts, soda, lollipop'
    ]


def seed_purchase_list():  
    for idx in range(0, len(lists)):
        purchase_list = PurchaseList(name="My-list-"+str(idx+1), content=lists[idx], user_id=1 )
        db.session.add(purchase_list)
    db.session.commit()




def undo_seed_purchase_list():
    db.session.execute('TRUNCATE purchaselists RESTART IDENTITY CASCADE;')
    db.session.commit()