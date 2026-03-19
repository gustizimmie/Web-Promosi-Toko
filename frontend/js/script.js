// Pricing Tabs Toggle
const tabBtns = document.querySelectorAll('.tab-btn');
const pricingContents = document.querySelectorAll('.pricing-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        pricingContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === target) {
                content.classList.add('active');
            }
        });
    });
});

// Header scroll effect
const navbar = document.querySelector('.navbar-fixed-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Spy: Update active link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navCollapse = document.getElementById('nav-collapse');
const navParent = document.querySelector('.navbar-fixed-top');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        const isActive = navCollapse.classList.toggle('active');
        navParent.classList.toggle('menu-active');
        
        // Body scroll lock
        if (isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        const icon = mobileToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Auto-close mobile menu on link click
const navLinksItems = document.querySelectorAll('.navbar-nav a');
navLinksItems.forEach(link => {
    link.addEventListener('click', (e) => {
        // Find if this is a dropdown toggle
        const isDropdownToggle = link.classList.contains('dropdown-toggle');
        
        if (navCollapse.classList.contains('active')) {
            if (isDropdownToggle) {
                // If mobile, toggle dropdown instead of closing menu
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    e.stopPropagation(); // Stop bubbling
                    const parent = link.parentElement;
                    
                    // Close other dropdowns
                    document.querySelectorAll('.dropdown').forEach(d => {
                        if (d !== parent) d.classList.remove('open');
                    });
                    
                    parent.classList.toggle('open');
                }
            } else {
                // Regular link, close menu
                navCollapse.classList.remove('active');
                navParent.classList.remove('menu-active');
                document.body.style.overflow = '';
                const icon = mobileToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });
});

// Fade in animation on scroll using Intersection Observer
const observerOptions = { 
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const premiumObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  premiumObserver.observe(el);
});
