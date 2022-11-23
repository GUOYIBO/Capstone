from unicodedata import category
from .db import db
from .favorite_dish import dish_item

class Item(db.Model):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    image_url = db.Column(db.String(400), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))   # Foreign Key
    # category_id = db.relationship('Category', back_populates='items')
    category = db.relationship('Category', back_populates='items')

    in_dishes = db.relationship(
    'FavoriteDish',
    secondary=dish_item,
    back_populates='dish_items'
    )
    # item_users = db.relationship("UserItem", backref='item')    
    type_items = db.relationship("UserItem", back_populates='itemtype',cascade='all,delete')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image_url": self.image_url,
            "category_id": self.category_id
            # "purchase_date": self.purchase_date,
            # "expiration_date": self.expiration_date
        }


    def __repr__(self):
        return f'<Item, id={self.id}, name={self.name}, category_id={self.category_id}>'

