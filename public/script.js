const navToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

function closeNav() {
  if (!navToggle || !primaryNav) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation');
  primaryNav.classList.remove('is-open');
}

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  primaryNav?.classList.toggle('is-open', !isOpen);
});

primaryNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeNav);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeNav();
});

const filterButtons = [...document.querySelectorAll('.menu-tab')];
const menuItems = [...document.querySelectorAll('.menu-item')];

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedCategory = button.dataset.filter;
    filterButtons.forEach((candidate) => {
      const selected = candidate === button;
      candidate.classList.toggle('is-active', selected);
      candidate.setAttribute('aria-pressed', String(selected));
    });
    menuItems.forEach((item) => {
      item.hidden = selectedCategory !== 'all' && item.dataset.category !== selectedCategory;
    });
  });
});


const cakeForm = document.querySelector('#cake-form');
const cakeDate = document.querySelector('#cake-date');

if (cakeDate) {
  const today = new Date();
  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  ).toISOString().slice(0, 10);

  cakeDate.min = localDate;
}
const bakeryWhatsAppNumber = '254743694672';

cakeForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(cakeForm);
  const getValue = (field) => String(formData.get(field) ?? '').trim();
  const budget = getValue('budget');
  const message = [
    'Hi Divas Bakers! I would like to enquire about a custom cake.',
    '',
    `Name: ${getValue('name')}`,
    `My WhatsApp number: ${getValue('contact')}`,
    `Occasion: ${getValue('occasion') || 'Not specified'}`,
    `Event date: ${getValue('date')}`,
    `Approximate servings: ${getValue('servings')}`,
    `Flavour, colours, or design: ${getValue('style') || 'Not specified'}`,
    `Budget: ${budget ? `KSh ${budget}` : 'Not specified'}`,
    `Notes: ${getValue('notes') || 'None'}`,
    '',
    'I understand this is an inquiry, not a confirmed order. Please let me know availability and the next steps.',
  ].join('\n');

  const whatsappUrl = `https://wa.me/${bakeryWhatsAppNumber}?text=${encodeURIComponent(message)}`;
  window.location.assign(whatsappUrl);
});
