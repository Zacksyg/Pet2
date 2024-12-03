document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // Armazena o token no localStorage, se encontrado na URL
    if (token) {
        localStorage.setItem('jwt', token);
    }

    const storedToken = localStorage.getItem('jwt');
    if (!storedToken) {
        alert('Usuário não autenticado. Redirecionando para login.');
        window.location.href = 'http://127.0.0.1:5000/cadastro_login.html';
        return;
    }

    // Configura o envio do formulário de cadastro de pets
    document.getElementById('petForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const petData = {
            name: document.getElementById('petName').value,
            species: document.getElementById('species').value,
            breed: document.getElementById('breed').value,
            age: document.getElementById('age').value,
            weight: document.getElementById('weight').value,
            vaccinated: document.getElementById('vaccinated').value,
            additionalInfo: document.getElementById('additionalInfo').value
        };

        try {
            const response = await fetch('http://127.0.0.1:5001/cadastrar_pet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedToken}` // Inclui o token no cabeçalho
                },
                body: JSON.stringify(petData)
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message); // Mensagem de sucesso
                window.location.href = 'http://127.0.0.1:5000/home.html'; // Redireciona para a home
            } else {
                // Exibe mensagem de erro retornada pelo backend
                alert(result.error || 'Erro ao cadastrar o pet.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao tentar cadastrar o pet.');
        }
    });

    // Configura a mudança dinâmica das raças com base na espécie selecionada
    const speciesSelect = document.getElementById('species');
    const breedSelect = document.getElementById('breed');

    const breeds = {
        gato: ['Siamês', 'Persa', 'Maine Coon', 'Sphynx', 'Vira-lata', 'Angorá', 'Ragdoll', 'Ashera', 'American-Shorthair', 'Exótico', 'Srd'],
        cachorro: ['Labrador', 'Poodle', 'Pastor Alemão', 'Bulldog', 'Vira-lata', 'Border-Collie', 'Pomerânia', 'Rottweiler', 'Golden-Retriever', 'Shih-tzu', 'Chihuahua', 'Pincher'],
        pássaro: ['Canário', 'Periquito', 'Papagaio', 'Calopsita', 'Pato', 'Codorna'],
        reptil: ['Iguana', 'Lagarto', 'Camaleão', 'Jabuti', 'Cobra'],
        peixe: ['Betta', 'Goldfish', 'Tetra Neon', 'Colisa', 'Platy', 'Paulistinha', 'Limpa-Vidro', 'Guppy', 'Peixe-Palhaço', 'Carpa'],
        cavalo: ['Puro Sangue', 'Árabe', 'Quarto de Milha', 'Appaloosa', 'Andaluz', 'Bretão', 'Crioulo', 'Manga-Larga', 'Pampa'],
        roedor: ['Hamster', 'Porquinho da Índia', 'Chinchila', 'Gerbil', 'Coelho', 'Rato']
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
