// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation menu highlighting for single page
    initSinglePageNavigation();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize mobile navigation toggle
    initMobileNavToggle();
    
    // Initialize email copy functionality
    initEmailCopyFunctionality();
    
    // Initialize resume download functionality
    initResumeDownload();
    
    // Initialize dark mode functionality
    initDarkMode();
    
    // Initialize header scroll effects
    initHeaderScrollEffects();
    
    // Initialize section scroll spy
    initScrollSpy();
    
    // Initialize sticky projects scroll
    initStickyProjectsScroll();
    
    // Initialize carousel functionality
    initCarousel();
});

/**
 * Initializes single page navigation and section highlighting
 */
function initSinglePageNavigation() {
    // Update navigation highlighting based on current section
    updateActiveNavigation();
}

/**
 * Scroll spy functionality to highlight current section in navigation
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Updates active navigation based on current section
 */
function updateActiveNavigation() {
    // Get current hash or default to about
    const currentHash = window.location.hash || '#about';
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentHash) {
            link.classList.add('active');
        }
    });
}

/**
 * Initializes smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Update URL hash
            window.history.pushState(null, null, targetId);
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Offset for the fixed header
                behavior: 'smooth'
            });
            
            // Update active navigation immediately
            updateActiveNavigation();
        });
    });
    
    // Handle back/forward browser navigation
    window.addEventListener('popstate', function() {
        updateActiveNavigation();
        const targetId = window.location.hash || '#about';
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
}

/**
 * Creates and initializes a mobile navigation menu toggle
 */
function initMobileNavToggle() {
    const nav = document.querySelector('nav');
    const navList = document.querySelector('nav ul');
    const contactButton = document.querySelector('.header-actions .contact-button');
    
    // Create toggle button if it doesn't exist already
    if (!document.querySelector('.mobile-nav-toggle')) {
        const toggleButton = document.createElement('button');
        toggleButton.classList.add('mobile-nav-toggle');
        toggleButton.innerHTML = '☰';
        toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
        
        // Insert toggle button in the header
        const header = document.querySelector('header');
        header.appendChild(toggleButton);
        
        // Clone contact button and add it to mobile navigation
        if (contactButton && window.innerWidth <= 767) {
            const mobileContactButton = contactButton.cloneNode(true);
            mobileContactButton.classList.add('mobile-contact-btn');
            navList.appendChild(mobileContactButton);
            
            // Add click event without closing menu
            mobileContactButton.addEventListener('click', function(e) {
                e.preventDefault();
                const email = 'benjamin.chau@tiny.cloud';
                
                // Use the modern Clipboard API if available
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(email).then(function() {
                        showCopyMessage(mobileContactButton, 'Email copied to clipboard!');
                    }).catch(function() {
                        fallbackCopyTextToClipboard(email, mobileContactButton);
                    });
                } else {
                    fallbackCopyTextToClipboard(email, mobileContactButton);
                }
            });
        }
        
        // Hide the nav list initially on mobile
        if (window.innerWidth <= 767) {
            navList.style.display = 'none';
        }
        
        // Toggle menu visibility when clicked
        toggleButton.addEventListener('click', function() {
            if (navList.style.display === 'none') {
                navList.style.display = 'flex';
                toggleButton.innerHTML = '✕';
            } else {
                navList.style.display = 'none';
                toggleButton.innerHTML = '☰';
            }
        });
    }
    
    // Close menu when a navigation link is clicked (but not when email button is clicked)
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 767) {
                navList.style.display = 'none';
                document.querySelector('.mobile-nav-toggle').innerHTML = '☰';
            }
        });
    });
    
    // Update menu display on resize
    window.addEventListener('resize', function() {
        const mobileContactBtn = document.querySelector('.mobile-contact-btn');
        
        if (window.innerWidth > 767) {
            navList.style.display = 'flex';
            // Remove mobile contact button on desktop
            if (mobileContactBtn) {
                mobileContactBtn.remove();
            }
        } else {
            // Add mobile contact button if not present
            if (!mobileContactBtn && contactButton) {
                const newMobileContactButton = contactButton.cloneNode(true);
                newMobileContactButton.classList.add('mobile-contact-btn');
                navList.appendChild(newMobileContactButton);
                
                // Add click event without closing menu
                newMobileContactButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    const email = 'benjamin.chau@tiny.cloud';
                    
                    // Use the modern Clipboard API if available
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(email).then(function() {
                            showCopyMessage(newMobileContactButton, 'Email copied to clipboard!');
                        }).catch(function() {
                            fallbackCopyTextToClipboard(email, newMobileContactButton);
                        });
                    } else {
                        fallbackCopyTextToClipboard(email, newMobileContactButton);
                    }
                });
            }
            
            if (!document.querySelector('.mobile-nav-toggle').innerHTML.includes('✕')) {
                navList.style.display = 'none';
            }
        }
    });
}

/**
 * Animation for project scroll hint
 * (Only runs on the projects page)
 */
if (document.querySelector('.scroll-hint')) {
    let opacity = 1;
    let direction = -0.01;
    
    // Pulsing animation for scroll hint
    setInterval(() => {
        opacity += direction;
        
        if (opacity <= 0.3) {
            direction = 0.01;
        } else if (opacity >= 1) {
            direction = -0.01;
        }
        
        document.querySelector('.scroll-hint').style.opacity = opacity;
    }, 50);
}

/**
 * Initializes email copy functionality
 */
function initEmailCopyFunctionality() {
    const emailButtons = document.querySelectorAll('.contact-button, .mobile-contact-btn');
    
    emailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = 'benjamin.chau@tiny.cloud';
            
            // Use the modern Clipboard API if available
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(function() {
                    showCopyMessage(button, 'Email copied to clipboard!');
                }).catch(function() {
                    fallbackCopyTextToClipboard(email, button);
                });
            } else {
                fallbackCopyTextToClipboard(email, button);
            }
        });
    });
}

/**
 * Fallback function for copying text to clipboard
 */
function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyMessage(button, 'Email copied to clipboard!');
        } else {
            showCopyMessage(button, 'Copy failed. Email: benjamin.chau@tiny.cloud');
        }
    } catch (err) {
        showCopyMessage(button, 'Copy failed. Email: benjamin.chau@tiny.cloud');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Shows a temporary success message
 */
function showCopyMessage(button, message) {
    const originalText = button.innerHTML;
    button.innerHTML = 'EMAIL COPIED!';
    
    setTimeout(() => {
        button.innerHTML = originalText;
    }, 2000);
}

/**
 * Initializes resume download functionality
 */
function initResumeDownload() {
    const resumeLink = document.querySelector('.resume-link');
    
    if (resumeLink) {
        resumeLink.addEventListener('click', function() {
            // Create a link element
            const downloadLink = document.createElement('a');
            
            // Set the file URL
            downloadLink.href = 'assets/CHAU__Benjamin_2025_Resume.pdf';
            
            // Set the download attribute with desired filename
            downloadLink.download = 'CHAU__Benjamin_2025_Resume.pdf';
            
            // Append to the body (required for Firefox)
            document.body.appendChild(downloadLink);
            
            // Trigger the click
            downloadLink.click();
            
            // Clean up
            document.body.removeChild(downloadLink);
        });
        
        // Add cursor style to indicate it's clickable
        resumeLink.style.cursor = 'pointer';
    }
}

/**
 * Initializes dark mode functionality
 */
function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    
    // Check for saved dark mode preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    // Toggle dark mode when button is clicked
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            // Save the user's preference
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

/**
 * Initializes header scroll effects
 */
function initHeaderScrollEffects() {
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when scrolled down
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Initialize sticky scroll effect for projects section
 */
function initStickyProjectsScroll() {
    const projectsSection = document.querySelector('.projects-sticky-section');
    const projectPodLinks = document.querySelectorAll('.project-pod-link');
    const projectsTitle = document.querySelector('.projects-title-wrapper');
    
    if (!projectsSection || projectPodLinks.length === 0) return;
    
    // Cache DOM elements and values
    const pods = Array.from(projectPodLinks).map(link => ({
        element: link.querySelector('.project-pod'),
        link: link
    }));
    let sectionTop = projectsSection.offsetTop;
    let sectionHeight = projectsSection.offsetHeight;
    let windowHeight = window.innerHeight;
    let isMobile = window.innerWidth <= 768;
    
    // Cache for last known values to prevent unnecessary updates
    let lastScrollProgress = -1;
    let titleVisible = false;
    
    // Mobile-specific optimizations
    let lastMobileUpdate = 0;
    const mobileThrottleDelay = 16; // ~60fps for smoother mobile experience
    
    // Function to update cached values on resize
    function updateCachedValues() {
        sectionTop = projectsSection.offsetTop;
        sectionHeight = projectsSection.offsetHeight;
        windowHeight = window.innerHeight;
        isMobile = window.innerWidth <= 768;
    }
    
    // Function to set initial positions based on screen size
    function setInitialPositions() {
        pods.forEach(pod => {
            pod.element.style.transform = `translate3d(0, 110vh, 0)`;
            // Add mobile-specific optimizations
            if (isMobile) {
                pod.element.style.willChange = 'transform';
                pod.element.style.backfaceVisibility = 'hidden';
                pod.element.style.perspective = '1000px';
            }
        });
    }
    
    // Set initial positions
    setInitialPositions();
    
    // Hide title initially
    if (projectsTitle) {
        projectsTitle.style.opacity = '0';
        projectsTitle.style.visibility = 'hidden';
    }
    
    // Optimized easing function with lookup table for common values
    const easingCache = new Map();
    function easeInOutCubic(t) {
        // Round to 3 decimal places for caching
        const key = Math.round(t * 1000) / 1000;
        if (easingCache.has(key)) {
            return easingCache.get(key);
        }
        const result = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        easingCache.set(key, result);
        return result;
    }
    
    // Handle scroll animation
    function updateProjectsScroll() {
        const scrollY = window.pageYOffset;
        const now = performance.now();
        
        // Additional mobile throttling to prevent jerky animations
        if (isMobile && now - lastMobileUpdate < mobileThrottleDelay) {
            return;
        }
        lastMobileUpdate = now;
        
        // Quick check if we're anywhere near the projects section
        const quickCheckStart = sectionTop - windowHeight * 1.5;
        const quickCheckEnd = sectionTop + sectionHeight + windowHeight * 0.5;
        
        if (scrollY < quickCheckStart || scrollY > quickCheckEnd) {
            // Far from section - hide title if visible and exit early
            if (projectsTitle && titleVisible) {
                projectsTitle.style.opacity = '0';
                projectsTitle.style.visibility = 'hidden';
                titleVisible = false;
            }
            return;
        }
        
        // Calculate if we're in the projects section for title visibility
        const sectionStart = sectionTop - windowHeight * 0.5;
        const sectionEnd = sectionTop + sectionHeight - windowHeight * 0.5;
        const inProjectsSection = scrollY >= sectionStart && scrollY <= sectionEnd;
        
        // Update title visibility only if changed
        if (projectsTitle && inProjectsSection !== titleVisible) {
            titleVisible = inProjectsSection;
            if (titleVisible) {
                projectsTitle.style.opacity = '1';
                projectsTitle.style.visibility = 'visible';
            } else {
                projectsTitle.style.opacity = '0';
                projectsTitle.style.visibility = 'hidden';
            }
        }
        
        // Calculate progress through the section (0 to 1)
        const sectionScrollProgress = Math.max(0, Math.min(1, 
            (scrollY - sectionTop + windowHeight) / (sectionHeight + windowHeight)
        ));
        
        // Increase threshold for mobile to reduce jitter
        const threshold = isMobile ? 0.01 : 0.005;
        if (Math.abs(sectionScrollProgress - lastScrollProgress) < threshold) {
            return;
        }
        lastScrollProgress = sectionScrollProgress;
        
        // Apply easing to the progress
        const easedProgress = easeInOutCubic(sectionScrollProgress);
        
        // Pre-calculate common values
        const startY = 110;
        const endY = -110;
        const totalDistance = startY - endY;
        
        // Update pod positions
        pods.forEach((pod, index) => {
            // Different timing for each pod
            let individualProgress;
            if (index === 0) {
                // OzMath pod - appears early and exits midway through scroll
                individualProgress = Math.max(0, Math.min(1, easedProgress * 1.5));
            } else {
                // Breach pod - appears later and continues all the way to the end
                individualProgress = Math.max(0, Math.min(1, (easedProgress - 0.3) / 0.7));
            }
            
            // Calculate pod Y position
            const currentY = startY - (totalDistance * individualProgress);
            
            // Apply transform with mobile optimizations
            if (isMobile) {
                // Use rounded values on mobile to prevent sub-pixel rendering issues
                const roundedY = Math.round(currentY * 100) / 100;
                pod.element.style.transform = `translate3d(0, ${roundedY}vh, 0)`;
            } else {
                pod.element.style.transform = `translate3d(0, ${currentY}vh, 0)`;
            }
        });
    }
    
    // Throttle scroll events for performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateProjectsScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Listen for scroll events with passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial update
    updateProjectsScroll();
    
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            updateCachedValues();
            setInitialPositions();
            updateProjectsScroll();
        }, 250);
    });
}

/**
 * Initialize carousel functionality
 */
function initCarousel() {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;

    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    // Function to show specific slide
    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }

    // Function to go to next slide
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }

    // Function to go to previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }

    // Function to start auto-slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 2000); // Change slide every 6 seconds
    }

    // Function to stop auto-slide
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    // Event listeners for manual controls
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 8000); // Restart auto-slide after 8 seconds
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 8000); // Restart auto-slide after 8 seconds
        });
    }

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            setTimeout(startAutoSlide, 8000); // Restart auto-slide after 8 seconds
        });
    });

    // Pause auto-slide on hover
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
            stopAutoSlide();
            setTimeout(startAutoSlide, 8000);
        }
    }

    // Start auto-slide
    startAutoSlide();
} 
