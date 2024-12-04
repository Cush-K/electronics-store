from sqlalchemy_serializer import SerializerMixin as sm
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Item(db.Model, sm):
    __tablename__ = 'items'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    image = db.Column(db.String)
    price = db.Column(db.Float)
    quantity = db.Column(db.Integer)
    
    def __repr__(self):
        return f'<Item {self.id}, {self.title}, {self.price}>'
    
    