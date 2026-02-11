/* ===============================================
   MODERN PERSONAL WEBSITE - JAVASCRIPT
   ICONHIMUSELFUUU Portfolio
   =============================================== */

// ==========================================
// DARK MODE TOGGLE
// ==========================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.toggle('dark-mode', currentTheme === 'dark');
updateThemeIcon(currentTheme === 'dark');

themeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    const theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateThemeIcon(isDarkMode);
});

function updateThemeIcon(isDarkMode) {
    const icon = themeToggle.querySelector('i');
    if (isDarkMode) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ==========================================
// MOBILE NAVIGATION
// ==========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==========================================
// ACTIVE NAVIGATION LINK
// ==========================================

window.addEventListener('scroll', () => {
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================

const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopButton.className = 'scroll-top-btn';
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #00bcd4, #4dd0e1);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
`;

document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.style.opacity = '1';
        scrollTopButton.style.visibility = 'visible';
    } else {
        scrollTopButton.style.opacity = '0';
        scrollTopButton.style.visibility = 'hidden';
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopButton.addEventListener('mouseover', () => {
    scrollTopButton.style.transform = 'translateY(-5px)';
});

scrollTopButton.addEventListener('mouseout', () => {
    scrollTopButton.style.transform = 'translateY(0)';
});

// ==========================================
// CONTACT FORM HANDLING
// ==========================================

const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !subject || !message) {
            showFormResponse('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormResponse('Please enter a valid email address.', 'error');
            return;
        }

        // Build email body
        const ownerEmail = 'kimutaikelvin800@gmail.com';
        const bodyLines = [];
        bodyLines.push(`Name: ${name}`);
        bodyLines.push(`Sender Email: ${email}`);
        bodyLines.push('');
        bodyLines.push(message);
        bodyLines.push('');
        bodyLines.push(`--\nSent from ICONHIMUSELFUUU website`);
        const body = bodyLines.join('\n');

        const subjectEncoded = encodeURIComponent(subject);
        const bodyEncoded = encodeURIComponent(body);

        // Decide which URL to open: Gmail compose (web) for desktop, mailto for mobile
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        try {
            if (isMobile) {
                // Use mailto: which will open the user's default mail app (Gmail app on many devices)
                const mailto = `mailto:${ownerEmail}?subject=${subjectEncoded}&body=${bodyEncoded}`;
                window.location.href = mailto;
            } else {
                // Open Gmail web compose in a new tab/window
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(ownerEmail)}&su=${subjectEncoded}&body=${bodyEncoded}`;
                window.open(gmailUrl, '_blank');
            }

            // Provide short feedback
            showFormResponse('Opening your email client to compose the message...', 'success');

            // Do not reset the form immediately — let user confirm/send in their email app
        } catch (err) {
            console.error('Failed to open email client:', err);
            showFormResponse('Unable to open your email client. Please copy your message and email directly to ' + ownerEmail, 'error');
        }
    });
}

function showFormResponse(message, type) {
    formResponse.textContent = message;
    formResponse.className = `form-response ${type}`;
    formResponse.style.display = 'block';

    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formResponse.style.display = 'none';
        }, 5000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==========================================
// SMOOTH SCROLL BEHAVIOR
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();

            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all card elements for animation
document.querySelectorAll('.portfolio-card, .service-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});



// ==========================================
// LAZY LOADING FOR IMAGES (IF ADDED)
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// PERFORMANCE: DEBOUNCE SCROLL
// ==========================================

let scrollTimeout;

window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Performance-heavy operations here
        updateActiveNavLink();
    }, 100);
}, { passive: true });

// ==========================================
// UTILITY: CONSOLE GREETING
// ==========================================

console.log('%c Welcome to ICONHIMUSELFUUU', 'font-size: 20px; font-weight: bold; color: #00bcd4;');
console.log('%c Innovating IT & Management Solutions', 'font-size: 14px; color: #1a3a52;');
console.log('%cLet\'s create something amazing together!', 'font-size: 12px; color: #666;');

// ==========================================
// DETECT USER PREFERENCES
// ==========================================

// Automatically set theme based on system preference if no saved preference
if (!localStorage.getItem('theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
        localStorage.setItem('theme', 'dark');
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme') || localStorage.getItem('theme') === 'auto') {
        document.body.classList.toggle('dark-mode', e.matches);
        updateThemeIcon(e.matches);
    }
});

// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Update active nav link on page load
    updateActiveNavLink();

    // Add loading complete indicator
    document.body.classList.add('loaded');
});
