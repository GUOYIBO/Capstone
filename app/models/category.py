from .db import db


class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    # created_at = db.Column(db.DateTime, nullable=False)
    # updated_at = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))   # Foreign Key


    # items = db.relationship('Item', back_populates='category', cascade='all, delete')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image_url": self.image_url,     
     }


    def __repr__(self):
        return f'<Category, id={self.id}, name={self.name}, image_url={self.image_url}>'


