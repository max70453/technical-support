function loadUserInitials() {
    const user = getCurrentUser() || defaultUser;
    const initials = document.getElementById('userInitials');
    if (initials) {
        initials.textContent = getInitials(user.name);
    }
}

function loadUserInfo() {
    const user = getCurrentUser() || defaultUser;
    
    const profileAvatar = document.getElementById('profileAvatar');
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const balanceValue = document.getElementById('balanceValue');
    const currentTariff = document.getElementById('currentTariff');
    const speedValue = document.getElementById('speedValue');
    const priceValue = document.getElementById('priceValue');
    const nextPayment = document.getElementById('nextPayment');
    
    if (profileAvatar) profileAvatar.textContent = getInitials(user.name);
    if (profileName) profileName.textContent = user.name;
    if (profileEmail) profileEmail.textContent = user.email;
    if (balanceValue) balanceValue.textContent = user.balance.toLocaleString() + ' ₽';
    if (currentTariff) currentTariff.textContent = user.tariff || 'Не подключен';
    if (speedValue) speedValue.textContent = (user.speed || 0) + ' Мбит/с';
    if (priceValue) priceValue.textContent = (user.price || 0) + ' ₽/мес';
    if (nextPayment) nextPayment.textContent = user.nextPayment || '-';
}

function selectTariff(card, name, speed, price) {
    document.querySelectorAll('.tariff-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    
    const user = getCurrentUser() || defaultUser;
    user.tariff = name;
    user.speed = speed;
    user.price = price;
    setCurrentUser(user);
    
    loadUserInfo();
    showToast('Тариф "' + name + '" активирован!', 'success');
}

document.addEventListener('DOMContentLoaded', function() {
    if (!getCurrentUser()) {
        window.location.href = 'login.html';
        return;
    }
    loadUserInitials();
    loadUserInfo();
});