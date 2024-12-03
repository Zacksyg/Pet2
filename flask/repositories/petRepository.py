from models.Pet import Pet
from extensions import db

class PetRepository:
    @staticmethod
    def create_pet(name, species, breed, age, weight, vaccinated, additional_info, user_id):
        try:
            print(f"Dados para criar pet: {locals()}")
            pet = Pet(
                name=name,
                species=species,
                breed=breed,
                age=age,
                weight=weight,
                vaccinated=vaccinated,
                additional_info=additional_info,
                user_id=user_id
            )

            db.session.add(pet)
            db.session.commit()
            print("Pet criado com sucesso!")
            return pet
        except Exception as e:
            db.session.rollback()
            print(f"Erro ao criar pet: {e}")
            raise

    @staticmethod
    def get_pet_by_user_id(user_id):
        try:
            pet = Pet.query.filter_by(user_id=user_id).first()
            if pet:
                print(f"Pet encontrado para o usuário {user_id}: {pet.to_dict()}")
            return pet
        except Exception as e:
            print(f"Erro ao buscar pet por user_id: {e}")
            raise

    @staticmethod
    def update_pet_image(pet_id, image_url):
        try:
            # Busca o pet pelo ID
            pet = Pet.query.filter_by(id=pet_id).first()
            if not pet:
                raise Exception("Pet não encontrado para atualização da imagem.")

            # Atualiza o campo de imagem
            pet.image_url = image_url
            db.session.commit()
            print(f"Imagem do pet com ID {pet_id} atualizada para {image_url}")
            return pet
        except Exception as e:
            print(f"Erro ao atualizar imagem do pet no repositório: {e}")
            raise

    @staticmethod
    def update_pet_info(pet_id, data):
        try:
            pet = Pet.query.filter_by(id=pet_id).first()
            if not pet:
                raise Exception("Pet não encontrado para atualização.")

            # Atualiza os campos, se fornecidos
            if 'name' in data:
                pet.name = data['name']
            if 'species' in data:
                pet.species = data['species']
            if 'age' in data:
                pet.age = int(data['age'])
            if 'weight' in data:
                pet.weight = float(data['weight'])
            if 'vaccinated' in data:
                pet.vaccinated = data['vaccinated']
            if 'additional_info' in data:
                pet.additional_info = data['additional_info']

            db.session.commit()
            return pet
        except Exception as e:
            print(f"Erro ao atualizar pet no repositório: {e}")
            raise

    @staticmethod
    def get_vaccines_by_pet_id(pet_id):
        try:
            # Exemplo fictício de retorno de vacinas
            return [
                {"name": "Raiva", "date": "2023-01-10"},
                {"name": "Parvovirose", "date": "2023-03-15"}
            ]
        except Exception as e:
            print(f"Erro ao buscar vacinas no repositório: {e}")
            raise

    @staticmethod
    def get_exams_by_pet_id(pet_id):
        try:
            # Exemplo fictício de retorno de exames
            return [
                {"name": "Exame de Sangue", "date": "2023-02-20"},
                {"name": "Exame de Fezes", "date": "2023-04-12"}
            ]
        except Exception as e:
            print(f"Erro ao buscar exames no repositório: {e}")
            raise
