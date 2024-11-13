document.getElementById('petForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    const token = localStorage.getItem('token');

    try {
        const response = await fetch('/pets/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Erro ao cadastrar o pet:', error);
        alert('Erro ao cadastrar o pet.');
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const speciesSelect = document.getElementById('species');
    const breedSelect = document.getElementById('breed');

    const breeds = {
        gato: [
            'Siamês',
            'Persa',
            'Maine Coon',
            'Sphynx',
            'Vira-lata',
            'Angorá',
            'Ragdoll',
            'Ashera',
            'American-Shorthair',
            'Exótico',
            'Srd'
        ],
        cachorro: [
            'Labrador',
            'Poodle',
            'Pastor Alemão',
            'Bulldog',
            'Vira-lata',
            'Border-Collie',
            'Pomerânia',
            'Rottweiler',
            'Golden-Retriever',
            'Shih-tzu',
            'Chihuahua',
            'Pincher'
        ],
        pássaro: [
            'Canário',
            'Periquito',
            'Papagaio',
            'Calopsita',
            'Pato',
            'Codorna'
        ],
        reptil: [
            'Iguana',
            'Lagarto',
            'Camaleão',
            'Jabuti',
            'Cobra'
        ],
        peixe: [
            'Betta',
            'Goldfish',
            'Tetra Neon',
            'Colisa',
            'Platy',
            'Paulistinha',
            'Limpa-Vidro',
            'Guppy',
            'Peixe-Palhaço',
            'Carpa'
        ],
        cavalo: [
            'Puro Sangue',
            'Árabe',
            'Quarto de Milha',
            'Appaloosa',
            'Andaluz',
            'Bretão',
            'Crioulo',
            'Manga-Larga',
            'Pampa'
        ],
        roedor: [
            'Hamster',
            'Porquinho da Índia',
            'Chinchila',
            'Gerbil',
            'Coelho',
            'Rato'
        ]
    };

    speciesSelect.addEventListener('change', function () {
        const selectedSpecies = speciesSelect.value;


        breedSelect.innerHTML = '<option value="">Selecione a raça</option>';

        if (selectedSpecies && breeds[selectedSpecies]) {
            breeds[selectedSpecies].forEach(function (breed) {
                const option = document.createElement('option');
                option.value = breed.toLowerCase();
                option.textContent = breed;
                breedSelect.appendChild(option);
            });
        }
    });
});
