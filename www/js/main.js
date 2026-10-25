const html = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const modal = document.getElementById('contactModal');
const modalClose = document.querySelector('[data-close-modal]');
const openContactButtons = document.querySelectorAll('[data-contact-open]');

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

const applyTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
});

navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
});

document.querySelectorAll('#nav-links a').forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Открыть меню');
    });
});

const openModal = () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
};

const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
};

openContactButtons.forEach(button => button.addEventListener('click', openModal));
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
    }
});

const terminalData = [
    {
        id: 1,
        lines: [
            '$ docker compose up -d --build',
            'Creating network ... done',
            'Building app ... done',
            'Container redis Healthy',
            'Container app Started',
            'Container nginx Started'
        ],
        delay: 80
    },
    {
        id: 2,
        lines: [
            '$ docker compose ps',
            'NAME                  COMMAND                  STATUS             PORTS',
            'app                   "python app.py"         running (healthy)  0.0.0.0:3000->8080/tcp',
            'redis                 "redis-server"          running            6379/tcp',
            'nginx                 "nginx -g daemon off"   running            0.0.0.0:8080->80/tcp'
        ],
        delay: 60
    },
    {
        id: 3,
        lines: [
            '$ docker compose logs --tail 10 app',
            'app_1  | * Debugging is on',
            'app_1  | * Running on all addresses (0.0.0.0)',
            'app_1  | * Running on http://127.0.0.1:5000/',
            'app_1  | * Restarting with stat',
            'app_1  | * Press CTRL+C to quit'
        ],
        delay: 60
    },
    {
        id: 4,
        lines: [
            '$ docker compose restart app',
            'Container app ... done',
            'Health check passed',
            'Service available on 127.0.0.1:3000'
        ],
        delay: 90
    }
];

const terminalTimers = new Map();

function restartTerminal(id) {
    const container = document.querySelector(`[data-terminal-content="${id}"]`);
    if (!container) return;

    const output = container.querySelector('pre');
    const cursor = container.querySelector('.terminal-cursor');
    const existing = terminalTimers.get(id) || [];
    existing.forEach(timer => clearTimeout(timer));
    terminalTimers.set(id, []);

    const data = terminalData.find(item => item.id === id);
    if (!data) return;

    output.textContent = '';
    if (cursor) {
        cursor.style.opacity = '1';
    }

    let lineIndex = 0;
    let charIndex = 0;
    let active = true;

    const schedule = (fn, delay) => {
        const timer = setTimeout(fn, delay);
        const timers = terminalTimers.get(id) || [];
        timers.push(timer);
        terminalTimers.set(id, timers);
    };

    function typeNextChar() {
        if (!active) return;

        const line = data.lines[lineIndex];
        if (!line) {
            if (cursor) cursor.style.opacity = '0';
            return;
        }

        if (charIndex < line.length) {
            output.textContent += line.charAt(charIndex);
            charIndex += 1;
            schedule(typeNextChar, data.delay);
            return;
        }

        charIndex = 0;
        lineIndex += 1;

        if (lineIndex < data.lines.length) {
            output.textContent += '\n';
            schedule(typeNextChar, 180);
            return;
        }

        if (cursor) cursor.style.opacity = '0';
        active = false;
    }

    schedule(typeNextChar, 150);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.terminal-replay').forEach((button) => {
        button.addEventListener('click', () => {
            const id = Number(button.dataset.replay);
            restartTerminal(id);
        });
    });

    document.querySelectorAll('.terminal-window').forEach((terminal) => {
        const id = Number(terminal.dataset.terminal);
        restartTerminal(id);
    });
});
