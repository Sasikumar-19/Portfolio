document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Navbar Scroll Effect & Active Link Highlight ---
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Navbar bg change
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href') === `#${current}`) {
                li.classList.add('active');
            }
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach(el => observer.observe(el));

    // --- Typing Effect for Subtitle ---
    const subtitle = document.querySelector('.sub-title');
    const textArray = ["Team Leader", "Analyzer", "Critical Thinker"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            subtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            subtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 100;

        if (isDeleting) {
            typeSpeed /= 2; // Delete faster
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500; // Pause before typing new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing effect after a short delay
    setTimeout(type, 1000);

    // --- Real AJAX Form Submission ---
    const contactForm = document.getElementById('contactForm');
    const submitMsg = document.getElementById('submitMsg');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent redirecting to the captcha page permanently
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            // Loading state
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
            
            // Gather form data to send via AJAX
            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // FormSubmit specific header for AJAX
                }
            })
            .then(response => {
                if (response.ok) {
                    contactForm.reset();
                    btn.innerHTML = originalText;
                    submitMsg.style.display = 'block';
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        submitMsg.style.display = 'none';
                    }, 5000);
                } else {
                    btn.innerHTML = originalText;
                    alert("Oops! There was a problem submitting your form");
                }
            })
            .catch(error => {
                btn.innerHTML = originalText;
                alert("Oops! There was a problem submitting your form");
            });
        });
    }
});
