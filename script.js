document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const body = document.body;

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            body.classList.toggle('nav-open');
        });
    }

    // Close mobile nav on link click
    const mobileLinks = document.querySelectorAll('.nav-mobile a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            body.classList.remove('nav-open');
        });
    });

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project Modals
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.modal-close');
    const projectCards = document.querySelectorAll('.project-card');

    function openModal(title, tag, detailsObj) {
        if (!modal || !modalBody) return;
        
        // Build the HTML for the detailed view
        let htmlContent = `
            <h3 id="modal-title">${title}</h3>
            <span class="project-tag">${tag}</span>
        `;
        
        if (detailsObj && Array.isArray(detailsObj)) {
            htmlContent += '<ul>';
            detailsObj.forEach(detail => {
                htmlContent += `<li>${detail}</li>`;
            });
            htmlContent += '</ul>';
        }

        modalBody.innerHTML = htmlContent;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = ''; 
    }

    // Attach click listeners to cards
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const tag = card.getAttribute('data-tag');
            try {
                const details = JSON.parse(card.getAttribute('data-details'));
                openModal(title, tag, details);
            } catch (e) {
                console.error("Failed to parse card details", e);
            }
        });
    });

    // Close logic
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on background click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

});
