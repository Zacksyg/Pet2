from repositories.petRepository import PetRepository

class PetController:
    @staticmethod
    def register_pet(data, user_id):
        try:
            print(f"Dados recebidos no controller: {data}")
            
            # Verifica se já existe um pet para este usuário
            existing_pet = PetRepository.get_pet_by_user_id(user_id)
            if existing_pet:
                raise Exception("Cada usuário só pode cadastrar um único pet.")

            # Cria o pet se não houver um pet existente
            pet = PetRepository.create_pet(
                name=data['name'],
                species=data['species'],
                breed=data['breed'],
                age=int(data['age']),
                weight=float(data['weight']),
                vaccinated=data['vaccinated'].lower() == 'sim',
                additional_info=data.get('additionalInfo', ''),
                user_id=user_id
            )
            print(f"Pet cadastrado no controller: {pet.to_dict()}")
            return pet
        except Exception as e:
            print(f"Erro no controller: {e}")
            raise

    def get_pet_by_user_id(user_id):
        try:
            pet = PetRepository.get_pet_by_user_id(user_id)
            if not pet:
                print(f"Nenhum pet encontrado para o usuário com ID {user_id}.")
                return None
            print(f"Pet encontrado: {pet.to_dict()}")
            return pet
        except Exception as e:
            print(f"Erro ao buscar o pet no controller: {e}")
            raise

    @staticmethod
    def update_pet_image(pet_id, image_url):
        try:
            # Atualiza a URL da imagem do pet
            updated_pet = PetRepository.update_pet_image(pet_id, image_url)
            print(f"Imagem do pet com ID {pet_id} atualizada para {image_url}")
            return updated_pet
        except Exception as e:
            print(f"Erro ao atualizar imagem do pet no controller: {e}")
            raise

    @staticmethod
    def update_pet_info(pet_id, data):
        try:
            updated_pet = PetRepository.update_pet_info(pet_id, data)
            print(f"Informações do pet atualizadas: {updated_pet.to_dict()}")
            return updated_pet
        except Exception as e:
            print(f"Erro ao atualizar informações no controller: {e}")
            raise

    @staticmethod
    def get_pet_vaccines(pet_id):
        try:
            return PetRepository.get_vaccines_by_pet_id(pet_id)
        except Exception as e:
            print(f"Erro ao buscar vacinas no controller: {e}")
            raise

    @staticmethod
    def get_pet_exams(pet_id):
        try:
            return PetRepository.get_exams_by_pet_id(pet_id)
        except Exception as e:
            print(f"Erro ao buscar exames no controller: {e}")
            raise
