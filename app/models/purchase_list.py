from .db import db

class PurchaseList(db.Model):
    __tablename__ = 'purchaselists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    content = db.Column(db.String(255), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "content": self.content
        }


    def __repr__(self):
        return f'<PurchaseList, id={self.id}, name={self.name}, user_id={self.user_id}>'