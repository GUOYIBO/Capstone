from csv import list_dialects
from app.models import Category, Item, db, PurchaseList
from datetime import datetime


lists = [
    'apple, orange, grapes, milk, broccoli, kale, eggs, chicken, beef',
    'banana, tomato, onion, patato, cheese, bacon, wine, yogurt, fish',
    'strawberry, blueberry, pineapple, pizza, corn, asparagus, cucumber'
    ]


def seed_purchase_list():  
    for idx in range(0, len(lists)):
        purchase_list = PurchaseList(name="Buy-list"+str(idx), content=lists[idx], user_id=1 )
        db.session.add(purchase_list)
    db.session.commit()
