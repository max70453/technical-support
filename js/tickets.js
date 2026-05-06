const defaultTickets = [
    { id: 1, category: 'no-internet', title: 'Нет подключения к интернету', description: 'После грозы пропало соединение, роутер не подключается к сети', priority: 'high', status: 'progress', date: '03.05.2026' },
    { id: 2, category: 'slow-speed', title: 'Низкая скорость соединения', description: 'Тариф 100 Мбит, но скорость не превышает 30 Мбит', priority: 'normal', status: 'new', date: '04.05.2026' },
    { id: 3, category: 'equipment', title: 'Проблема с оборудованием', description: 'Роутер стал сильно греться и издавать необычные звуки', priority: 'high', status: 'resolved', date: '28.04.2026' }
];

function filterValidTickets(tickets) {
    if (!tickets || !Array.isArray(tickets)) return [];
    return tickets.filter(t => t && typeof t.id === 'number' && typeof t.title === 'string' && t.title.length > 0);
}

function initTickets() {
    let stored = localStorage.getItem('netprovider_tickets');
    let tickets = [];
    
    if (stored) {
        try {
            let parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                tickets = parsed.filter(function(t) {
                    return t && t.id && t.title;
                });
            }
        } catch (e) {}
    }
    
    if (tickets.length === 0) {
        tickets = defaultTickets;
    }
    
    localStorage.setItem('netprovider_tickets', JSON.stringify(tickets));
    return tickets;
}

function loadUserInitials() {
    const user = getCurrentUser() || defaultUser;
    const initials = document.getElementById('userInitials');
    if (initials) {
        initials.textContent = getInitials(user.name);
    }
}

function loadTickets() {
    const tickets = initTickets();
    renderTickets(tickets);
    updateStats(tickets);
}

function renderTickets(tickets) {
    const container = document.getElementById('ticketsList');
    if (!container) return;
    
    if (tickets.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="material-icons">inbox</i><p>У вас пока нет заявок</p></div>';
        return;
    }
    
    let html = '';
    for (var i = 0; i < tickets.length; i++) {
        var ticket = tickets[i];
        html += '<div class="ticket-item ' + ticket.status + '">';
        html += '<div class="ticket-header">';
        html += '<span class="ticket-id">#' + ticket.id + '</span>';
        html += '<span class="ticket-status ' + ticket.status + '">' + getStatusText(ticket.status) + '</span>';
        html += '</div>';
        
        if (ticket.status === 'progress') {
            html += '<div class="ticket-progress-bar"><div class="ticket-progress-fill" style="width: 60%;"></div></div>';
            html += '<div class="ticket-progress-text">Выполнено 60%</div>';
        }
        
        html += '<div class="ticket-title">' + ticket.title + '</div>';
        html += '<div class="ticket-desc">' + ticket.description + '</div>';
        html += '<div class="ticket-meta">';
        html += '<span><i class="material-icons meta-icon">schedule</i> ' + ticket.date + '</span>';
        html += '<span><i class="material-icons meta-icon">flag</i> ' + (ticket.priority === 'high' ? 'Высокий' : 'Обычный') + '</span>';
        html += '</div>';
        html += '</div>';
    }
    container.innerHTML = html;
}

function updateStats(tickets) {
    const totalEl = document.getElementById('totalTickets');
    const newEl = document.getElementById('newTickets');
    const progressEl = document.getElementById('progressTickets');
    const resolvedEl = document.getElementById('resolvedTickets');
    
    if (totalEl) totalEl.textContent = tickets.length;
    if (newEl) newEl.textContent = tickets.filter(t => t.status === 'new').length;
    if (progressEl) progressEl.textContent = tickets.filter(t => t.status === 'progress').length;
    if (resolvedEl) resolvedEl.textContent = tickets.filter(t => t.status === 'resolved').length;
}

function openNewTicketModal() {
    document.getElementById('newTicketModal').style.display = 'block';
}

function closeNewTicketModal() {
    document.getElementById('newTicketModal').style.display = 'none';
    document.getElementById('ticketForm').reset();
}

function submitTicket(e) {
    e.preventDefault();
    
    const category = document.getElementById('ticketCategory').value;
    const priority = document.getElementById('ticketPriority').value;
    const description = document.getElementById('ticketDescription').value;
    
    let tickets = initTickets();
    const validIds = tickets.map(function(t) { return t.id; });
    const newId = validIds.length > 0 ? Math.max.apply(null, validIds) + 1 : 1;
    
    const newTicket = {
        id: newId,
        category,
        title: getTicketTitle(category),
        description,
        priority,
        status: 'new',
        date: new Date().toLocaleDateString('ru-RU')
    };
    
    tickets.unshift(newTicket);
    localStorage.setItem('netprovider_tickets', JSON.stringify(tickets));
    
    closeNewTicketModal();
    loadTickets();
    showToast('Заявка успешно создана!', 'success');
}

document.addEventListener('DOMContentLoaded', function() {
    loadUserInitials();
    loadTickets();
});