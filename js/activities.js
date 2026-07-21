const activities = [
  {
    date: '2026',
    dateSort: '2026-01',
    badge: 'Hackathon · VAIC 2026',
    title: 'PinkAIPup — LawVerse',
    role: 'Team Leader',
    thumbnail: 'img/activities/vaic2026-team-cafe-thumb.jpg',
    description: `
      <p>
        Led a 6-person cross-university team at the Vietnam AI Innovation Challenge 2026
        (VAIC 2026), building <strong>LawVerse</strong> — a legal risk management and
        knowledge graph platform for SHB Bank compliance.
      </p>
      <p>
        See the full technical build in the
        <a href="index.html#projects">Projects</a> section.
      </p>
    `,
    team: [
      { name: 'Vũ Thành Lộc', role: 'Leader · AI Engineer Student @ VinUniversity' },
      { name: 'Đoàn Viết Thắng', role: 'Champion, VTV AI Thực Chiến 2025 · AI Resident' },
      { name: 'Nguyễn Thị Vang', role: 'HUST' },
      { name: 'Phạm Duy Thái', role: 'Swinburne Vietnam' },
      { name: 'Phạm Mai Hạnh', role: 'Swinburne Vietnam' },
      { name: 'Nguyễn Đức Mạnh', role: 'AWS Student Club, University of Transport Technology' },
    ],
    images: [
      'img/activities/vaic2026-photocard.jpg',
      'img/activities/vaic2026-team-cafe.jpg',
      'img/activities/vaic2026-venue.jpg',
    ],
  },
];

const grid = document.getElementById('activity-grid');
const modal = document.getElementById('activity-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

function renderThumb(activity) {
  return activity.thumbnail
    ? `<img src="${activity.thumbnail}" alt="" loading="lazy" />`
    : `<span>No photo yet</span>`;
}

function renderGallery(activity) {
  if (!activity.images.length) {
    return `<p class="modal-gallery-placeholder">Photos coming soon.</p>`;
  }
  return `
    <div class="modal-gallery">
      ${activity.images.map((src) => `<img src="${src}" alt="" loading="lazy" />`).join('')}
    </div>
  `;
}

function renderTeam(activity) {
  return `
    <ul class="team-list">
      ${activity.team
        .map(
          (member) => `
        <li>
          <span class="team-name">${member.name}</span>
          <span class="team-role">${member.role}</span>
        </li>
      `
        )
        .join('')}
    </ul>
  `;
}

function openModal(activity) {
  modalBody.innerHTML = `
    <div class="project-meta">
      <span class="project-date">${activity.date}</span>
      <span class="project-badge">${activity.badge}</span>
    </div>
    <h3 id="modal-title">${activity.title}</h3>
    <p class="activity-role">${activity.role}</p>
    ${activity.description}
    ${renderTeam(activity)}
    ${renderGallery(activity)}
  `;
  modal.hidden = false;
  document.body.classList.add('modal-open');
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
}

activities
  .slice()
  .sort((a, b) => (a.dateSort < b.dateSort ? 1 : -1))
  .forEach((activity) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'activity-thumb-card';
    card.innerHTML = `
      <span class="activity-thumb">${renderThumb(activity)}</span>
      <span class="activity-thumb-info">
        <span class="activity-thumb-date">${activity.date}</span>
        <h3>${activity.title}</h3>
      </span>
    `;
    card.addEventListener('click', () => openModal(activity));
    grid.appendChild(card);
  });

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hidden) closeModal();
});
