// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        mobileNav.classList.add('active');
        menuBtn.classList.add('open');
        menuOpen = true;
    } else {
        mobileNav.classList.remove('active');
        menuBtn.classList.remove('open');
        menuOpen = false;
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        menuBtn.classList.remove('open');
        menuOpen = false;
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to contact section function
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    const headerOffset = 80;
    const elementPosition = contactSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                showPopup("Thank you for your message! I will get back to you soon.", "success");
                contactForm.reset();
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            showPopup("Sorry, there was an error sending your message. Please try again later.", "error");
        }
    });
}

// Function to show a popup message
function showPopup(message, type) {
    // Create popup element
    const popup = document.createElement("div");
    popup.classList.add("popup-message", type);
    popup.innerText = message;

    // Add popup to the body
    document.body.appendChild(popup);

    // Remove popup after 3 seconds
    setTimeout(() => {
        popup.remove();
    }, 3000);
}
