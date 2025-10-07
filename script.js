// Comment System
document.addEventListener('DOMContentLoaded', function() {
    // Initialize comment system
    initializeCommentSystem();
    
    // Load saved comments
    loadSavedComments();
});

function initializeCommentSystem() {
    const submitButtons = document.querySelectorAll('.submit-comment');
    
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            const input = document.querySelector(`.comment-input[data-section="${section}"]`);
            const commentText = input.value.trim();
            
            if (commentText === '') {
                alert('Please enter a comment before submitting.');
                return;
            }
            
            addComment(section, commentText);
            input.value = '';
        });
    });
    
    // Allow Enter + Ctrl to submit
    document.querySelectorAll('.comment-input').forEach(input => {
        input.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                const section = this.getAttribute('data-section');
                const button = document.querySelector(`.submit-comment[data-section="${section}"]`);
                button.click();
            }
        });
    });
}

function addComment(section, text) {
    const commentsContainer = document.getElementById(`comments-section${section}`);
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    
    const now = new Date();
    const timeString = 'Just now';
    
    // Get a random username for demonstration
    const usernames = [
        'Anonymous User', 
        'Wiki Contributor', 
        'Media Enthusiast',
        'John Doe',
        'Jane Smith',
        'Alex Wilson',
        'Sam Taylor'
    ];
    const username = usernames[Math.floor(Math.random() * usernames.length)];
    
    commentElement.innerHTML = `
        <div class="comment-header">
            <strong>${username}</strong>
            <span class="comment-date">${timeString}</span>
        </div>
        <p>${escapeHtml(text)}</p>
    `;
    
    // Add with animation
    commentElement.style.opacity = '0';
    commentElement.style.transform = 'translateY(-10px)';
    commentsContainer.appendChild(commentElement);
    
    // Trigger animation
    setTimeout(() => {
        commentElement.style.transition = 'opacity 0.3s, transform 0.3s';
        commentElement.style.opacity = '1';
        commentElement.style.transform = 'translateY(0)';
    }, 10);
    
    // Show success feedback
    showNotification('Comment posted successfully!');
    
    // Save to localStorage
    saveComment(section, {
        username: username,
        text: text,
        timestamp: now.toISOString()
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #36c;
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-size: 0.95rem;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function saveComment(section, comment) {
    const key = `comments_section${section}`;
    let comments = JSON.parse(localStorage.getItem(key) || '[]');
    comments.push(comment);
    localStorage.setItem(key, JSON.stringify(comments));
}

function loadSavedComments() {
    for (let i = 1; i <= 8; i++) {
        const key = `comments_section${i}`;
        const comments = JSON.parse(localStorage.getItem(key) || '[]');
        
        comments.forEach(comment => {
            const commentsContainer = document.getElementById(`comments-section${i}`);
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            
            const date = new Date(comment.timestamp);
            const timeAgo = getTimeAgo(date);
            
            commentElement.innerHTML = `
                <div class="comment-header">
                    <strong>${escapeHtml(comment.username)}</strong>
                    <span class="comment-date">${timeAgo}</span>
                </div>
                <p>${escapeHtml(comment.text)}</p>
            `;
            
            commentsContainer.appendChild(commentElement);
        });
    }
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' minutes ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
    return Math.floor(seconds / 86400) + ' days ago';
}

// Video player enhancements
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('play', function() {
        // Pause other videos when one starts playing
        document.querySelectorAll('video').forEach(v => {
            if (v !== video) {
                v.pause();
            }
        });
    });
});

console.log('Media Encyclopedia initialized successfully! 📚');
console.log('Tip: Press Ctrl+Enter in any comment box to submit quickly.');
