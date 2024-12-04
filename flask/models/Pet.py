from extensions import db

class Pet(db.Model):
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    species = db.Column(db.String(20), nullable=False)
    breed = db.Column(db.String(50), nullable=True)
    age = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    vaccinated = db.Column(db.Boolean, nullable=False)
    additional_info = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)

    vaccines = db.relationship('Vaccine', backref='pet', lazy=True)
    exams = db.relationship('Exam', backref='pet', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "species": self.species,
            "breed": self.breed,
            "age": self.age,
            "weight": self.weight,
            "vaccinated": self.vaccinated,
            "additional_info": self.additional_info,
            "user_id": self.user_id,
            "image_url": self.image_url
        }

class Vaccine(db.Model):
    __tablename__ = 'vaccines'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)  # Novo campo para o horário
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'), nullable=False)

class Exam(db.Model):
    __tablename__ = 'exams'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)  # Novo campo para o horário
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'), nullable=False)
