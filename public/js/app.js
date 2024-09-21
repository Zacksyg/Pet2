document.addEventListener('DOMContentLoaded', () => {
    var btnSignin = document.querySelector("#signin");
    var btnSignup = document.querySelector("#signup");
    var body = document.querySelector("body");

    btnSignin.addEventListener("click", function () {
        console.log("Login button clicked");
        body.className = "sign-in-js"; 
    });

    btnSignup.addEventListener("click", function () {
        console.log("Signup button clicked");
        body.className = "sign-up-js";
    });

    document.querySelector('.form-register').addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Register form submitted");

        const name = document.querySelector('.form-register input[name="name"]').value;
        const email = document.querySelector('.form-register input[name="email"]').value;
        const password = document.querySelector('.form-register input[name="password"]').value;

        const res = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        if (res.ok) {
            console.log('Registration successful:', data);
            alert('Cadastro realizado com sucesso! Redirecionando para a página de login.');
            body.className = "sign-in-js"; 
        } else {
            console.error('Registration failed:', data);
            alert(`Erro no cadastro: ${data.error || 'Erro desconhecido'}`);
        }
    });

    document.querySelector('.form-login').addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Login form submitted");

        const email = document.querySelector('.form-login input[name="email"]').value;
        const password = document.querySelector('.form-login input[name="password"]').value;

        const res = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            console.log('Login successful:', data);
            window.location.href = './home.html';100 
        } else {
            console.error('Login failed:', data);
            alert('Usuário não encontrado ou senha incorreta.');
        }
    });
});
