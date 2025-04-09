 // --- Enhanced Loading Animation ---
 window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
   const loadBar = document.getElementById('loadBar');
   let progress = 0;
   const interval = setInterval(() => {
       progress += Math.random() * 10;
       progress = Math.min(progress, 100);
       loadBar.style.width = progress + '%';
       if (progress >= 100) {
           clearInterval(interval);
           setTimeout(() => { loader.classList.add('hidden'); }, 200);
       }
   }, 80);
});

// Theme Toggle with Logo Support
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const applyTheme = (theme) => {
    htmlElement.dataset.theme = theme;
    // Update toggle icon
    themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', theme);
    
    // No need for manual logo switching - handled by CSS
};

// Initialize theme
const currentTheme = localStorage.getItem('theme') || 'dark';
applyTheme(currentTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const newTheme = htmlElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});


// --- Navbar Scroll Effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
   navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// --- UPDATED Mobile Menu Toggle ---
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.nav-links.mobile-menu'); // Target the specific mobile menu

if (menuToggle && mobileMenu) {
   menuToggle.addEventListener('click', () => {
       const isOpen = mobileMenu.classList.toggle('open'); // Toggle the 'open' class
       menuToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';

       // Prevent body scroll when menu is open
       document.body.style.overflow = isOpen ? 'hidden' : '';
   });

   // Close menu if a link inside it is clicked
   mobileMenu.querySelectorAll('a').forEach(link => {
       link.addEventListener('click', () => {
           if (mobileMenu.classList.contains('open')) {
               mobileMenu.classList.remove('open');
               menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
               document.body.style.overflow = ''; // Restore scroll
           }
       });
   });
}


// --- 3D Card Effect (Refined) ---
document.querySelectorAll('.service-card').forEach(card => {
   const intensity = 8;
    card.addEventListener('mousemove', (e) => {
       const rect = card.getBoundingClientRect();
       const xVal = e.clientX - rect.left - rect.width / 2;
       const yVal = e.clientY - rect.top - rect.height / 2;
       const yRotation = intensity * (xVal / rect.width);
       const xRotation = -intensity * (yVal / rect.height);
       // Apply perspective to the parent if needed, or directly if structure allows
       // card.parentElement.style.perspective = '1000px';
        card.style.perspective = '1000px'; // Apply perspective to the card itself
       card.style.transform = `rotateY(${yRotation}deg) rotateX(${xRotation}deg) scale(1.03)`;
       card.style.transition = 'transform 0.05s linear';
   });
   card.addEventListener('mouseleave', () => {
       card.style.transform = 'rotateY(0) rotateX(0) scale(1)';
       card.style.transition = 'transform 0.4s ease-out';
   });
});

// --- Intersection Observer for Animations ---
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };
const observerCallback = (entries, observer) => {
   entries.forEach(entry => {
       if (entry.isIntersecting) {
           entry.target.classList.add('is-visible');
            // Optional: Uncomment to animate only once
            // observer.unobserve(entry.target);
       } else {
           // Optional: Uncomment to reverse animation when scrolling up
           // entry.target.classList.remove('is-visible');
       }
   });
};
const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
document.querySelectorAll('.anim-target').forEach(el => {
    el.classList.add('fade-in-up'); // Add the base animation class
    scrollObserver.observe(el);
});

// --- Update Footer Year ---
const currentYearSpan = document.getElementById('currentYear');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}


// --- Simple Form Submission Handler ---
const contactForm = document.getElementById('contactForm');
if(contactForm){
   contactForm.addEventListener('submit', function(e) {
       e.preventDefault(); // Prevent actual form submission
       console.log('Form submitted (simulation)');
       // Add a small delay before showing alert and resetting for better UX
       setTimeout(() => {
           alert('Inquiry transmitted. Our team will connect shortly.');
           contactForm.reset();
       }, 300);
   });
}


