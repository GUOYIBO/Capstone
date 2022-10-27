from .db import db

class FavoriteDish(db.Model):
    __tablename__ = "favorite_dishes"

    id= db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(40), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    des = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image_url": self.image_url,
            "description": self.des,
            "user_id": self.user_id
        }


    def __repr__(self):
        return f'<FavoriteDish, id={self.id}, name={self.name}>, image_url={self.image_url}, description={self.des}>'



