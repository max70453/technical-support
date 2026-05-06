var allTickets = [];
var allClients = [];
var currentFilter = 'all';
var currentOperator = JSON.parse(localStorage.getItem('netprovider_operator'));

function initProvider() {
    loadTickets();
    loadClients();
    updateDashboard();
    updateAnalytics();
    setCurrentDate();
    renderAllTickets();
    updateClientsTable();
}

function loadTickets() {
    var stored = localStorage.getItem('netprovider_tickets');
    allTickets = stored ? JSON.parse(stored) : [];
    allTickets = [
        { id: 1, clientName: 'Иванов Иван', email: 'ivan@test.com', title: 'Нет подключения к интернету', description: 'Пропал интернет, горит только лампочка питания', priority: 'high', status: 'new', date: '06.05.2026', tariff: 'Домашний 100', balance: 350 },
        { id: 2, clientName: 'Петрова Анна', email: 'petrova@test.com', title: 'Низкая скорость', description: 'Тариф 100 Мбит/с, а фактически 10 Мбит/с', priority: 'normal', status: 'progress', date: '05.05.2026', tariff: 'Домашний 100', balance: 1200 },
        { id: 3, clientName: 'Сидоров Алексей', email: 'sidorov@test.com', title: 'Проблема с роутером', description: 'Роутер не раздает WiFi', priority: 'high', status: 'resolved', date: '04.05.2026', tariff: 'Премиум 300', balance: 890 },
        { id: 4, clientName: 'Кузнецова Мария', email: 'maria@test.com', title: 'Не работает ТВ', description: 'Не загружаются каналы', priority: 'normal', status: 'new', date: '06.05.2026', tariff: 'ТВ+Интернет 100', balance: 560 },
        { id: 5, clientName: 'Смирнов Дмитрий', email: 'smirnov@test.com', title: 'Перебои со связью', description: 'Периодически пропадает сигнал', priority: 'normal', status: 'progress', date: '03.05.2026', tariff: 'Домашний 100', balance: 0 },
        { id: 6, clientName: 'Лебедева Ольга', email: 'olga@test.com', title: 'Хочу сменить тариф', description: 'Перейти на 300 Мбит/с', priority: 'low', status: 'resolved', date: '02.05.2026', tariff: 'Домашний 50', balance: 450 },
        { id: 7, clientName: 'Фёдоров Иван', email: 'fedorov@test.com', title: 'Не открываются сайты', description: 'Ошибка DNS', priority: 'high', status: 'new', date: '06.05.2026', tariff: 'Премиум 300', balance: 1200 },
        { id: 8, clientName: 'Николаева Елена', email: 'elena@test.com', title: 'Проблема с кабелем', description: 'Обрыв кабеля на улице', priority: 'high', status: 'resolved', date: '01.05.2026', tariff: 'Домашний 100', balance: 780 }
    ];
    localStorage.setItem('netprovider_tickets', JSON.stringify(allTickets));
}

function loadClients() {
    allClients = [
        { id: 1, name: 'Иванов Иван', email: 'ivan@test.com', tariff: 'Домашний 100', balance: 350, speed: 100, status: 'active', phone: '+7 999 123-45-67' },
        { id: 2, name: 'Петрова Анна', email: 'petrova@test.com', tariff: 'Домашний 100', balance: 1200, speed: 100, status: 'active', phone: '+7 999 234-56-78' },
        { id: 3, name: 'Сидоров Алексей', email: 'sidorov@test.com', tariff: 'Премиум 300', balance: 890, speed: 300, status: 'active', phone: '+7 999 345-67-89' },
        { id: 4, name: 'Кузнецова Мария', email: 'maria@test.com', tariff: 'ТВ+Интернет 100', balance: 560, speed: 100, status: 'active', phone: '+7 999 456-78-90' },
        { id: 5, name: 'Смирнов Дмитрий', email: 'smirnov@test.com', tariff: 'Домашний 100', balance: 0, speed: 100, status: 'blocked', phone: '+7 999 567-89-01' },
        { id: 6, name: 'Лебедева Ольга', email: 'olga@test.com', tariff: 'Домашний 50', balance: 450, speed: 50, status: 'active', phone: '+7 999 678-90-12' },
        { id: 7, name: 'Фёдоров Иван', email: 'fedorov@test.com', tariff: 'Премиум 300', balance: 1200, speed: 300, status: 'active', phone: '+7 999 789-01-23' },
        { id: 8, name: 'Николаева Елена', email: 'elena@test.com', tariff: 'Домашний 100', balance: 780, speed: 100, status: 'active', phone: '+7 999 890-12-34' }
    ];
}

function updateDashboard() {
    var newCount = allTickets.filter(function(t) { return t.status === 'new'; }).length;
    var progressCount = allTickets.filter(function(t) { return t.status === 'progress'; }).length;
    var resolvedCount = allTickets.filter(function(t) { return t.status === 'resolved'; }).length;
    
    document.getElementById('statNew').textContent = newCount;
    document.getElementById('statProgress').textContent = progressCount;
    document.getElementById('statResolved').textContent = resolvedCount;
    document.getElementById('statClients').textContent = allClients.length;
    document.getElementById('newTicketsBadge').textContent = newCount;
    
    var tbody = document.getElementById('recentTicketsTable');
    if (tbody) {
        tbody.innerHTML = allTickets.slice(0, 5).map(function(t) {
            var statusClass = 'status-' + t.status;
            var priorityClass = t.priority === 'high' ? 'priority-high' : 'priority-normal';
            return '<tr><td><span class="ticket-number">#' + t.id + '</span></td><td>' + (t.clientName || 'Клиент') + '</td><td>' + t.title + '</td><td><span class="status-badge ' + statusClass + '">' + getStatusText(t.status) + '</span></td><td class="' + priorityClass + '">' + (t.priority === 'high' ? 'Высокий' : 'Обычный') + '</td><td>' + t.date + '</td></tr>';
        }).join('');
    }
}

function setCurrentDate() {
    var now = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var el = document.getElementById('currentDate');
    if (el) el.textContent = now.toLocaleDateString('ru-RU', options);
}

function getStatusText(status) {
    var texts = { new: 'Новая', progress: 'В работе', resolved: 'Решена', closed: 'Закрыта' };
    return texts[status] || status;
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
    document.querySelectorAll('.provider-menu-item').forEach(function(m) { m.classList.remove('active'); });
    
    var pageEl = document.getElementById(pageId + 'Page');
    if (pageEl) pageEl.classList.add('active');
    
    document.querySelectorAll('.provider-menu-item').forEach(function(item) {
        if (item.getAttribute('onclick') && item.getAttribute('onclick').indexOf(pageId) !== -1) {
            item.classList.add('active');
        }
    });
    
    if (pageId === 'clients') updateClientsTable();
    if (pageId === 'tickets') renderAllTickets();
}

function renderAllTickets(filter) {
    var tbody = document.getElementById('allTicketsTable');
    if (!tbody) return;
    
    var filtered = filter && filter !== 'all' ? allTickets.filter(function(t) { return t.status === filter; }) : allTickets;
    tbody.innerHTML = filtered.map(function(t) {
        var statusClass = 'status-' + t.status;
        var priorityClass = t.priority === 'high' ? 'priority-high' : 'priority-normal';
        return '<tr><td><span class="ticket-number">#' + t.id + '</span></td><td>' + (t.clientName || 'Клиент') + '</td><td>' + t.title + '</td><td><span class="status-badge ' + statusClass + '">' + getStatusText(t.status) + '</span></td><td class="' + priorityClass + '">' + (t.priority === 'high' ? 'Высокий' : 'Обычный') + '</td><td>' + t.date + '</td><td><button class="action-btn action-btn-secondary" onclick="viewTicket(' + t.id + ')">Открыть</button></td></tr>';
    }).join('');
}

function updateClientsTable() {
    var tbody = document.getElementById('clientsTable');
    if (!tbody) return;
    
    var searchQuery = document.getElementById('clientSearch') ? document.getElementById('clientSearch').value.toLowerCase() : '';
    var filtered = searchQuery ? allClients.filter(function(c) {
        return c.name.toLowerCase().indexOf(searchQuery) !== -1 || c.email.toLowerCase().indexOf(searchQuery) !== -1;
    }) : allClients;
    
    tbody.innerHTML = filtered.map(function(c) {
        var statusClass = c.status === 'active' ? 'status-resolved' : 'status-closed';
        return '<tr><td>#' + c.id + '</td><td>' + c.name + '</td><td>' + c.email + '</td><td>' + c.tariff + '</td><td>' + c.balance + ' ₽</td><td><span class="status-badge ' + statusClass + '">' + (c.status === 'active' ? 'Активен' : 'Отключен') + '</span></td><td><button class="action-btn action-btn-secondary" onclick="viewCustomer(\'' + c.email + '\')">Открыть</button></td></tr>';
    }).join('');
}

function searchClients() {
    updateClientsTable();
}

function filterTickets(status) {
    var btns = document.querySelectorAll('.ticket-filter-btn');
    btns.forEach(function(btn) { btn.classList.remove('active'); });
    if (event && event.target) event.target.classList.add('active');
    
    renderAllTickets(status);
}

function viewCustomer(email) {
    if (!email || email.indexOf('no-email') !== -1) {
        showCustomerCard({ name: 'Новый клиент', email: 'new@test.com', tariff: 'Домашний 100', balance: 0, speed: 100, status: 'active' });
        return;
    }
    
    var client = allClients.find(function(c) { return c.email === email; });
    var ticket = !client ? allTickets.find(function(t) { return t.email === email; }) : null;
    
    if (ticket && !client) {
        client = { name: ticket.clientName || 'Клиент', email: email, tariff: ticket.tariff || '-', balance: ticket.balance || 0, speed: ticket.speed || 0, status: 'active' };
    }
    
    if (!client) {
        client = { name: email.split('@')[0], email: email, tariff: 'Домашний 100', balance: 0, speed: 100, status: 'active' };
    }
    
    showCustomerCard(client);
}

function showCustomerCard(client) {
    var nameEl = document.getElementById('customerName');
    var emailEl = document.getElementById('customerEmail');
    var tariffEl = document.getElementById('customerTariff');
    var balanceEl = document.getElementById('customerBalance');
    var speedEl = document.getElementById('customerSpeed');
    var historyContainer = document.getElementById('customerHistory');
    var modal = document.getElementById('customerModal') || document.getElementById('customerCardModal');
    
    if (nameEl) nameEl.textContent = client.name;
    if (emailEl) emailEl.textContent = client.email || '-';
    if (tariffEl) tariffEl.textContent = client.tariff || '-';
    if (balanceEl) balanceEl.textContent = (client.balance || 0) + ' ₽';
    if (speedEl) speedEl.textContent = (client.speed || 0) + ' Мбит/с';
    
    if (historyContainer) {
        var history = allTickets.filter(function(t) { return t.email === client.email; });
        if (history.length === 0) {
            historyContainer.innerHTML = '<p style="color:#64748b;">Нет заявок</p>';
        } else {
            historyContainer.innerHTML = history.map(function(t) {
                return '<div style="padding:8px 0;border-left:2px solid #e2e8f0;padding-left:12px;margin-bottom:8px;"><div style="font-size:0.8rem;color:#64748b;">' + t.date + '</div><div><strong>' + t.title + '</strong></div></div>';
            }).join('');
        }
    }
    
    if (modal) {
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
    } else {
        console.log('Modal not found');
    }
}

function closeCustomerCard() {
    var modal = document.getElementById('customerModal') || document.getElementById('customerCardModal');
    if (modal) modal.style.display = 'none';
}

function logout() {
    localStorage.removeItem('netprovider_operator');
    window.location.href = 'loginprov.html';
}

var selectedTicketId = null;

function viewTicket(id) {
    selectedTicketId = id;
    var ticket = allTickets.find(function(t) { return t.id === id; });
    if (!ticket) return;
    
    document.getElementById('modalTicketId').textContent = ticket.id;
    document.getElementById('ticketDetails').innerHTML = '<div style="padding:16px;background:#f8fafc;border-radius:8px;margin-bottom:16px;"><div style="font-size:0.9rem;color:#64748b;margin-bottom:8px;">' + ticket.title + '</div><div style="margin-bottom:8px;color:#334155;">' + (ticket.description || 'Нет описания') + '</div><div style="font-weight:600;">' + (ticket.clientName || 'Клиент') + '</div><div style="color:#64748b;font-size:0.85rem;">' + (ticket.email || '-') + '</div><div style="font-size:0.8rem;color:#64748b;margin-top:8px;">Тариф: ' + (ticket.tariff || '-') + ' | Баланс: ' + (ticket.balance || 0) + ' ₽</div></div>';
    
    var statusSelect = document.getElementById('statusSelect');
    if (statusSelect) statusSelect.value = ticket.status;
    
    var replyText = document.getElementById('replyText');
    if (replyText) replyText.value = '';
    
    document.getElementById('ticketModal').style.display = 'block';
    
    var modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.position = 'fixed';
        modalContent.style.left = '50%';
        modalContent.style.top = '50%';
        modalContent.style.transform = 'translate(-50%, -50%)';
    }
    
    var btns = document.querySelectorAll('.status-btn');
    btns.forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.getAttribute('data-status') === ticket.status) {
            btn.classList.add('active');
        }
    });
}

function closeTicketDetail() {
    document.getElementById('ticketModal').style.display = 'none';
    selectedTicketId = null;
}

function sendReply() {
    if (!selectedTicketId) return;
    
    var replyText = document.getElementById('replyText').value.trim();
    if (!replyText) {
        alert('Введите текст ответа');
        return;
    }
    
    var ticket = allTickets.find(function(t) { return t.id === selectedTicketId; });
    if (!ticket) return;
    
    if (!ticket.replies) ticket.replies = [];
    ticket.replies.push({
        text: replyText,
        operator: currentOperator ? currentOperator.name : 'Оператор',
        date: new Date().toLocaleDateString('ru-RU')
    });
    
    localStorage.setItem('netprovider_tickets', JSON.stringify(allTickets));
    
    showToast('Ответ отправлен');
    closeTicketDetail();
    updateDashboard();
    renderAllTickets(currentFilter);
}

function updateTicketStatus() {
    if (!selectedTicketId) return;
    
    var newStatus = document.getElementById('statusSelect') ? document.getElementById('statusSelect').value : currentFilter;
    var ticket = allTickets.find(function(t) { return t.id === selectedTicketId; });
    if (!ticket) return;
    
    ticket.status = newStatus;
    localStorage.setItem('netprovider_tickets', JSON.stringify(allTickets));
    
    updateDashboard();
    renderAllTickets(currentFilter);
}

function setTicketStatus(status) {
    if (!selectedTicketId) return;
    
    var ticket = allTickets.find(function(t) { return t.id === selectedTicketId; });
    if (!ticket) return;
    
    ticket.status = status;
    localStorage.setItem('netprovider_tickets', JSON.stringify(allTickets));
    
    var btns = document.querySelectorAll('.status-btn');
    btns.forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.getAttribute('data-status') === status) {
            btn.classList.add('active');
        }
    });
    
    updateDashboard();
    renderAllTickets(currentFilter);
    showToast('Статус изменён');
}

function updateAnalytics() {
    var total = allTickets.length;
    var newT = allTickets.filter(function(t) { return t.status === 'new'; }).length;
    var progressT = allTickets.filter(function(t) { return t.status === 'progress'; }).length;
    var resolvedT = allTickets.filter(function(t) { return t.status === 'resolved'; }).length;
    
    var barNew = document.getElementById('barNew');
    var barProgress = document.getElementById('barProgress');
    var barResolved = document.getElementById('barResolved');
    
    if (total > 0) {
        var maxWidth = Math.max(newT, progressT, resolvedT, 1);
        if (barNew) { barNew.style.width = (newT / maxWidth * 100) + '%'; barNew.textContent = newT; }
        if (barProgress) { barProgress.style.width = (progressT / maxWidth * 100) + '%'; barProgress.textContent = progressT; }
        if (barResolved) { barResolved.style.width = (resolvedT / maxWidth * 100) + '%'; barResolved.textContent = resolvedT; }
    }
    
    var avgTimeEl = document.getElementById('avgTime');
    var firstContactEl = document.getElementById('firstContact');
    var totalTicketsEl = document.getElementById('totalTickets');
    var csatScoreEl = document.getElementById('csatScore');
    
    if (avgTimeEl) avgTimeEl.textContent = '2.5ч';
    if (firstContactEl) firstContactEl.textContent = '78%';
    if (totalTicketsEl) totalTicketsEl.textContent = total;
    if (csatScoreEl) csatScoreEl.textContent = '4.8';
}

function refreshData() {
    loadTickets();
    loadClients();
    updateDashboard();
    updateAnalytics();
}

function insertTemplate(text) {
    var replyText = document.getElementById('replyText');
    if (replyText) replyText.value = text;
}

function addTemplate() {
    var name = prompt('Название шаблона:');
    if (!name) return;
    var text = prompt('Текст шаблона:');
    if (!text) return;
    
    var templatesTable = document.getElementById('templatesTable');
    if (templatesTable) {
        var row = templatesTable.insertRow();
        row.innerHTML = '<td>' + name + '</td><td>' + text + '</td><td><button class="action-btn action-btn-secondary" onclick="useTemplate(this)">Использовать</button></td>';
    }
    
    showToast('Шаблон добавлен');
}

function useTemplate(btn) {
    var row = btn.closest('tr');
    var text = row.cells[1].textContent;
    var replyText = document.getElementById('replyText');
    if (replyText) replyText.value = text;
}

function closeTicketModal() {
    var modal = document.getElementById('ticketModal') || document.getElementById('ticketDetailModal');
    if (modal) modal.style.display = 'none';
    selectedTicketId = null;
}

function closeCustomerModal() {
    var modal = document.getElementById('customerModal') || document.getElementById('customerCardModal');
    if (modal) modal.style.display = 'none';
}

function showToast(message) {
    var toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = 'display:none;position:fixed;bottom:30px;right:30px;background:#10b981;border-radius:12px;padding:16px 24px;color:white;z-index:99999;box-shadow:0 4px 20px rgba(0,0,0,0.2);';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(function() { toast.style.display = 'none'; }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    initProvider();
});