from .db import db


dish_item = db.Table(
    'dish_item',
    db.Model.metadata,
    db.Column('dish_id', db.Integer, db.ForeignKey('favorite_dishes.id'), primary_key=True),
    db.Column('item_id', db.Integer, db.ForeignKey('items.id'), primary_key=True)
)


class FavoriteDish(db.Model):
    __tablename__ = "favorite_dishes"

    id= db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(40), nullable=False)
    image_url = db.Column(db.String(400), nullable=True)
    des = db.Column(db.String(400), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


    dish_items = db.relationship(
        'Item',
        secondary=dish_item,
        back_populates='in_dishes'
        )


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image_url": self.image_url,
            "description": self.des,
            "user_id": self.user_id,
            "items": [item.to_dict() for item in self.dish_items]
        }


    def __repr__(self):
        return f'<FavoriteDish, id={self.id}, name={self.name}, image_url={self.image_url}, description={self.des}>'



