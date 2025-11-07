// Matrix background effect
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()_+-=[]{}|;:,.<>?";
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * -100;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff88';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = matrix.charAt(Math.floor(Math.random() * matrix.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typing animation
const typingText = document.querySelector('.typing-text');
const textContent = "Building tomorrow's solutions with intelligent automation";
let charIndex = 0;

function typeText() {
    if (charIndex < textContent.length) {
        typingText.textContent = textContent.slice(0, charIndex + 1);
        charIndex++;
        setTimeout(typeText, 50);
    }
}

// Start typing animation after a delay
setTimeout(typeText, 500);

// Counter animation
const statNumbers = document.querySelectorAll('.stat-number');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// Fade in animations
const fadeElements = document.querySelectorAll('.about-grid, .project-card, .contact-content');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// Terminal animation
const terminalLines = document.querySelectorAll('.terminal-line');

const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            terminalLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'translateX(0)';
                }, index * 150);
            });
            terminalObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const terminal = document.querySelector('.terminal');
if (terminal) {
    terminalLines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        line.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    terminalObserver.observe(terminal);
}

// Project cards animation
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simulate form submission
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;

    submitButton.innerHTML = '<span>Sending...</span>';
    submitButton.disabled = true;

    setTimeout(() => {
        submitButton.innerHTML = '<span>Message Sent!</span> <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4L18 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        submitButton.style.background = '#00ff88';

        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.style.background = '';
            submitButton.disabled = false;
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// Parallax effect for hero section
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const glitch = document.querySelector('.glitch');
    if (glitch) {
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        glitch.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// Add glow effect to cards on hover
const cards = document.querySelectorAll('.project-card, .tech-item, .tool-item, .contact-method');

cards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        this.style.transition = 'all 0.3s ease';
    });
});

// Random glitch effect on title
const glitchElement = document.querySelector('.glitch');
let glitchInterval;

function randomGlitch() {
    glitchElement.style.textShadow = `
        ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(0, 255, 136, 0.7),
        ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(0, 136, 255, 0.7)
    `;

    setTimeout(() => {
        glitchElement.style.textShadow = `
            0 0 10px rgba(0, 255, 136, 0.5),
            0 0 20px rgba(0, 255, 136, 0.5),
            0 0 40px rgba(0, 255, 136, 0.5)
        `;
    }, 50);
}

setInterval(randomGlitch, 3000);

// Cursor trail effect
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.cursor-circle');

if (circles.length === 0) {
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'cursor-circle';
        circle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: rgba(0, 255, 136, 0.3);
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(circle);
    }
}

const cursorCircles = document.querySelectorAll('.cursor-circle');

cursorCircles.forEach((circle, index) => {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCursor() {
    let x = coords.x;
    let y = coords.y;

    cursorCircles.forEach((circle, index) => {
        circle.style.left = x - 2 + 'px';
        circle.style.top = y - 2 + 'px';

        circle.style.transform = `scale(${(cursorCircles.length - index) / cursorCircles.length})`;

        circle.x = x;
        circle.y = y;

        const nextCircle = cursorCircles[index + 1] || cursorCircles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Console easter egg
console.log('%c👋 Hey there, fellow developer!', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%c🤖 Built with AI • Designed by Human', 'color: #0088ff; font-size: 14px;');
console.log('%cInterested in how this was made? Let\'s connect!', 'color: #a0a0b0; font-size: 12px;');