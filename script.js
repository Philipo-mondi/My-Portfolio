// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form validation and alert message
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const message = this.querySelector('textarea').value.trim();
    
    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }
    
    alert("Thank you, " + name + "! Your message has been sent.");
    this.reset();
});

// Simple fade-in animation on scroll
const sections = document.querySelectorAll('section');
const options = {
    threshold: 0.2
};
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, options);

sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});
// Add event listener for scrolling effect
document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navHeight = document.querySelector("header").offsetHeight;
    
    sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - navHeight) {
            section.style.opacity = 1;
            section.style.transform = "translateY(0)";
        }
    });
});
function scrollToContact() {
    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
}
