function loadUserInitials() {
    const user = getUser();
    const initials = document.getElementById('userInitials');
    if (initials) {
        initials.textContent = getInitials(user.name);
    }
}

function switchDiagnoseTab(tab) {
    document.querySelectorAll('.card-tab').forEach(function(t) {
        t.classList.remove('active');
    });
    document.querySelector('[data-tab="' + tab + '"]').classList.add('active');
    
    if (tab === 'diagnostics') {
        document.getElementById('diagnosticsTab').style.display = 'block';
        document.getElementById('speedtestTab').style.display = 'none';
    } else {
        document.getElementById('diagnosticsTab').style.display = 'none';
        document.getElementById('speedtestTab').style.display = 'block';
    }
}

function runDiagnostics() {
    const result = document.getElementById('diagnoseResult');
    const output = document.getElementById('diagnoseOutput');
    if (!result || !output) return;
    
    result.classList.add('show');
    output.innerHTML = '<p>Проверка подключения...</p>';
    
    setTimeout(() => {
        output.innerHTML = `
            <p><i class="material-icons check-icon">check</i> Линия связи: <strong>ОК</strong></p>
            <p><i class="material-icons check-icon">check</i> NAT: <strong>ОК</strong></p>
            <p><i class="material-icons check-icon">check</i> DNS: <strong>ОК</strong></p>
            <p><i class="material-icons check-icon">check</i> Шлюз: <strong>ОК</strong></p>
            <hr class="diagnose-hr">
            <p><i class="material-icons info-icon">info</i> Проблем не обнаружено</p>
        `;
    }, 1500);
}

function runSpeedTest() {
    const speedDisplay = document.getElementById('speedDisplay');
    const speedCircle = document.getElementById('speedCircle');
    const currentSpeedEl = document.getElementById('currentSpeed');
    
    if (!speedDisplay || !speedCircle) return;
    
    speedCircle.style.transition = 'none';
    speedCircle.style.strokeDashoffset = '565';
    
    setTimeout(() => {
        speedCircle.style.transition = 'stroke-dashoffset 2s ease-out';
        speedCircle.style.strokeDashoffset = '0';
    }, 10);
    
    let speed = 0;
    const targetSpeed = Math.floor(Math.random() * 50) + 80;
    
    const interval = setInterval(() => {
        speed += Math.ceil(targetSpeed / 20);
        if (speed >= targetSpeed) {
            speed = targetSpeed;
            clearInterval(interval);
        }
        speedDisplay.textContent = speed;
    }, 100);
    
    setTimeout(() => {
        if (currentSpeedEl) currentSpeedEl.textContent = speed;
        showToast('Скорость: ' + speed + ' Мбит/с', 'success');
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    loadUserInitials();
});