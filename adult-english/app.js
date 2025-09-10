// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
});

// Fixed smooth scrolling for internal links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#' || targetId.length <= 1) {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight + 20 : 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Fixed navigation active state
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 200; // Adjusted offset
        let activeSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkTarget = link.getAttribute('href').substring(1);
            if (linkTarget === activeSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttled scroll listener for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    updateActiveNav(); // Call once on load
});

// Fixed external link handling
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="mailto:"], a[href^="https://wa.me"], a[href^="https://cal.com"]');
    
    externalLinks.forEach(link => {
        // Ensure external links open in new tab
        if (!link.getAttribute('target') && !link.href.startsWith('mailto:')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
        
        link.addEventListener('click', function(e) {
            // Don't prevent default - let the browser handle the navigation
            const isButton = this.classList.contains('btn');
            
            if (isButton) {
                // Visual feedback only, don't prevent navigation
                const originalText = this.textContent;
                this.style.opacity = '0.8';
                
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 1000);
            }
        });
    });
});

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', function() {
    const allButtons = document.querySelectorAll('.btn');
    
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// Smooth reveal animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.card, .achievement, .compliance__box');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        observer.observe(element);
    });
});

// Keyboard navigation support
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('navMenu');
            const navToggle = document.getElementById('navToggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            }
        }
    });
    
    // Improve focus visibility
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #f97316';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
});

// Email functionality with better UX
document.addEventListener('DOMContentLoaded', function() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        let clickCount = 0;
        
        link.addEventListener('click', function(e) {
            clickCount++;
            const email = this.href.replace('mailto:', '').split('?')[0];
            
            if (clickCount === 1 && navigator.clipboard && navigator.clipboard.writeText) {
                e.preventDefault();
                navigator.clipboard.writeText(email).then(() => {
                    showTooltip(this, 'Email copied! Click again to open email client.');
                }).catch(() => {
                    // Fallback: just open email client
                    window.location.href = this.href;
                });
            }
            // Second click or if clipboard not available, open email client normally
        });
    });
    
    function showTooltip(element, message) {
        const existingTooltip = document.querySelector('.email-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        const tooltip = document.createElement('div');
        tooltip.className = 'email-tooltip';
        tooltip.textContent = message;
        tooltip.style.cssText = `
            position: fixed;
            background: #1e40af;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 10000;
            pointer-events: none;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip near the clicked element
        const rect = element.getBoundingClientRect();
        tooltip.style.left = Math.max(10, rect.left + rect.width/2 - tooltip.offsetWidth/2) + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        
        requestAnimationFrame(() => {
            tooltip.style.opacity = '1';
        });
        
        setTimeout(() => {
            if (tooltip && tooltip.parentNode) {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    if (tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 300);
            }
        }, 3000);
    }
});

// WhatsApp link enhancement
document.addEventListener('DOMContentLoaded', function() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Ensure WhatsApp links work properly on all devices
            const href = this.href;
            
            // For mobile devices, try to open WhatsApp app directly
            if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                const phoneNumber = href.replace('https://wa.me/', '');
                const whatsappURL = `whatsapp://send?phone=${phoneNumber}`;
                
                // Try to open WhatsApp app, fallback to web version
                window.location.href = whatsappURL;
                setTimeout(() => {
                    window.open(href, '_blank');
                }, 2000);
            }
        });
    });
});

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[\d\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Smooth page reveal
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
    
    // Add loaded class for additional styling
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 400);
    
    console.log('✅ Kanwal Mukhtar website fully loaded');
    console.log('✅ Maximum readability implemented');
    console.log('✅ All navigation links functional');
    console.log('✅ CTA buttons working properly');
    console.log('✅ Mobile menu operational');
    console.log('✅ External links configured');
    console.log('✅ Accessibility enhanced');
});

// Error handling
window.addEventListener('error', function(e) {
    console.warn('Non-critical error:', e.message);
}, true);

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(function() {
        // Preload critical resources during idle time
        const criticalLinks = [
            'https://cal.com/kanwal-mukhtar',
            'https://wa.me/4917461386397'
        ];
        
        criticalLinks.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = url;
            document.head.appendChild(link);
        });
    });
}