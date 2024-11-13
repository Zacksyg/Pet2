document.addEventListener('DOMContentLoaded', () => {
    const btnSignin = document.querySelector("#signin");
    const btnSignup = document.querySelector("#signup");
    const body = document.querySelector("body");


    btnSignin.addEventListener("click", function () {
        console.log("Login button clicked");
        body.classList.remove("sign-up-js");
        body.classList.add("sign-in-js");
    });

    btnSignup.addEventListener("click", function () {
        console.log("Signup button clicked");
        body.classList.remove("sign-in-js");
        body.classList.add("sign-up-js");
    });
});


document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
        const res = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.name);
            window.location.href = 'home.html';
        } else {
            alert(data.msg);
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
});
