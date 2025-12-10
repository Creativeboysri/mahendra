// ==========================================
// MOBILE NAVIGATION TOGGLE
// ==========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// HEADER BACKGROUND ON SCROLL
// ==========================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ==========================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// ANIMATE ON SCROLL
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
    '.belief-card, .value-card, .project-card, .why-card, .testimonial-card, .team-card, .stat-item'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==========================================
// COUNTER ANIMATION FOR STATS
// ==========================================
const stats = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;

    stats.forEach(stat => {
        const target = stat.textContent.replace(/\D/g, '');
        const suffix = stat.textContent.replace(/[0-9]/g, '');
        let count = 0;
        const increment = Math.ceil(target / 100);
        const duration = 2000;
        const stepTime = duration / (target / increment);

        const counter = setInterval(() => {
            count += increment;
            if (count >= target) {
                stat.textContent = target + suffix;
                clearInterval(counter);
            } else {
                stat.textContent = count + suffix;
            }
        }, stepTime);
    });

    statsAnimated = true;
}

// Trigger stats animation when section is visible
const statsSection = document.querySelector('.partners-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
}

// ==========================================
// PARALLAX EFFECT FOR HERO
// ==========================================
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;

    if (hero && scrolled < hero.offsetHeight) {
        hero.style.backgroundPositionY = `${parallax}px`;
    }
});

// ==========================================
// FORM VALIDATION (for future contact forms)
// ==========================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==========================================
// PRELOADER (Optional)
// ==========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// DYNAMIC YEAR IN FOOTER
// ==========================================
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.textContent = footerYear.textContent.replace('2024', currentYear);
}

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Lazy load images for better performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('🏗️ Stevenson Construction Website Loaded Successfully!');

// ==========================================
// STICKY TIMELINE SCROLL INTERACTION
// ==========================================
function initStickyTimeline() {
    const timelineNavItems = document.querySelectorAll('.timeline-nav-item');
    const timelineYearSections = document.querySelectorAll('.timeline-year-section');
    
    // Only proceed if elements exist
    if (timelineNavItems.length === 0 || timelineYearSections.length === 0) {
        return; 
    }

    // Function to calculate position relative to document
    function getOffsetTop(element) {
        let offsetTop = 0;
        while(element) {
            offsetTop += element.offsetTop;
            element = element.offsetParent;
        }
        return offsetTop;
    }

    // Scroll detection to highlight active year
    function updateActiveYear() {
        // Use a trigger point slightly down the viewport (e.g., 30% down)
        const triggerPoint = window.scrollY + (window.innerHeight * 0.3);

        timelineYearSections.forEach((section, index) => {
            const sectionTop = getOffsetTop(section);
            const sectionBottom = sectionTop + section.offsetHeight;

            // Check if the trigger point is within the section
            // Also activating the last section if scrolled to bottom
            const isLastSection = index === timelineYearSections.length - 1;
            const scrolledToBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50;

            if ((triggerPoint >= sectionTop && triggerPoint < sectionBottom) || (isLastSection && scrolledToBottom)) {
                
                // Remove active class from all nav items
                timelineNavItems.forEach(item => item.classList.remove('active'));
                
                // Add active class to corresponding nav item
                // Use data-year attribute to match if index might not align (though here it should)
                const year = section.getAttribute('data-year');
                const navItem = document.querySelector(`.timeline-nav-item[data-year="${year}"]`);
                
                if (navItem) {
                    navItem.classList.add('active');
                }
            }
        });
    }

    // Click navigation to year section
    timelineNavItems.forEach((navItem) => {
        navItem.addEventListener('click', () => {
            const year = navItem.getAttribute('data-year');
            const targetSection = document.querySelector(`.timeline-year-section[data-year="${year}"]`);
            
            if (targetSection) {
                // Determine offset (header height + extra padding)
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 80;
                const offset = 100; // Extra padding for visual breathing room
                
                const targetPosition = getOffsetTop(targetSection) - headerHeight - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update on scroll with throttle for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                updateActiveYear();
                scrollTimeout = null;
            }, 20); // 20ms debounce
        }
    });

    // Initial check
    setTimeout(updateActiveYear, 100);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStickyTimeline);
} else {
    initStickyTimeline();
}
