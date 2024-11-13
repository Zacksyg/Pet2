document.getElementById('eventForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const date = document.querySelector('#date').value;
    const time = document.querySelector('#time').value;
    const type = document.querySelector('#type').value;
    const petId = new URLSearchParams(window.location.search).get('petId');

    const token = localStorage.getItem('token');

    try {
        const response = await fetch('/pets/eventos/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ petId, date, time, type }),
        });

        if (response.ok) {
            alert('Evento cadastrado com sucesso!');
        } else {
            throw new Error('Erro ao cadastrar evento.');
        }
    } catch (error) {
        console.error('Erro ao cadastrar evento:', error);
        alert(error.message);
    }
});
