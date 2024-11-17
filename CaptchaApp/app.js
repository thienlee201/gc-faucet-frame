// Mock data for initial casts
const mockCasts = [
    {
        id: 1,
        content: "Just deployed my first smart contract! 🚀",
        author: {
            displayName: "Vitalik Buterin",
            username: "vitalik",
            avatar: "https://i.pravatar.cc/150?img=1"
        },
        timestamp: new Date(),
        likes: 1337,
        recasts: 420,
        replies: 69
    },
    {
        id: 2,
        content: "Web3 is the future of social media",
        author: {
            displayName: "Dan Romero",
            username: "dan",
            avatar: "https://i.pravatar.cc/150?img=2"
        },
        timestamp: new Date(Date.now() - 3600000),
        likes: 888,
        recasts: 123,
        replies: 45
    }
];

// DOM Elements
const castForm = document.getElementById('castForm');
const textarea = castForm.querySelector('textarea');
const charCount = document.querySelector('.char-count');
const castFeed = document.getElementById('castFeed');

// Update character count
textarea.addEventListener('input', () => {
    const remaining = textarea.value.length;
    charCount.textContent = `${remaining}/320`;
});

// Handle new cast submission
castForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = textarea.value.trim();
    
    if (content) {
        const newCast = {
            id: Date.now(),
            content,
            author: {
                displayName: "Anonymous User",
                username: "anonymous",
                avatar: "https://i.pravatar.cc/150?img=3"
            },
            timestamp: new Date(),
            likes: 0,
            recasts: 0,
            replies: 0
        };
        
        addCastToFeed(newCast);
        textarea.value = '';
        charCount.textContent = '0/320';
    }
});

// Format timestamp
function formatTimestamp(date) {
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff/60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff/3600000)}h`;
    return `${Math.floor(diff/86400000)}d`;
}

// Create cast element
function createCastElement(cast) {
    const castElement = document.createElement('div');
    castElement.className = 'cast';
    
    castElement.innerHTML = `
        <div class="cast-header">
            <img src="${cast.author.avatar}" alt="" class="avatar">
            <div class="user-info">
                <span class="display-name">${cast.author.displayName}</span>
                <span class="username">@${cast.author.username}</span>
                <span class="timestamp">${formatTimestamp(cast.timestamp)}</span>
            </div>
        </div>
        <div class="cast-content">${cast.content}</div>
        <div class="cast-actions">
            <button class="action-button" onclick="handleLike(${cast.id})">
                ❤️ <span>${cast.likes}</span>
            </button>
            <button class="action-button" onclick="handleRecast(${cast.id})">
                🔄 <span>${cast.recasts}</span>
            </button>
            <button class="action-button" onclick="handleReply(${cast.id})">
                💬 <span>${cast.replies}</span>
            </button>
        </div>
    `;
    
    return castElement;
}

// Add cast to feed
function addCastToFeed(cast) {
    const castElement = createCastElement(cast);
    castFeed.insertBefore(castElement, castFeed.firstChild);
}

// Action handlers
function handleLike(id) {
    const likeButton = event.currentTarget;
    const countSpan = likeButton.querySelector('span');
    let count = parseInt(countSpan.textContent);
    countSpan.textContent = count + 1;
}

function handleRecast(id) {
    const recastButton = event.currentTarget;
    const countSpan = recastButton.querySelector('span');
    let count = parseInt(countSpan.textContent);
    countSpan.textContent = count + 1;
}

function handleReply(id) {
    textarea.focus();
}

// Initialize feed with mock data
mockCasts.forEach(cast => addCastToFeed(cast));