// ===================================
// BYTON DOWNLOADER - VANILLA JAVASCRIPT
// ===================================

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initApp();
});

// ===================================
// APP INITIALIZATION
// ===================================
function initApp() {
    const splash = document.getElementById('welcome-splash');
    const app = document.getElementById('app');
    
    splash.classList.add('active');
    
    setTimeout(() => {
        splash.classList.remove('active');
        app.style.display = 'flex';
        incrementVisitorCount();
    }, 10000);

    initNavigation();
    loadTheme();
    loadProfile();
    initSearch();
}

// ===================================
// NAVIGATION
// ===================================
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item, .bottom-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.getAttribute('href').substring(1);
            navigateTo(page);
            const sidebar = document.getElementById('sidebar');
            if (sidebar && window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }
        });
    });

    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            if (sidebar && menuToggle && !sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        document.getElementById('home-page').classList.add('active');
    }
    document.querySelectorAll('.nav-item, .bottom-nav-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('href').substring(1) === page);
    });
    window.scrollTo(0, 0);
    lucide.createIcons();
}

// ===================================
// VISITOR COUNTER
// ===================================
function incrementVisitorCount() {
    let count = parseInt(localStorage.getItem('visitorCount') || '1254') + 1;
    localStorage.setItem('visitorCount', count);
    const el = document.getElementById('visitor-count');
    if (el) el.textContent = count;
}

// ===================================
// THEME SYSTEM
// ===================================
function loadTheme() {
    applyTheme(localStorage.getItem('theme') || 'light');
}

function applyTheme(theme) {
    document.body.className = '';
    if (theme !== 'light') {
        document.body.classList.add(`theme-${theme}`);
    }
}

// ===================================
// PROFILE SYSTEM
// ===================================
function loadProfile() {
    const nameInput = document.getElementById('profile-name');
    const emailInput = document.getElementById('profile-email');
    if (nameInput) nameInput.value = localStorage.getItem('profileName') || '';
    if (emailInput) emailInput.value = localStorage.getItem('profileEmail') || '';
}

function saveProfile() {
    localStorage.setItem('profileName', document.getElementById('profile-name').value);
    localStorage.setItem('profileEmail', document.getElementById('profile-email').value);
    showNotification('Profile saved successfully!');
}

// ===================================
// SEARCH
// ===================================
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', () => {});
    }
}

// ===================================
// TIKTOK DOWNLOADER
// ===================================
async function fetchTikTok() {
    const input = document.getElementById('tiktok-input');
    const resultBox = document.getElementById('tiktok-result');
    const url = input ? input.value.trim() : '';

    if (!url || !url.includes('tiktok.com')) {
        showNotification('Please paste a valid TikTok link.');
        return;
    }

    showNotification('Fetching TikTok video...');
    resultBox.style.display = 'none';
    resultBox.innerHTML = '';

    try {
        const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
        const res = await fetch(apiUrl);
        const data = await res.json();

        if (data.code !== 0 || !data.data) {
            showNotification('Failed to fetch video. Check the URL and try again.');
            return;
        }

        const v = data.data;
        const hdUrl = v.hdplay || v.play;
        const sdUrl = v.play;
        const audioUrl = v.music;
        const cover = v.cover;
        const title = v.title || 'TikTok Video';
        const author = v.author ? (v.author.nickname || v.author.unique_id) : '';

        resultBox.innerHTML = `
            <div style="display:flex; gap:1rem; align-items:flex-start; flex-wrap:wrap;">
                ${cover ? `<img src="${cover}" alt="thumbnail" style="width:120px; height:120px; object-fit:cover; border-radius:0.75rem; flex-shrink:0;">` : ''}
                <div style="flex:1; min-width:200px;">
                    <p style="font-weight:700; margin-bottom:0.25rem; font-size:0.95rem;">${title}</p>
                    ${author ? `<p style="color:#666; font-size:0.85rem; margin-bottom:1rem;">@${author}</p>` : ''}
                    <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                        ${hdUrl ? `<a href="${hdUrl}" target="_blank" style="background:#000; color:white; padding:0.5rem 1rem; border-radius:0.5rem; font-weight:700; text-decoration:none; font-size:0.875rem;">⬇ HD Video</a>` : ''}
                        ${sdUrl ? `<a href="${sdUrl}" target="_blank" style="background:#444; color:white; padding:0.5rem 1rem; border-radius:0.5rem; font-weight:700; text-decoration:none; font-size:0.875rem;">⬇ SD Video</a>` : ''}
                        ${audioUrl ? `<a href="${audioUrl}" target="_blank" style="background:#1DB954; color:white; padding:0.5rem 1rem; border-radius:0.5rem; font-weight:700; text-decoration:none; font-size:0.875rem;">⬇ Audio MP3</a>` : ''}
                    </div>
                </div>
            </div>`;
        resultBox.style.display = 'block';
        showNotification('TikTok video fetched!');
    } catch (err) {
        showNotification('Error fetching TikTok video. Please try again.');
        console.error(err);
    }
}

// ===================================
// FACEBOOK DOWNLOADER
// ===================================
async function fetchFacebook() {
    const input = document.getElementById('fb-input');
    const resultBox = document.getElementById('fb-result');
    const url = input ? input.value.trim() : '';

    if (!url || !url.includes('facebook.com')) {
        showNotification('Please paste a valid Facebook link.');
        return;
    }

    showNotification('Fetching Facebook video...');
    resultBox.style.display = 'none';
    resultBox.innerHTML = '';

    try {
        const apiUrl = `https://www.cliqq.net/api/fb?url=${encodeURIComponent(url)}`;
        const res = await fetch(apiUrl);
        const data = await res.json();

        if (!data.status || !data.data) {
            showNotification('Failed to fetch video. Make sure the video is public.');
            return;
        }

        const hdUrl = data.data.hd;
        const sdUrl = data.data.sd;
        const title = data.data.title || 'Facebook Video';

        resultBox.innerHTML = `
            <div>
                <p style="font-weight:700; margin-bottom:1rem; font-size:0.95rem;">${title}</p>
                <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                    ${hdUrl ? `<a href="${hdUrl}" target="_blank" style="background:#1877f2; color:white; padding:0.5rem 1rem; border-radius:0.5rem; font-weight:700; text-decoration:none; font-size:0.875rem;">⬇ HD Video</a>` : ''}
                    ${sdUrl ? `<a href="${sdUrl}" target="_blank" style="background:#4267b2; color:white; padding:0.5rem 1rem; border-radius:0.5rem; font-weight:700; text-decoration:none; font-size:0.875rem;">⬇ SD Video</a>` : ''}
                </div>
            </div>`;
        resultBox.style.display = 'block';
        showNotification('Facebook video fetched!');
    } catch (err) {
        showNotification('Error fetching Facebook video. Please try again.');
        console.error(err);
    }
}

// ===================================
// NOTIFICATIONS
// ===================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #06b6d4;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 1rem;
        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s;
        font-weight: 600;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        setTimeout(() => notification.parentNode && document.body.removeChild(notification), 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);
