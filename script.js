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


