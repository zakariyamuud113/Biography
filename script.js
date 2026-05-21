function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}


// Select all arrow icons with the class 'arrow'
const arrows = document.querySelectorAll('.arrow');

// Add an event listener to each arrow
arrows.forEach((arrow, index) => {
  arrow.onclick = function() {
    // Check if it's the last arrow
    if (index === arrows.length - 1) {
      // Scroll to the top if it's the last arrow
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll to the next section smoothly for other arrows
      let nextSection = this.closest('section').nextElementSibling;
      
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
});


function scrollToContact() {
  const contactSection = document.getElementById('contact');
  contactSection.scrollIntoView({ behavior: 'smooth' });
}

const carouselTrack = document.querySelector('.carousel-track');
const projectCards = document.querySelectorAll('.project-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotNav = document.querySelector('.carousel-nav-dots');

function createCarouselDots() {
  if (!dotNav || projectCards.length === 0) return;
  projectCards.forEach((card, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.type = 'button';
    dot.dataset.index = index;
    dot.addEventListener('click', () => scrollToCard(index));
    dotNav.appendChild(dot);
  });
}

function attachProjectCardListeners() {
  projectCards.forEach((card, index) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('.project-btn')) return;
      scrollToCard(index);
    });
    card.addEventListener('focus', () => setActiveCard(index));
  });
}

function setActiveCard(index) {
  projectCards.forEach((card, cardIndex) => {
    card.classList.toggle('active', cardIndex === index);
  });

  const dots = dotNav ? dotNav.querySelectorAll('.carousel-dot') : [];
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === index);
  });
}

function scrollToCard(index) {
  const card = projectCards[index];
  if (!card) return;
  setActiveCard(index);
  card.scrollIntoView({ behavior: 'smooth', inline: 'center' });
}

function updateActiveCard() {
  if (!carouselTrack) return;
  const trackRect = carouselTrack.getBoundingClientRect();
  const centerX = trackRect.left + trackRect.width / 2;
  let closestIndex = 0;
  let closestDistance = Infinity;

  projectCards.forEach((card, index) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const distance = Math.abs(centerX - cardCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  setActiveCard(closestIndex);
}

function scrollByCard(direction) {
  const activeIndex = Array.from(projectCards).findIndex((card) => card.classList.contains('active'));
  const nextIndex = Math.min(Math.max(activeIndex + direction, 0), projectCards.length - 1);
  scrollToCard(nextIndex);
}

if (carouselTrack) {
  carouselTrack.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateActiveCard);
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => scrollByCard(-1));
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => scrollByCard(1));
}

createCarouselDots();
attachProjectCardListeners();
updateActiveCard();


