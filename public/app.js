document.getElementById('toggleQuote').addEventListener('click', function() {
    // No JS needed: quote is rendered as static HTML.
});

// --- Feedback Webapp Logic ---
const feedbackForm = document.getElementById('feedbackForm');
const feedbackList = document.getElementById('feedbackList');

// LocalStorage key
const FEEDBACK_KEY = 'tra_feedback_list_v1';
const FEEDBACK_UPVOTES_KEY = 'tra_feedback_upvotes_v1';

function getFeedback() {
    return JSON.parse(localStorage.getItem(FEEDBACK_KEY) || '[]');
}
function saveFeedback(list) {
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(list));
}
function getUpvotes() {
    return JSON.parse(localStorage.getItem(FEEDBACK_UPVOTES_KEY) || '{}');
}
function saveUpvotes(obj) {
    localStorage.setItem(FEEDBACK_UPVOTES_KEY, JSON.stringify(obj));
}
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function renderFeedback() {
    const feedbacks = getFeedback();
    const upvotes = getUpvotes();
    feedbackList.innerHTML = '';
    if (feedbacks.length === 0) {
        feedbackList.innerHTML = '<p style="color:#6b7a99;">No feedback yet. Be the first to add one!</p>';
        return;
    }
    feedbacks.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    feedbacks.forEach((fb) => {
        const item = document.createElement('div');
        item.className = 'feedback-item';
        const isUpvoted = !!upvotes[fb.id];
        item.innerHTML = `
            <div class="feedback-upvote">
                <button aria-label="Upvote" class="${isUpvoted ? 'upvoted' : ''}" data-id="${fb.id}">▲</button>
                <span>${fb.upvotes || 0}</span>
            </div>
            <div class="feedback-content">
                <div class="feedback-title">${escapeHTML(fb.title)}</div>
                <div class="feedback-meta">${fb.name ? escapeHTML(fb.name) : 'Anonymous'}${fb.email ? ' · ' + escapeHTML(fb.email) : ''}</div>
                <div class="feedback-description">${escapeHTML(fb.description)}</div>
                <div class="feedback-comments">
                    <div class="feedback-comments-title">Comments (${fb.comments.length})</div>
                    <div class="feedback-comments-list">
                        ${fb.comments.map(c => `<div class="feedback-comment">${escapeHTML(c)}</div>`).join('')}
                    </div>
                    <form class="feedback-add-comment" data-id="${fb.id}">
                        <input type="text" placeholder="Add a comment..." maxlength="200" required />
                        <button type="submit">Comment</button>
                    </form>
                </div>
            </div>
        `;
        feedbackList.appendChild(item);
    });
    // Upvote logic
    feedbackList.querySelectorAll('.feedback-upvote button').forEach(btn => {
        btn.onclick = function() {
            const id = btn.getAttribute('data-id');
            let feedbacks = getFeedback();
            let upvotes = getUpvotes();
            const idx = feedbacks.findIndex(fb => fb.id === id);
            if (idx === -1) return;
            if (!upvotes[id]) {
                feedbacks[idx].upvotes = (feedbacks[idx].upvotes || 0) + 1;
                upvotes[id] = true;
            } else {
                feedbacks[idx].upvotes = (feedbacks[idx].upvotes || 1) - 1;
                upvotes[id] = false;
            }
            saveFeedback(feedbacks);
            saveUpvotes(upvotes);
            renderFeedback();
        };
    });
    // Comment logic
    feedbackList.querySelectorAll('.feedback-add-comment').forEach(form => {
        form.onsubmit = function(e) {
            e.preventDefault();
            const id = form.getAttribute('data-id');
            const input = form.querySelector('input');
            const val = input.value.trim();
            if (val) {
                let feedbacks = getFeedback();
                const idx = feedbacks.findIndex(fb => fb.id === id);
                if (idx !== -1) {
                    feedbacks[idx].comments.push(val);
                    saveFeedback(feedbacks);
                    // Only update comments for this feedback item
                    renderFeedback();
                }
            }
        };
    });
}

feedbackForm.onsubmit = function(e) {
    e.preventDefault();
    const title = document.getElementById('feedbackTitle').value.trim();
    const description = document.getElementById('feedbackDescription').value.trim();
    const name = document.getElementById('feedbackName').value.trim();
    const email = document.getElementById('feedbackEmail').value.trim();
    if (!title || !description) return;
    const feedbacks = getFeedback();
    const id = generateId();
    feedbacks.push({
        id,
        title,
        description,
        name,
        email,
        upvotes: 1,
        comments: []
    });
    saveFeedback(feedbacks);
    // Mark as upvoted for this user
    let upvotes = getUpvotes();
    upvotes[id] = true;
    saveUpvotes(upvotes);
    feedbackForm.reset();
    renderFeedback();
};

// --- Timeline Webapp Logic ---
const TIMELINE_KEY = 'tra_timeline_v1';
const timelineList = document.getElementById('timelineList');

const defaultTimeline = [
    {
        title: 'Auth & Registration',
        desc: 'User flow, contract PDF system',
        status: 'notstarted'
    },
    {
        title: 'FTP + Dashboards',
        desc: 'Folder setup + React UI',
        status: 'notstarted'
    },
    {
        title: 'Admin Panel & CSV',
        desc: 'Admin access, CSV generation, email logic',
        status: 'notstarted'
    },
    {
        title: 'UI & Static Pages',
        desc: 'Remaining UI, public pages',
        status: 'notstarted'
    },
    {
        title: 'Testing & Deployment',
        desc: 'QA, launch',
        status: 'notstarted'
    },
    {
        title: 'Maintenance & Support',
        desc: 'Ongoing support and updates',
        status: 'notstarted'
    }
];

function getTimeline() {
    return JSON.parse(localStorage.getItem(TIMELINE_KEY) || 'null') || defaultTimeline;
}
function saveTimeline(list) {
    localStorage.setItem(TIMELINE_KEY, JSON.stringify(list));
}

function renderTimeline() {
    const timeline = getTimeline();
    timelineList.innerHTML = '';
    timeline.forEach((item, idx) => {
        const el = document.createElement('div');
        el.className = 'timeline-item';
        el.innerHTML = `
            <div class="timeline-dot status-${item.status}"></div>
            ${idx < timeline.length - 1 ? '<div class="timeline-connector"></div>' : ''}
            <div class="timeline-content">
                <div class="timeline-title">${escapeHTML(item.title)}</div>
                <div class="timeline-desc">${escapeHTML(item.desc)}</div>
                <span class="timeline-status status-${item.status}">${statusLabel(item.status)}</span>
                <select class="timeline-status-select" data-idx="${idx}">
                    <option value="notstarted" ${item.status==='notstarted'?'selected':''}>Not Started</option>
                    <option value="confirmed" ${item.status==='confirmed'?'selected':''}>Confirmed</option>
                    <option value="inprogress" ${item.status==='inprogress'?'selected':''}>In Progress</option>
                    <option value="completed" ${item.status==='completed'?'selected':''}>Completed</option>
                </select>
            </div>
        `;
        timelineList.appendChild(el);
    });
    // Status change logic
    timelineList.querySelectorAll('.timeline-status-select').forEach(sel => {
        sel.onchange = function() {
            const idx = +sel.getAttribute('data-idx');
            let timeline = getTimeline();
            timeline[idx].status = sel.value;
            saveTimeline(timeline);
            renderTimeline();
        };
    });
}
function statusLabel(status) {
    switch(status) {
        case 'notstarted': return 'Not Started';
        case 'confirmed': return 'Confirmed';
        case 'inprogress': return 'In Progress';
        case 'completed': return 'Completed';
        default: return status;
    }
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'}[tag]));
}

// Initial render
renderFeedback();
renderTimeline();