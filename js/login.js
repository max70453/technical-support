function switchTab(tab) {
    document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('[data-tab="' + tab + '"]').classList.add('active');
    
    if (tab === 'login') {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
    } else {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    }
}

function handleLogin() {
    var email = document.getElementById('loginEmail').value.trim();
    var password = document.getElementById('loginPassword').value;
    var errorEl = document.getElementById('loginError');
    
    if (!email || !password) {
        showError('Заполните все поля');
        return;
    }
    
    var newUser = {
        name: email.split('@')[0] || 'Пользователь',
        email: email,
        password: password,
        balance: 1250,
        tariff: 'Домашний 100',
        speed: 100,
        price: 490,
        nextPayment: '15.06.2026'
    };
    
    localStorage.setItem('netprovider_currentUser', JSON.stringify(newUser));
    window.location.href = 'profile.html';
}

function handleRegister() {
    var name = document.getElementById('regName').value.trim();
    var email = document.getElementById('regEmail').value.trim();
    var password = document.getElementById('regPassword').value;
    var passwordConfirm = document.getElementById('regPasswordConfirm').value;
    var errorEl = document.getElementById('loginError');
    
    if (!name || !email || !password || !passwordConfirm) {
        showError('Заполните все поля');
        return;
    }
    
    if (password !== passwordConfirm) {
        showError('Пароли не совпадают');
        return;
    }
    
    if (password.length < 6) {
        showError('Пароль должен быть не менее 6 символов');
        return;
    }
    
    var users = JSON.parse(localStorage.getItem('netprovider_users')) || [];
    
    if (users.find(u => u.email === email)) {
        showError('Пользователь с таким email уже существует');
        return;
    }
    
    var newUser = {
        name: name,
        email: email,
        password: password,
        balance: 500,
        tariff: null,
        speed: 0,
        price: 0,
        nextPayment: null
    };
    
    users.push(newUser);
    localStorage.setItem('netprovider_users', JSON.stringify(users));
    localStorage.setItem('netprovider_currentUser', JSON.stringify(newUser));
    
    showToast('Регистрация успешна!', 'success');
    setTimeout(function() {
        window.location.href = 'profile.html';
    }, 1000);
}

function showError(message) {
    var errorEl = document.getElementById('loginError');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    setTimeout(function() {
        errorEl.style.display = 'none';
    }, 3000);
}

function showToast(message, type) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    
    var toastMessage = document.getElementById('toastMessage');
    if (toastMessage) toastMessage.textContent = message;
    
    if (type === 'success') {
        toast.style.background = '#10b981';
    } else {
        toast.style.background = '#ef4444';
    }
    
    toast.style.display = 'block';
    setTimeout(function() {
        toast.style.display = 'none';
    }, 3000);
}

var currentUser = JSON.parse(localStorage.getItem('netprovider_currentUser'));
if (currentUser) {
    window.location.href = 'profile.html';
}