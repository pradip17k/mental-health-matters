const themeToggle = document.querySelector('#theme-toggle');
function syncTheme() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
}
themeToggle.hidden = false;
syncTheme();
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch { /* Keep the session toggle usable. */ }
  syncTheme();
});
const responses = {
  Low: 'Thank you for checking in. You don’t have to carry everything alone. The support page is here if you want someone to talk to.',
  'A little off': 'You don’t need to explain or fix every feeling. There’s room to take today at your own pace.',
  Okay: 'Okay is a perfectly valid place to be. What’s one small thing you would like to make room for today?',
  Good: 'It’s nice to notice a good moment. Is there something about today you’d like to remember?',
  Great: 'Make a little space to enjoy this feeling. What has felt especially good today?'
};
document.querySelectorAll('[data-mood]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-mood]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const response = document.querySelector('#mood-response');
    response.hidden = false;
    response.textContent = responses[button.dataset.mood];
  });
});
const dialog = document.querySelector('#breathing-dialog');
if (dialog) {
  const start = document.querySelector('#start-breathing');
  const phase = document.querySelector('#breath-phase');
  const time = document.querySelector('#breath-time');
  const circle = document.querySelector('#breath-circle');
  let timer;
  let startedAt;
  function stop() {
    clearInterval(timer);
    timer = null;
    circle.classList.remove('breathing');
    start.textContent = 'Begin breathing';
  }
  document.querySelector('#open-breathing').addEventListener('click', () => {
    phase.textContent = 'Ready?';
    time.textContent = '60 seconds · no breath holds';
    dialog.showModal();
  });
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', stop);
  start.addEventListener('click', () => {
    if (timer) { stop(); phase.textContent = 'Paused.'; time.textContent = 'Take your time. Begin again whenever you like.'; return; }
    startedAt = Date.now();
    start.textContent = 'Stop for now';
    circle.classList.add('breathing');
    function tick() {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      if (elapsed >= 60) { stop(); phase.textContent = 'Well done.'; time.textContent = 'A minute, just for you.'; start.textContent = 'Breathe again'; return; }
      const nextPhase = elapsed % 10 < 4 ? 'Breathe in' : 'Breathe out';
      if (phase.textContent !== nextPhase) phase.textContent = nextPhase;
      time.textContent = `${60 - elapsed} seconds remaining`;
    }
    timer = setInterval(tick, 250);
    tick();
  });
}
