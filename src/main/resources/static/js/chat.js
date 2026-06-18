// ============================================================
// Nova AI Chat – Frontend Logic
// ============================================================

const csrfToken  = document.querySelector('meta[name="_csrf"]')?.content || '';
const csrfHeader = document.querySelector('meta[name="_csrf_header"]')?.content || 'X-CSRF-TOKEN';

const messagesArea    = document.getElementById('messagesArea');
const userInput       = document.getElementById('userInput');
const sendBtn         = document.getElementById('sendBtn');
const typingIndicator = document.getElementById('typingIndicator');
const charCountEl     = document.getElementById('charCount');
const wordCountEl     = document.getElementById('wordCount');
const scrollBtn       = document.getElementById('scrollBtn');
const botStatus       = document.getElementById('botStatus');
const themeBtn        = document.getElementById('themeBtn');

let isDark = false;
let messageCount = 0;

// ── Init ────────────────────────────────────────────────────
window.addEventListener('load', () => {
    userInput.focus();

    // Check if a topic was preloaded from home page
    const preload = sessionStorage.getItem('preloadMessage');
    if (preload) {
        sessionStorage.removeItem('preloadMessage');
        setTimeout(() => sendMessage(preload), 600);
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('novaTheme');
    if (savedTheme === 'dark') applyTheme(true);
});

// ── Input Events ────────────────────────────────────────────
userInput.addEventListener('input', () => {
    const len = userInput.value.length;
    charCountEl.textContent = `${len}/1000`;
    charCountEl.style.color = len > 900 ? '#dc2626' : '';

    const words = userInput.value.trim().split(/\s+/).filter(Boolean).length;
    wordCountEl.textContent = `${words} word${words !== 1 ? 's' : ''}`;
});

function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
}

// ── Send Message ────────────────────────────────────────────
async function sendMessage(text) {
    const msg = (text || userInput.value).trim();
    if (!msg) return;

    // Add user message
    appendMessage(msg, 'user');

    // Clear input
    if (!text) {
        userInput.value = '';
        charCountEl.textContent = '0/1000';
        wordCountEl.textContent = '0 words';
        userInput.style.height = 'auto';
        userInput.focus();
    }

    // Disable send
    sendBtn.disabled = true;
    showTyping(true);
    scrollToBottom();

    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                [csrfHeader]: csrfToken
            },
            body: JSON.stringify({ message: msg })
        });

        if (!res.ok) throw new Error('Server error');
        const data = await res.json();

        // Simulate natural typing delay
        await delay(600 + Math.min(data.response.length * 8, 1400));

        showTyping(false);
        appendMessage(data.response, 'bot', data.timestamp);
    } catch (err) {
        showTyping(false);
        appendMessage('⚠️ Sorry, I encountered an error. Please try again!', 'bot');
    } finally {
        sendBtn.disabled = false;
        scrollToBottom();
        userInput.focus();
    }
}

// ── Append Message ──────────────────────────────────────────
function appendMessage(text, sender, time) {
    const now = time || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    messageCount++;

    const row = document.createElement('div');
    row.className = `message-row ${sender === 'bot' ? 'bot-row' : 'user-row'}`;

    const isBot = sender === 'bot';
    const formattedText = formatText(text);

    row.innerHTML = `
        ${isBot ? '<div class="msg-avatar">🤖</div>' : ''}
        <div class="msg-content">
            <div class="message ${isBot ? 'bot-message' : 'user-message'}">
                <div class="msg-text">${formattedText}</div>
                <div class="msg-time">${now}</div>
            </div>
        </div>
        ${!isBot ? '<div class="msg-avatar" style="font-size:1.5rem">👤</div>' : ''}
    `;

    messagesArea.appendChild(row);

    // Animate in
    row.style.opacity = '0';
    row.style.transform = 'translateY(10px)';
    requestAnimationFrame(() => {
        row.style.transition = 'opacity .25s ease, transform .25s ease';
        row.style.opacity = '1';
        row.style.transform = 'translateY(0)';
    });

    return row;
}

// ── Text Formatting ─────────────────────────────────────────
function formatText(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code style="background:rgba(0,0,0,.1);padding:.1em .3em;border-radius:4px;font-family:monospace">$1</code>')
        .replace(/\n/g, '<br>');
}

// ── Typing Indicator ────────────────────────────────────────
function showTyping(show) {
    typingIndicator.style.display = show ? 'flex' : 'none';
    if (botStatus) botStatus.textContent = show ? '● Typing...' : '● Online – Ready to chat';
    if (botStatus) botStatus.className = 'bot-status' + (show ? ' typing' : '');
    if (show) scrollToBottom();
}

// ── Scroll ───────────────────────────────────────────────────
function scrollToBottom() {
    messagesArea.scrollTo({ top: messagesArea.scrollHeight, behavior: 'smooth' });
}

messagesArea.addEventListener('scroll', () => {
    const atBottom = messagesArea.scrollTop + messagesArea.clientHeight >= messagesArea.scrollHeight - 100;
    scrollBtn.style.display = atBottom ? 'none' : 'flex';
});

// ── Clear Chat ───────────────────────────────────────────────
function clearChat() {
    if (!confirm('Clear all messages? This cannot be undone.')) return;
    const rows = messagesArea.querySelectorAll('.message-row:not(#welcomeMsg)');
    rows.forEach(r => r.remove());
    messageCount = 0;
}

// ── Dark Mode ────────────────────────────────────────────────
function toggleTheme() {
    applyTheme(!isDark);
}

function applyTheme(dark) {
    isDark = dark;
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (themeBtn) themeBtn.textContent = dark ? '☀️' : '🌙';
    localStorage.setItem('novaTheme', dark ? 'dark' : 'light');
}

// ── Sidebar ──────────────────────────────────────────────────
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// Close sidebar on outside click (mobile)
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.querySelector('.sidebar-toggle');
    if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== toggle) {
        sidebar.classList.remove('open');
    }
});

// ── Suggestions ─────────────────────────────────────────────
function sendSuggestion(msg) {
    document.getElementById('sidebar')?.classList.remove('open');
    sendMessage(msg);
}

// ── Helpers ──────────────────────────────────────────────────
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
