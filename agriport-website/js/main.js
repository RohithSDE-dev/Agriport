// ============================
// AGRIPORT — Main JavaScript
// ============================

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Navbar Scroll Effect ----------
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    const handleNavScroll = () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ---------- Mobile Nav Toggle ----------
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // ---------- Scroll Reveal Animation ----------
    const revealElements = document.querySelectorAll(
        '.problem-card, .usp-card, .arch-block, .proto-block, ' +
        '.step, .impact-block, .phase, .validation-list li, .team-card'
    );

    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation based on element's position among siblings
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.children) : [];
                const siblingIndex = siblings.indexOf(entry.target);
                const delay = siblingIndex * 100;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                revealObserver.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ---------- Active Navigation Highlight ----------
    const sections = document.querySelectorAll('.section, .hero');
    const navItems = document.querySelectorAll('.nav-links a');

    const highlightNav = () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.pageYOffset >= sectionTop &&
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.style.color = '';
            item.style.background = '';

            if (item.getAttribute('href') === `#${current}`) {
                item.style.color = 'var(--green-light)';
                item.style.background = 'var(--green-glow)';
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();

    // ---------- Smooth Scroll for Safari ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = parseInt(
                    getComputedStyle(document.documentElement)
                        .getPropertyValue('--nav-height')
                ) || 72;

                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---------- Pipeline Node Hover Glow ----------
    document.querySelectorAll('.pipeline-node').forEach(node => {
        node.addEventListener('mouseenter', () => {
            node.style.transform = 'scale(1.1)';
        });
        node.addEventListener('mouseleave', () => {
            node.style.transform = 'scale(1)';
        });
    });

    // ---------- Console Credit ----------
    console.log(
        '%c🌱 AGRIPORT %c— Offline Multimodal Edge AI for Smart Farming',
        'color: #22c55e; font-size: 16px; font-weight: bold;',
        'color: #8899b4; font-size: 12px;'
    );
});
