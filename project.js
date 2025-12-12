// project.js — Material-You tabs (Chrome-like) + tab memory + animations

// THEME HANDLING (persisted)
const themeToggleP = document.getElementById('themeToggleP');
const html = document.documentElement;
const body = document.body;

// default to dark if no choice exists
if (!localStorage.getItem('theme')) {
  localStorage.setItem('theme', 'dark');
}
if (localStorage.getItem('theme') === 'dark') html.classList.add('dark');

// toggle (kept for your UI)
if (themeToggleP) {
  themeToggleP.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  });
}

// ELEMENTS
const constructionTab = document.getElementById('constructionTab');
const designTab = document.getElementById('designTab');
const constructionProjects = document.getElementById('constructionProjects');
const designProjects = document.getElementById('designProjects');
const tabIndicator = document.getElementById('tabIndicator');

const tabs = [constructionTab, designTab];

// Helper: position indicator under active tab
function moveIndicatorTo(activeBtn) {
  if (!activeBtn || !tabIndicator) return;
  const rect = activeBtn.getBoundingClientRect();
  const parentRect = activeBtn.parentElement.getBoundingClientRect();
  const left = rect.left - parentRect.left;
  // Set width and left
  tabIndicator.style.width = rect.width + 'px';
  tabIndicator.style.left = left + 'px';
  tabIndicator.classList.remove('hidden');
}

// Initialize indicator (after small delay to allow layout)
setTimeout(() => {
  const active = document.querySelector('.tab-btn.active');
  moveIndicatorTo(active);
}, 50);

// Animate content swap (fade+slide)
function showPanel(panelToShow) {
  const panels = [constructionProjects, designProjects];
  panels.forEach(panel => {
    if (panel === panelToShow) {
      // show
      panel.classList.remove('hidden');
      // small delay to allow browser to render before removing hidden-slide
      setTimeout(() => panel.classList.remove('hidden-slide'), 20);
      panel.setAttribute('aria-hidden', 'false');
    } else {
      // hide with slide
      panel.classList.add('hidden-slide');
      setTimeout(() => {
        panel.classList.add('hidden');
        panel.setAttribute('aria-hidden', 'true');
      }, 260);
    }
  });
}

// Set active tab (update classes, indicator, and content)
function setActiveTab(name) {
  if (name === 'design') {
    designTab.classList.add('active');
    designTab.setAttribute('aria-selected', 'true');
    constructionTab.classList.remove('active');
    constructionTab.setAttribute('aria-selected', 'false');
    moveIndicatorTo(designTab);
    showPanel(designProjects);
  } else {
    constructionTab.classList.add('active');
    constructionTab.setAttribute('aria-selected', 'true');
    designTab.classList.remove('active');
    designTab.setAttribute('aria-selected', 'false');
    moveIndicatorTo(constructionTab);
    showPanel(constructionProjects);
  }
}

// Restore saved tab (default = construction)
const saved = localStorage.getItem('activeProjectTab') || 'construction';
setActiveTab(saved);

// Click handlers
constructionTab.addEventListener('click', () => {
  setActiveTab('construction');
  localStorage.setItem('activeProjectTab', 'construction');
});

designTab.addEventListener('click', () => {
  setActiveTab('design');
  localStorage.setItem('activeProjectTab', 'design');
});

// Reposition indicator on window resize (debounced)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const active = document.querySelector('.tab-btn.active');
    moveIndicatorTo(active);
  }, 120);
});

// Scroll to top button
(function() {
  const toTop = document.createElement('button');
  toTop.id = 'toTop';
  toTop.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>';
  document.body.appendChild(toTop);

  function checkScroll() {
    if (window.scrollY > 300) {
      toTop.classList.add('show');
      toTop.classList.add('opacity-100');
    } else {
      toTop.classList.remove('show');
      toTop.classList.remove('opacity-100');
    }
  }

  window.addEventListener('scroll', checkScroll);
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
