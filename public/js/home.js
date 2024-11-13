document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    const loginLink = document.getElementById('login-link');
    const dataLink = document.getElementById('data-link');
    const petLink = document.querySelector("a[href='form.html']"); 
    const navLinks = document.querySelector('.navbar-nav');

    if (username) {
        loginLink.style.display = 'none';
        dataLink.style.display = 'block';
        petLink.style.display = 'block';

        navLinks.innerHTML += `
            <li class="nav-item">
                <span class="nav-link">Bem-vindo, ${username}</span>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link" id="logout">Logout</a>
            </li>
        `;
    } else {
        loginLink.style.display = 'block';
        dataLink.style.display = 'none';
        petLink.style.display = 'none';
    }

    document.getElementById('logout')?.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = 'cadastro_login.html';
    });
});
document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = encodeURIComponent(document.getElementById('name').value);
    const message = encodeURIComponent(document.getElementById('message').value);
    
    const mailtoLink = `mailto:pethealth.contato@gmail.com?subject=Contato%20de%20${name}&body=${message}`;
    window.location.href = mailtoLink;
  });