from .db import db

class Item(db.Model):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    purchase_date = db.Column(db.DateTime, nullable=False)
    expiration_date = db.Column(db.DateTime, nullable=False)
    # Foreign Keys
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))   # Foreign Key
    # category_id = db.relationship('Category', back_populates='items')


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image_url": self.image_url,
            "purchase_date": self.purchase_date,
            "expiration_date": self.expiration_date
        }


    def __repr__(self):
        return f'<Item, id={self.id}, name={self.name}>'

