function loadUserInitials() {
    const user = getUser();
    const initials = document.getElementById('userInitials');
    if (initials) {
        initials.textContent = getInitials(user.name);
    }
}

const popularAddresses = [
    { address: 'ул. Ленина, 10', status: 'available', speed: 'до 500 Мбит/с' },
    { address: 'ул. Пушкина, 25', status: 'available', speed: 'до 300 Мбит/с' },
    { address: 'пр. Мира, 45', status: 'available', speed: 'до 1000 Мбит/с' },
    { address: 'ул. Гагарина, 8', status: 'unavailable', speed: 'Нет покрытия' },
    { address: 'ул. Комсомольская, 32', status: 'available', speed: 'до 100 Мбит/с' },
    { address: 'ул. Кирова, 15', status: 'available', speed: 'до 300 Мбит/с' }
];

function loadPopularAddresses() {
    const container = document.getElementById('popularAddresses');
    if (!container) return;

    container.innerHTML = popularAddresses.map(addr => `
        <div class="ticket-item ${addr.status}" onclick="quickCheck('${addr.address}')">
            <div class="ticket-header">
                <span class="ticket-title">${addr.address}</span>
                <span class="ticket-status ${addr.status}">${addr.status === 'available' ? 'Доступно' : 'Недоступно'}</span>
            </div>
            <div class="ticket-meta">
                <span>${addr.speed}</span>
            </div>
        </div>
    `).join('');
}

function checkAddress() {
    const input = document.getElementById('addressInput');
    const address = input.value.trim();
    if (!address) {
        showToast('Введите адрес', 'warning');
        return;
    }

    const result = document.getElementById('addressResult');
    const content = document.getElementById('addressResultContent');

    result.classList.add('show');

    const isAvailable = Math.random() > 0.3;

    setTimeout(() => {
        if (isAvailable) {
            const speeds = ['30 Мбит/с', '100 Мбит/с', '300 Мбит/с', '500 Мбит/с'];
            const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];
            result.classList.remove('unavailable');
            result.classList.add('available');
            content.innerHTML = `
                <div style="text-align: center;">
                    <i class="material-icons" style="font-size: 3rem; color: var(--secondary);">check_circle</i>
                    <h3 style="margin: 16px 0 8px;">Поздравляем!</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 16px;">По адресу ${address} доступно подключение</p>
                    <p style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">${randomSpeed}</p>
                    <button class="btn btn-primary" style="margin-top: 16px;" onclick="applyForAddress()">
                        <i class="material-icons">how_to_reg</i>
                        Оставить заявку
                    </button>
                </div>
            `;
        } else {
            result.classList.remove('available');
            result.classList.add('unavailable');
            content.innerHTML = `
                <div style="text-align: center;">
                    <i class="material-icons" style="font-size: 3rem; color: #ef4444;">cancel</i>
                    <h3 style="margin: 16px 0 8px;">К сожалению</h3>
                    <p style="color: var(--text-secondary);">По адресу ${address} пока нет технической возможн��сти подключения</p>
                    <button class="btn btn-secondary" style="margin-top: 16px;" onclick="waitlistAddress()">
                        <i class="material-icons">notifications</i>
                        Уведомить о запуске
                    </button>
                </div>
            `;
        }
    }, 1000);
}

function quickCheck(address) {
    const input = document.getElementById('addressInput');
    if (input) input.value = address;
    checkAddress();
}

function applyForAddress() {
    showToast('Заявка оставлена! Мы свяжемся с вами', 'success');
}

function waitlistAddress() {
    showToast('Вы подписаны на уведомления', 'success');
}

document.addEventListener('DOMContentLoaded', function() {
    loadUserInitials();
    loadPopularAddresses();
});