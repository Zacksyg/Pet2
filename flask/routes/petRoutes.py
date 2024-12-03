from flask import Blueprint, request, jsonify, render_template
from flask_jwt_extended import jwt_required, get_jwt_identity, decode_token
from controllers.petController import PetController
from werkzeug.utils import secure_filename  # Para assegurar nomes de arquivos válidos
import os  # Para manipular caminhos de arquivos


pet_routes = Blueprint('pet_routes', __name__)

# Renderiza a página de cadastro de pets
@pet_routes.route('/cadastrar_pet', methods=['GET'])
def exibir_formulario_pet():
    try:
        return render_template('form.html')
    except Exception as e:
        print(f"Erro ao renderizar a página: {e}")
        return jsonify({"error": "Erro ao carregar a página"}), 500

# Processa o cadastro de um novo pet
@pet_routes.route('/cadastrar_pet', methods=['POST'])
@jwt_required()
def cadastrar_pet():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        pet = PetController.register_pet(data, user_id)
        return jsonify({"message": "Pet cadastrado com sucesso!", "pet": pet.to_dict()}), 201
    except Exception as e:
        print(f"Erro ao cadastrar o pet: {e}")
        return jsonify({"error": str(e)}), 400

# Renderiza a página do pet
@pet_routes.route('/meu_pet', methods=['GET'])
def exibir_pet():
    try:
        token = request.args.get('token')
        if not token:
            return jsonify({"msg": "Missing Authorization Header"}), 401

        try:
            decode_token(token)
        except Exception as e:
            print(f"Erro ao decodificar o token: {e}")
            return jsonify({"msg": "Invalid Token"}), 401

        return render_template('pet.html')
    except Exception as e:
        print(f"Erro ao renderizar a página do pet: {e}")
        return jsonify({"error": "Erro ao carregar a página do pet."}), 500

# API para buscar informações do pet
@pet_routes.route('/api/meu_pet', methods=['GET'])
@jwt_required()
def obter_pet():
    try:
        user_id = get_jwt_identity()
        pet = PetController.get_pet_by_user_id(user_id)
        if not pet:
            return jsonify({"error": "Nenhum pet encontrado."}), 404
        return jsonify({"pet": pet.to_dict()}), 200
    except Exception as e:
        print(f"Erro ao buscar informações do pet: {e}")
        return jsonify({"error": "Erro ao buscar informações do pet."}), 500
 
@pet_routes.route('/upload_image', methods=['POST'])
@jwt_required()
def upload_image():
    try:
        user_id = get_jwt_identity()
        pet = PetController.get_pet_by_user_id(user_id)
        if not pet:
            return jsonify({"error": "Nenhum pet encontrado."}), 404

        if 'petImage' not in request.files:
            return jsonify({"error": "Nenhuma imagem enviada."}), 400

        image = request.files['petImage']
        filename = f"{pet.id}.jpg"
        filepath = os.path.join("static/images", filename)
        image.save(filepath)

        pet.image_url = f"/static/images/{filename}"
        PetController.update_pet_image(pet.id, pet.image_url)

        return jsonify({"message": "Imagem atualizada com sucesso.", "image_url": pet.image_url}), 200
    except Exception as e:
        print(f"Erro ao fazer upload da imagem: {e}")
        return jsonify({"error": f"Erro ao fazer upload da imagem: {str(e)}"}), 500

@pet_routes.route('/editar_pet', methods=['PUT'])
@jwt_required()
def editar_pet():
    try:
        user_id = get_jwt_identity()
        pet = PetController.get_pet_by_user_id(user_id)
        if not pet:
            return jsonify({"error": "Nenhum pet encontrado."}), 404

        data = request.get_json()

        updated_pet = PetController.update_pet_info(pet.id, data)
        return jsonify({"message": "Informações do pet atualizadas com sucesso.", "pet": updated_pet.to_dict()}), 200
    except Exception as e:
        print(f"Erro ao editar informações do pet: {e}")
        return jsonify({"error": f"Erro ao editar informações do pet: {str(e)}"}), 500


@pet_routes.route('/api/pet/vacinas', methods=['GET'])
@jwt_required()
def obter_vacinas():
    try:
        user_id = get_jwt_identity()
        pet = PetController.get_pet_by_user_id(user_id)
        if not pet:
            return jsonify({"error": "Nenhum pet encontrado."}), 404

        vacinas = PetController.get_pet_vaccines(pet.id)
        return jsonify({"vacinas": vacinas}), 200
    except Exception as e:
        print(f"Erro ao buscar vacinas: {e}")
        return jsonify({"error": "Erro ao buscar vacinas."}), 500


@pet_routes.route('/api/pet/exames', methods=['GET'])
@jwt_required()
def obter_exames():
    try:
        user_id = get_jwt_identity()
        pet = PetController.get_pet_by_user_id(user_id)
        if not pet:
            return jsonify({"error": "Nenhum pet encontrado."}), 404

        exames = PetController.get_pet_exams(pet.id)
        return jsonify({"exames": exames}), 200
    except Exception as e:
        print(f"Erro ao buscar exames: {e}")
        return jsonify({"error": "Erro ao buscar exames."}), 500