from flask import Flask, make_response, request, send_from_directory, render_template
from models import db, Item
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Resource, Api
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder='static')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI') #'sqlite:///inventory.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['JSONIFY_PRETTYPRINT_REGULAR']=True

CORS(app)
migrate = Migrate(app,db)
api = Api(app)

db.init_app(app)


@app.route('/')
def home():
    return render_template('myproject.html')


@app.route('/api')
def index():
    return '<h1>Index of Electronics Store</h1>'

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

class ItemList(Resource):
    def get(self):
        items_dict = [item.to_dict() for item in Item.query.all()]
        return make_response(items_dict, 200)
    
    def post(self):
        data = request.get_json()
        
        new_item = Item(
            title=data['title'],
            image=data['image'],
            price=data['price'],
            quantity=data['quantity']
        )
        
        db.session.add(new_item)
        db.session.commit()
        
        try:
            return {
                'message': 'Item added successfully'
                }, 201
        except Exception as e:
            return {
               'message': f'Error adding item: {str(e)}'
                }, 500
            
class ItemsById(Resource):
    def get(self, id):
        item = Item.query.filter_by(id=id).first()
        
        if item:
            return make_response(item.to_dict(), 200)
        else:
            return make_response({'message': 'Item not found'}, 404)
        
    def put(self, id):
        data = request.get_json()
        
        item = Item.query.filter_by(id=id).first()
        
        if item:
            item.title = data.get('title', item.title)
            item.image = data.get('image', item.image)
            item.price = data.get('price', item.price)
            item.quantity = data.get('quantity', item.quantity)
            
            db.session.commit()
            
            return make_response(item.to_dict(), 201)
        else:
            return make_response({'message': 'Item not found'}, 404)
        
    def delete(self, id):
        item = Item.query.filter_by(id=id).first()
        
        if item:
            db.session.delete(item)
            db.session.commit()
            
            return {}, 204
        else:
            return make_response({'message': 'Item not found'}, 404)
        
        
api.add_resource(ItemList, '/api/items')
api.add_resource(ItemsById, '/api/items/<int:id>')


if __name__ == '__main__':
    # app.run(port=5555, debug=True)
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5555)))
