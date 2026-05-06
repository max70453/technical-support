function loadUserInitials() {
    const user = getUser();
    const initials = document.getElementById('userInitials');
    if (initials) {
        initials.textContent = getInitials(user.name);
    }
}

let articles = [];

function loadArticles() {
    articles = getArticles();
    renderArticles(articles);
}

function renderArticles(articlesList) {
    const container = document.getElementById('articlesList');
    if (!container) return;
    
    container.innerHTML = articlesList.map(article => `
        <div class="article-card">
            <div class="article-title">${article.title}</div>
            <div class="article-preview">${article.preview}</div>
            <span class="article-category">${article.category}</span>
        </div>
    `).join('');
}

function searchArticles() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    
    const query = input.value.toLowerCase();
    const filtered = articles.filter(a => 
        a.title.toLowerCase().includes(query) || 
        a.preview.toLowerCase().includes(query) ||
        a.category.toLowerCase().includes(query)
    );
    renderArticles(filtered);
}

document.addEventListener('DOMContentLoaded', function() {
    loadUserInitials();
    loadArticles();
});