
// ===== DATA =====
const stories = [
  { name: 'Your Story', emoji: '🧑', isYou: true },
  { name: 'priya_k', emoji: '👩' },
  { name: 'rahul.ig', emoji: '🧔' },
  { name: 'anjali_99', emoji: '👩‍🦱' },
  { name: 'dev_ravi', emoji: '👨‍💻' },
  { name: 'sunita_m', emoji: '👩‍🎨' },
  { name: 'vikas123', emoji: '🧑‍🎤' },
  { name: 'neha.ig', emoji: '👩‍💼' },
];

const posts = [
  {
    id: 1, user: 'priya_k', location: 'Mumbai, India', emoji: '🌸',
    bg: 'linear-gradient(135deg,#f093fb,#f5576c)',
    likes: 1423, caption: 'Beautiful day in Mumbai! 🌸✨',
    comments: ['rahul.ig: So pretty! 😍', 'anjali_99: Love this! 💕'],
    time: '2 HOURS AGO', liked: false, saved: false,
  },
  {
    id: 2, user: 'dev_ravi', location: 'Bangalore, India', emoji: '💻',
    bg: 'linear-gradient(135deg,#4facfe,#00f2fe)',
    likes: 892, caption: 'Late night coding sessions hit different 💻🔥 #webdev #coding',
    comments: ['vikas123: Bro same! 😂', 'neha.ig: Night owl coder 🦉'],
    time: '4 HOURS AGO', liked: false, saved: false,
  },
  {
    id: 3, user: 'anjali_99', location: 'Goa, India', emoji: '🌊',
    bg: 'linear-gradient(135deg,#43e97b,#38f9d7)',
    likes: 3201, caption: 'Goa vibes forever 🌊🏖️ #goa #beach #india',
    comments: ['priya_k: I need to visit! 😭', 'rahul.ig: Goals! 🙌'],
    time: '6 HOURS AGO', liked: false, saved: false,
  },
  {
    id: 4, user: 'sunita_m', location: 'Delhi, India', emoji: '🎨',
    bg: 'linear-gradient(135deg,#fa709a,#fee140)',
    likes: 567, caption: 'New painting done! What do you think? 🎨🖌️ #art #artist',
    comments: ['neha.ig: This is amazing! 🎨', 'dev_ravi: Talented!'],
    time: '8 HOURS AGO', liked: false, saved: false,
  },
];

const suggestions = [
  { name: 'vikas_codes', sub: 'Followed by rahul.ig', emoji: '👨‍💻' },
  { name: 'travel_riya', sub: 'New to Instagram', emoji: '✈️' },
  { name: 'foodie_arun', sub: 'Suggested for you', emoji: '🍛' },
  { name: 'krishna.art', sub: 'Followed by priya_k', emoji: '🎭' },
  { name: 'tech_naina', sub: 'Suggested for you', emoji: '📱' },
];

// ===== RENDER STORIES =====
function renderStories() {
  const wrap = document.getElementById('storiesWrap');
  wrap.innerHTML = stories.map(s => `
    <div class="story" onclick="viewStory('${s.name}')">
      <div class="story-ring">
        <div class="story-img">${s.emoji}</div>
      </div>
      <span class="story-name">${s.isYou ? 'Your Story' : s.name}</span>
    </div>
  `).join('');
}

// ===== RENDER POSTS =====
function renderPosts() {
  const container = document.getElementById('postsContainer');
  container.innerHTML = posts.map(p => `
    <div class="post" id="post-${p.id}">
      <div class="post-header">
        <div class="post-user">
          <div class="post-avatar">
            <div class="post-avatar-inner">${p.emoji}</div>
          </div>
          <div>
            <div class="post-username">${p.user}</div>
            <div class="post-location">${p.location}</div>
          </div>
        </div>
        <div class="post-more" onclick="showToast('Options')">•••</div>
      </div>

      <div class="post-image" style="background:${p.bg}" ondblclick="likePost(${p.id}, this)">
        <div class="post-image-emoji">${p.emoji}</div>
        <div class="heart-anim" id="heartAnim-${p.id}">❤️</div>
      </div>

      <div class="post-actions">
        <button class="action-btn" onclick="likePost(${p.id})" id="likeBtn-${p.id}" title="Like">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text)" stroke-width="2" id="likeIcon-${p.id}">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
        <button class="action-btn" onclick="showToast('Comment')" title="Comment">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text)" stroke-width="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
        </button>
        <button class="action-btn" onclick="showToast('Share')" title="Share">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text)" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
        <button class="action-btn right" onclick="savePost(${p.id})" id="saveBtn-${p.id}" title="Save">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text)" stroke-width="2" id="saveIcon-${p.id}">
            <polygon points="19 21 12 16 5 21 5 3 19 3 19 21"/>
          </svg>
        </button>
      </div>

      <div class="post-likes" id="likes-${p.id}">${p.likes.toLocaleString()} likes</div>
      <div class="post-caption"><span>${p.user}</span>${p.caption}</div>
      <div class="post-comments-link" onclick="showComments(${p.id})">View all ${p.comments.length} comments</div>
      <div id="comments-${p.id}" style="display:none;padding:0 14px 6px;">
        ${p.comments.map(c => `<div style="font-size:13px;margin-bottom:4px;">${c}</div>`).join('')}
      </div>
      <div class="post-time">${p.time}</div>
      <div class="post-comment-box">
        <span style="font-size:20px;cursor:pointer" onclick="showToast('Emoji')">😊</span>
        <input type="text" placeholder="Add a comment…" id="commentInput-${p.id}"
          oninput="togglePostBtn(${p.id})"
          onkeydown="if(event.key==='Enter')addComment(${p.id})">
        <button id="commentBtn-${p.id}" onclick="addComment(${p.id})">Post</button>
      </div>
    </div>
  `).join('');
}

// ===== RENDER SIDEBAR SUGGESTIONS =====
function renderSuggestions() {
  const el = document.getElementById('suggestions');
  el.innerHTML = suggestions.map((s, i) => `
    <div class="suggest-user">
      <div class="suggest-avatar">
        <div class="suggest-avatar-inner">${s.emoji}</div>
      </div>
      <div class="suggest-info">
        <div class="suggest-name">${s.name}</div>
        <div class="suggest-sub">${s.sub}</div>
      </div>
      <button class="follow-btn" id="followBtn-${i}" onclick="toggleFollow(${i})">Follow</button>
    </div>
  `).join('');
}

// ===== LIKE POST =====
function likePost(id, imgEl) {
  const post = posts.find(p => p.id === id);
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;

  const icon = document.getElementById(`likeIcon-${id}`);
  const likesEl = document.getElementById(`likes-${id}`);

  if (post.liked) {
    icon.setAttribute('fill', '#ed4956');
    icon.setAttribute('stroke', '#ed4956');
    // Show heart anim
    const anim = document.getElementById(`heartAnim-${id}`);
    anim.classList.remove('pop');
    void anim.offsetWidth;
    anim.classList.add('pop');
  } else {
    icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke', 'var(--text)');
  }
  likesEl.textContent = `${post.likes.toLocaleString()} likes`;
}

// ===== SAVE POST =====
function savePost(id) {
  const post = posts.find(p => p.id === id);
  post.saved = !post.saved;
  const icon = document.getElementById(`saveIcon-${id}`);
  if (post.saved) {
    icon.setAttribute('fill', 'var(--text)');
    showToast('Post saved!');
  } else {
    icon.setAttribute('fill', 'none');
    showToast('Removed from saved');
  }
}

// ===== COMMENTS =====
function showComments(id) {
  const el = document.getElementById(`comments-${id}`);
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function togglePostBtn(id) {
  const input = document.getElementById(`commentInput-${id}`);
  const btn = document.getElementById(`commentBtn-${id}`);
  btn.classList.toggle('active', input.value.trim().length > 0);
}

function addComment(id) {
  const input = document.getElementById(`commentInput-${id}`);
  const text = input.value.trim();
  if (!text) return;

  const post = posts.find(p => p.id === id);
  post.comments.push(`durgesh_dev: ${text}`);

  const commentsEl = document.getElementById(`comments-${id}`);
  commentsEl.style.display = 'block';
  commentsEl.innerHTML = post.comments.map(c =>
    `<div style="font-size:13px;margin-bottom:4px;">${c}</div>`
  ).join('');

  document.querySelector(`#post-${id} .post-comments-link`).textContent =
    `View all ${post.comments.length} comments`;

  input.value = '';
  document.getElementById(`commentBtn-${id}`).classList.remove('active');
  showToast('Comment posted!');
}

// ===== FOLLOW =====
function toggleFollow(i) {
  const btn = document.getElementById(`followBtn-${i}`);
  const isFollowing = btn.textContent === 'Following';
  btn.textContent = isFollowing ? 'Follow' : 'Following';
  btn.classList.toggle('following', !isFollowing);
  showToast(isFollowing ? 'Unfollowed' : 'Following!');
}

// ===== VIEW STORY =====
function viewStory(name) {
  showToast(`Viewing ${name}'s story...`);
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

// ===== SEARCH =====
document.getElementById('searchInput').addEventListener('input', function() {
  const q = this.value.toLowerCase();
  document.querySelectorAll('.post').forEach(p => {
    const text = p.innerText.toLowerCase();
    p.style.display = (!q || text.includes(q)) ? 'block' : 'none';
  });
});

// ===== INIT =====
renderStories();
renderPosts();
renderSuggestions();