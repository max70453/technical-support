const defaultUser = {
    name: 'Алексей Петров',
    email: 'alex@example.com',
    password: 'password123',
    balance: 1250,
    tariff: 'Домашний 100',
    speed: 100,
    price: 490,
    nextPayment: '15.06.2026'
};

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('netprovider_currentUser')) || null;
}

function setCurrentUser(user) {
    if (user) {
        localStorage.setItem('netprovider_currentUser', JSON.stringify(user));
    } else {
        localStorage.removeItem('netprovider_currentUser');
    }
}

function logout() {
    localStorage.removeItem('netprovider_currentUser');
    window.location.href = 'login.html';
}

function getUser() {
    return JSON.parse(localStorage.getItem('netprovider_user')) || defaultUser;
}

function saveUser(userData) {
    localStorage.setItem('netprovider_user', JSON.stringify(userData));
}

function getTickets() {
    return JSON.parse(localStorage.getItem('netprovider_tickets')) || [];
}

function saveTickets(tickets) {
    localStorage.setItem('netprovider_tickets', JSON.stringify(tickets));
}

function addTicket(ticket) {
    const tickets = getTickets();
    tickets.unshift(ticket);
    saveTickets(tickets);
}

function getArticles() {
    return [
        { id: 1, title: 'Нет интернета - что делать?', category: 'Подключение', preview: 'Если пропал интернет, проверьте следующее: 1) Перезагрузите роутер 2) Проверьте кабель 3) Позвоните в поддержку' },
        { id: 2, title: 'Как настроить роутер?', category: 'Оборудование', preview: 'Подключите роутер к компьютеру, введите в браузере 192.168.0.1, следуйте мастеру настройки' },
        { id: 3, title: 'Низкая скорость соединения', category: 'Скорость', preview: 'Причины медленного интернета: загрузка канала, слабый сигнал WiFi, проблемы на линии' },
        { id: 4, title: 'Как оплатить услуги?', category: 'Оплата', preview: 'Оплатить можно через личный кабинет, банковской картой или в терминале' },
        { id: 5, title: 'Пароль от WiFi', category: 'Безопасность', preview: 'Найдите пароль на наклейке роутера или сбросьте настройки до_factory' },
        { id: 6, title: 'Перебои со соединением', category: 'Подключение', preview: 'При частых разрывах проверьте кабель, перезагрузите роутер, обновите прошивку' },
        { id: 7, title: 'Настройка WiFi на 5 ГГц', category: 'Оборудование', preview: 'Для более стабильного соединения настройте роутер на диапазон 5 ГГц' },
        { id: 8, title: 'Как проверить скорость?', category: 'Скорость', preview: 'Используйте наш тест скорости в разделе Диагностика или сторонние сервисы' },
        { id: 9, title: 'Подключение VPN', category: 'Скорость', preview: 'VPN может значительно снижать скорость. Отключите VPN для проверки реальной скорости' },
        { id: 10, title: 'Роутер перегревается', category: 'Оборудование', preview: 'Обеспечьте вентиляцию роутера, не накрывайте его, переставьте в проветриваемое место' },
        { id: 11, title: 'Замена роутера', category: 'Оборудование', preview: 'При покупке нового роутера обратитесь в поддержку для настройки под ваш тариф' },
        { id: 12, title: 'Перенос даты оплаты', category: 'Оплата', preview: 'Изменить дату списания можно в личном кабинете в разделе Настройки' }
    ];
}

function getStatusText(status) {
    const texts = { new: 'Новая', progress: 'В работе', resolved: 'Решена' };
    return texts[status] || status;
}

function getTicketTitle(category) {
    const titles = {
        'no-internet': 'Нет подключения к интернету',
        'slow-speed': 'Низкая скорость соединения',
        'no-connect': 'Не подключается к сети',
        'equipment': 'Проблема с оборудованием',
        'billing': 'Вопрос по оплате',
        'other': 'Другая проблема'
    };
    return titles[category] || 'Заявка';
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

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('');
}