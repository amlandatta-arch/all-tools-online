// Common utilities and components

// Generate URL-friendly slug from tool name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Get base path based on current location
function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/tools/')) {
    return '../../';
  }
  return '';
}

// Load header
function loadHeader() {
  const basePath = getBasePath();
  const headerHTML = `
    <header class="sticky top-0 backdrop-blur bg-white/60 border-b border-gray-200 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-4 h-16">
          <!-- Logo -->
          <div class="flex items-center w-48">
            <a href="${basePath}index.html" class="flex items-center gap-2" aria-label="AllToolsOnline home">
              <div class="rounded-md bg-gradient-to-br from-indigo-500 to-purple-500 w-10 h-10 flex items-center justify-center text-white font-bold">AT</div>
              <div class="text-lg font-semibold">AllToolsOnline</div>
            </a>
          </div>

          <!-- Center search -->
          <div class="flex-1">
            <form id="header-search" class="relative" role="search" aria-label="Search tools form">
              <input id="search-input" type="search" placeholder="Search tools..." aria-label="Search tools" class="w-full rounded-full border border-gray-200 bg-white px-4 py-3 pr-32 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              <button id="search-btn" type="submit" class="absolute right-1.5 top-1.5 bg-indigo-600 text-white rounded-full px-4 py-2 text-sm shadow hover:brightness-105">Search</button>
            </form>
          </div>

          <!-- Nav -->
          <nav class="hidden md:flex items-center gap-6" aria-label="Main navigation">
            <a href="${basePath}index.html" class="text-sm font-medium hover:text-indigo-600">Home</a>
            <a href="${basePath}categories.html" class="text-sm font-medium hover:text-indigo-600">Categories</a>
            <a href="${basePath}about.html" class="text-sm font-medium hover:text-indigo-600">About</a>
            <a href="${basePath}contact.html" class="text-sm font-medium hover:text-indigo-600">Contact</a>
          </nav>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button id="mobile-toggle" class="p-2 rounded-md border border-gray-200" aria-expanded="false" aria-controls="mobile-nav">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile nav -->
      <div id="mobile-nav" class="md:hidden hidden border-t border-gray-100 bg-white" role="menu" aria-hidden="true">
        <div class="px-4 py-3 flex flex-col gap-2">
          <a href="${basePath}index.html" class="py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 px-2 rounded">Home</a>
          <a href="${basePath}categories.html" class="py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 px-2 rounded">Categories</a>
          <a href="${basePath}about.html" class="py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 px-2 rounded">About</a>
          <a href="${basePath}contact.html" class="py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 px-2 rounded">Contact</a>
        </div>
      </div>
    </header>
  `;
  
  const placeholder = document.getElementById('header-placeholder');
  if (placeholder) {
    placeholder.innerHTML = headerHTML;
    initHeaderEvents();
  }
}

// Load footer
function loadFooter() {
  const basePath = getBasePath();
  const currentYear = new Date().getFullYear();
  const footerHTML = `
    <footer class="border-t border-gray-200 mt-12 py-8 bg-white/50" role="contentinfo">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="text-sm text-gray-600">© ${currentYear} AllToolsOnline. All rights reserved.</div>
        <div class="flex items-center gap-4">
          <a href="${basePath}privacy.html" class="text-sm hover:underline">Privacy Policy</a>
          <a href="${basePath}terms.html" class="text-sm hover:underline">Terms</a>
          <a href="${basePath}contact.html" class="text-sm hover:underline">Contact</a>
        </div>
        <div class="text-sm text-gray-600">Built with ❤️ by AllToolsOnline</div>
      </div>
    </footer>
  `;
  
  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) {
    placeholder.innerHTML = footerHTML;
  }
}

// Initialize header events
function initHeaderEvents() {
  // Force light theme only
  document.body.setAttribute('data-theme', 'light');
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.removeItem('theme'); // Clear any saved theme preference
  
  // Mobile nav toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  
  mobileToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
  });
  
  // Header search
  const headerForm = document.getElementById('header-search');
  const searchInput = document.getElementById('search-input');
  
  headerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    
    // If on home page, trigger search event
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
      window.dispatchEvent(new CustomEvent('headerSearch', { detail: { query } }));
    } else {
      // Redirect to home with search query
      const basePath = getBasePath();
      window.location.href = `${basePath}index.html?q=${encodeURIComponent(query)}`;
    }
  });
  
  // Keyboard shortcut: "/" focuses search
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      searchInput.focus();
    }
  });
}

// Copy to clipboard utility
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return Promise.resolve();
  }
}

// Show toast notification
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Initialize FAQ toggles
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-question');
  faqItems.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      answer.classList.toggle('active');
      const icon = question.querySelector('.faq-icon');
      if (icon) {
        icon.textContent = answer.classList.contains('active') ? '−' : '+';
      }
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadHeader();
  loadFooter();
  initFAQ();
  
  // Handle search query from URL
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('q');
  if (searchQuery) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.value = searchQuery;
    }
  }
});
