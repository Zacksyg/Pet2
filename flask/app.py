from flask import Flask
from extensions import db
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate  # Importa o Flask-Migrate
from routes.petRoutes import pet_routes
from dotenv import load_dotenv
from sqlalchemy.sql import text
import os

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'seu_segredo_aqui'

CORS(app, resources={r"/*": {"origins": "*"}})

db.init_app(app)
jwt = JWTManager(app)

# Inicializa o Flask-Migrate
migrate = Migrate(app, db)

# Registra as rotas
app.register_blueprint(pet_routes)

# Testar a conexão com o banco de dados
with app.app_context():
    try:
        db.session.execute(text('SELECT 1')) 
        print("Conexão com o banco de dados bem-sucedida.")
    except Exception as e:
        print(f"Erro ao conectar ao banco de dados: {e}")

if __name__ == '__main__':
    app.run(port=5001)
