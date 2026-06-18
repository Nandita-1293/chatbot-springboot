// Auth page utilities

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}

// Password strength
const pwdInput = document.getElementById('password');
if (pwdInput) {
    pwdInput.addEventListener('input', function() {
        const val = this.value;
        const bar = document.getElementById('strengthBar');
        const fill = document.getElementById('strengthFill');
        const label = document.getElementById('strengthText');

        if (!bar) return;
        if (val.length === 0) { bar.style.display = 'none'; return; }
        bar.style.display = 'flex';

        let score = 0;
        if (val.length >= 6) score++;
        if (val.length >= 10) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        const levels = [
            { pct: '20%', color: '#dc2626', text: 'Very Weak' },
            { pct: '40%', color: '#f97316', text: 'Weak' },
            { pct: '60%', color: '#eab308', text: 'Fair' },
            { pct: '80%', color: '#3b82f6', text: 'Strong' },
            { pct: '100%', color: '#22c55e', text: 'Very Strong' },
        ];
        const lvl = levels[Math.min(score - 1, 4)] || levels[0];
        fill.style.width = lvl.pct;
        fill.style.background = lvl.color;
        label.textContent = lvl.text;
        label.style.color = lvl.color;
    });
}

// Confirm password match
const confirmInput = document.getElementById('confirmPassword');
if (confirmInput && pwdInput) {
    confirmInput.addEventListener('input', function() {
        if (this.value && pwdInput.value !== this.value) {
            this.setCustomValidity('Passwords do not match');
            this.style.borderColor = '#dc2626';
        } else {
            this.setCustomValidity('');
            this.style.borderColor = '';
        }
    });
}

// Mobile number: only digits
const mobileInput = document.getElementById('mobile');
if (mobileInput) {
    mobileInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').slice(0, 10);
    });
}

// Auto-dismiss alerts
setTimeout(() => {
    document.querySelectorAll('.alert').forEach(a => {
        a.style.transition = 'opacity .5s ease';
        a.style.opacity = '0';
        setTimeout(() => a.remove(), 500);
    });
}, 5000);
