function loadUserInitials() {
    const user = getUser();
    const initials = document.getElementById('userInitials');
    if (initials) {
        initials.textContent = getInitials(user.name);
    }
}

function loadDashboard() {
    const user = getUser();
    
    const userName = document.getElementById('userName');
    const userTariff = document.getElementById('userTariff');
    const userSpeed = document.getElementById('userSpeed');
    const userBalance = document.getElementById('userBalance');
    const connectionStatus = document.getElementById('connectionStatus');
    
    if (userName) userName.textContent = user.name.split(' ')[0];
    if (userTariff) userTariff.textContent = user.tariff;
    if (userSpeed) userSpeed.textContent = user.speed;
    if (userBalance) userBalance.textContent = user.balance.toLocaleString() + ' ₽';
    if (connectionStatus) connectionStatus.textContent = 'Подключено';
}

function loadRecentTickets() {
    const tickets = getTickets();
    const container = document.getElementById('recentTickets');
    if (!container) return;
    
    if (tickets.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="material-icons">inbox</i>
                <p>У вас пока нет заявок</p>
            </div>
        `;
        return;
    }
    
    const recent = tickets.slice(0, 3);
    container.innerHTML = recent.map(ticket => `
        <div class="ticket-item ${ticket.status}">
            <div class="ticket-header">
                <span class="ticket-id">#${ticket.id}</span>
                <span class="ticket-status ${ticket.status}">${getStatusText(ticket.status)}</span>
            </div>
            <div class="ticket-title">${ticket.title}</div>
            <div class="ticket-meta">
                <span><i class="material-icons meta-icon">schedule</i> ${ticket.date}</span>
            </div>
        </div>
    `).join('');
}

function loadStats() {
    const tickets = getTickets();
    const totalEl = document.getElementById('totalTickets');
    if (totalEl) {
        totalEl.textContent = tickets.length;
    }
}

function openChat() {
    document.getElementById('chatModal').classList.add('show');
}

function closeChat() {
    document.getElementById('chatModal').classList.remove('show');
}

function sendMessage() {
    var input = document.getElementById('chatInput');
    if (!input) return;
    
    var message = input.value.trim();
    if (!message) return;

    var messagesContainer = document.getElementById('chatMessages');
    var time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    messagesContainer.innerHTML += '<div class="chat-message user">' + message + '<div class="time">' + time + '</div></div>';

    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    var response = getBotResponse(message.toLowerCase());
    
    setTimeout(function() {
        messagesContainer.innerHTML += '<div class="chat-message support">' + response + '<div class="time">' + time + '</div></div>';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000 + Math.random() * 1000);
}

function getBotResponse(message) {
    var responses = {
        'привет': 'Здравствуйте! Рад видеть вас. Чем могу помочь?',
        'здравствуй': 'Здравствуйте! Рад видеть вас. Чем могу помочь?',
        'приветик': 'Привет! Как дела? Чем могу быть полезен?',
        'hi': 'Hello! How can I help you?',
        'hello': 'Hi there! What can I help you with?',
        
        'интернет': 'По вопросам интернета могу предложить: проверить баланс в профиле, запустить диагностику сети, или создать заявку на проблему.',
        'нет интернета': 'Очень жаль, что пропал интернет. Попробуйте: 1) Перезагрузить роутер 2) Проверить кабели 3) Проверить баланс. Если не поможет - создайте заявку.',
        'медленно': 'Низкая скорость? Попробуйте: 1) Подключить устройство по проводу 2) Перезагрузить роутер 3) Проверить, не качает ли кто-то файлы',
        
        'тариф': 'Посмотреть и сменить тариф вы можете в разделе "Профиль". Там же увидите текущий тариф и стоимость.',
        'скорость': 'Для проверки скорости перейдите в раздел "Диагностика" и нажмите "Измерить скорость".',
        'баланс': 'Ваш баланс можно посмотреть в разделе "Профиль". Там же есть история платежей.',
        'оплатить': 'Для оплаты перейдите в "Профиль" - там будет кнопка оплаты или реквизиты для перевода.',
        
        'заявка': 'Чтобы создать заявку, перейдите в раздел "Заявки" и нажмите "Новая заявка". Опишите проблему подробно.',
        'проблема': 'Опишите вашу проблему подробнее, и я постараюсь помочь. Или перейдите в раздел "Заявки" для официального обращения.',
        'помощь': 'Я могу помочь с: интернетом, тарифами, скоростью, балансом, заявками. Просто напишите, что вас интересует!',
        
        'спасибо': 'Пожалуйста! Рад был помочь. Если будут ещё вопросы - обращайтесь.',
        'спс': 'Пожалуйста! Обращайтесь, если что-то ещё понадобится.',
        'благодар': 'Спасибо! Всегда рад помочь. Хорошего дня!',
        
        'как дела': 'У меня всё отлично, я всегда готов помочь! А как у вас дела?',
        'как ты': 'Я - виртуальный помощник, всегда готов к работе 24/7! Чем могу помочь?',
        
        'пока': 'До свидания! Рад был помочь. Приходите ещё!',
        'до свидания': 'До свидания! Хорошего дня!',
        'bye': 'Goodbye! Have a nice day!',
        
        'что ты умеешь': 'Я могу ответить на вопросы об интернете, тарифах, скорости, заявках. Просто спросите!',
        'кто ты': 'Я - виртуальный помощник технической поддержки NetProvider. Помогаю отвечать на вопросы об услугах.',
    };
    
    for (var key in responses) {
        if (message.includes(key)) {
            return responses[key];
        }
    }
    
    var randomResponses = [
        'Интересный вопрос! Для подробной информации перейдите в соответствующий раздел: Заявки, Диагностика или Профиль.',
        'Понял вас. Если нужна помощь с заявкой - пишите "заявка", с интернетом - "интернет", с тарифом - "тариф".',
        'Хороший вопрос! Уточните, пожалуйста, что именно вас интересует: интернет, тарифы, скорость или что-то другое?',
        'Ясно. Для решения вашего вопроса лучше обратиться в раздел "Заявки" или позвонить в поддержку.',
        'Понимаю. Попробую помочь - задайте вопрос по конкретной теме: интернет, тариф, скорость, баланс или заявка.'
    ];
    
    return randomResponses[Math.floor(Math.random() * randomResponses.length)];
}

function initChat() {
    var modal = document.getElementById('chatModal');
    var sendBtn = document.getElementById('chatSendBtn');
    var chatInput = document.getElementById('chatInput');
    
    if (sendBtn) {
        sendBtn.onclick = sendMessage;
    }
    
    if (chatInput) {
        chatInput.onkeypress = function(e) {
            if (e.key === 'Enter') sendMessage();
        };
    }
    
    if (modal) {
        modal.onclick = function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    loadUserInitials();
    loadDashboard();
    loadRecentTickets();
    loadStats();
    initChat();
});