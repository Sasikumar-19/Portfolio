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

    // --- Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        
        // Check saved theme
        let isDark = localStorage.getItem('theme') !== 'light';
        if (!localStorage.getItem('theme')) { 
            isDark = true; 
            localStorage.setItem('theme', 'dark'); 
        }

        const applyTheme = (dark) => {
            document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
            themeIcon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            localStorage.setItem('theme', dark ? 'dark' : 'light');
        };

        applyTheme(isDark);

        themeToggleBtn.addEventListener('click', () => {
            isDark = !isDark;
            applyTheme(isDark);
        });
    }

    // --- 3D Tilt on Project Cards ---
    const projectCards = document.querySelectorAll('.project-card');
    
    // Check if user prefers reduced motion (accessibility)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        projectCards.forEach(card => {
            let rafId = null;

            card.addEventListener('mousemove', (e) => {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    // Calculate mouse position relative to the center of the card
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    
                    // Apply a perspective and dynamic rotation
                    // Max rotation is roughly 12 degrees
                    card.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(6px)`;
                });
            });

            card.addEventListener('mouseleave', () => {
                if (rafId) cancelAnimationFrame(rafId);
                // Reset card on leave with a smooth transition
                card.style.transform = `perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)`;
                card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                
                // Remove transition after it resets so it doesn't lag the mousemove
                setTimeout(() => {
                    card.style.transition = '';
                }, 400);
            });
            
            // Setup initial transition state when entering
            card.addEventListener('mouseenter', () => {
                 card.style.transition = 'none'; // Disable CSS transition for snappy JS follow
            });
        });
    }


    // --- Project Filtering Logic ---
    const filterBtns = document.querySelectorAll('.project-tab-btn');
    const filterableCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            filterableCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
                    card.style.display = 'block';
                    // Small timeout to allow display:block to apply before animating opacity
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400); // Wait for transition
                }
            });
        });
    });

    // --- Particle Background Canvas ---
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray;

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });

        // Particle class
        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            // Method to draw individual particle
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            // Check particle position, update position, and draw
            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        // Create particle array
        function initParticles() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 15000;
            // Cap particles for performance
            if (numberOfParticles > 100) numberOfParticles = 100;
            
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                let color = 'rgba(14, 165, 233, 0.4)'; // Theme accent color
                
                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        // Connect particles with lines if close enough
        function connectParticles() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                                   ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        if(opacityValue < 0) opacityValue = 0;
                        ctx.strokeStyle = `rgba(14, 165, 233, ${opacityValue * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Animation loop
        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connectParticles();
        }

        initParticles();
        animateParticles();
    }

});
