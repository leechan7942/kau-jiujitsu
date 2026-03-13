document.addEventListener('DOMContentLoaded', () => {
    // ── 1. 스크롤 프로그레스 바 ──
    const scrollProgress = document.querySelector('.scroll-progress');

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = progress + '%';
    }

    // ── 2. Intersection Observer 기반 애니메이션 ──
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .scale-in');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(el => animationObserver.observe(el));

    // ── 3. 갤러리 스와이프 힌트 숨기기 ──
    const galleryScrolls = document.querySelectorAll('.gallery-scroll');

    galleryScrolls.forEach(gallery => {
        const hint = gallery.parentElement.querySelector('.swipe-hint');
        if (!hint) return;

        gallery.addEventListener('scroll', () => {
            if (gallery.scrollLeft > 20) {
                hint.style.transition = 'opacity 0.5s ease';
                hint.style.opacity = '0';
            } else {
                hint.style.opacity = '1';
            }
        }, { passive: true });
    });

    // ── 4. 스크롤 인디케이터 클릭 ──
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        });
    }

    // ── 5. Parallax 히어로 ──
    const heroBg = document.querySelector('.hero-bg');
    const heroContent = document.querySelector('.hero-content');

    function updateParallax() {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;

        if (scrollY < heroHeight) {
            const bgOffset = scrollY * 0.3;
            const contentOffset = scrollY * 0.5;
            heroBg.style.transform = `scale(${1.05 + scrollY * 0.0001}) translateY(${bgOffset}px)`;
            heroContent.style.transform = `translateY(${contentOffset}px)`;
            heroContent.style.opacity = 1 - (scrollY / heroHeight) * 1.2;
        }
    }

    // ── 6. 카운터 애니메이션 ──
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
                counterObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target, 10);
            const suffix = stat.dataset.suffix || '';
            const duration = 1500;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);
                stat.textContent = current.toLocaleString() + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // ── 7. 도트 네비게이션 ──
    const dotNav = document.querySelector('.dot-nav');
    const dotLinks = dotNav.querySelectorAll('a');
    const sections = [];

    dotLinks.forEach(link => {
        const sectionId = link.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);
        if (section) sections.push({ el: section, link });
    });

    function updateDotNav() {
        const scrollY = window.scrollY;

        // 히어로 섹션을 지나면 도트 네비 표시
        if (scrollY > window.innerHeight * 0.5) {
            dotNav.classList.add('visible');
        } else {
            dotNav.classList.remove('visible');
        }

        // 현재 섹션 하이라이트
        let current = sections[0];
        sections.forEach(s => {
            if (scrollY >= s.el.offsetTop - 200) {
                current = s;
            }
        });

        dotLinks.forEach(l => l.classList.remove('active'));
        if (current) current.link.classList.add('active');
    }

    dotLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── 8. Back to Top 버튼 ──
    const backToTop = document.querySelector('.back-to-top');

    function updateBackToTop() {
        if (window.scrollY > window.innerHeight) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ── 9. 리플 이펙트 ──
    const rippleTargets = document.querySelectorAll('.benefit-card, .btn-primary, .btn-secondary');

    rippleTargets.forEach(el => {
        el.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);

            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });

    // ── 10. 풀스크린 이미지 모달 ──
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCounter = document.getElementById('modalCounter');
    const modalClose = modal.querySelector('.modal-close');
    const modalPrev = modal.querySelector('.modal-nav.prev');
    const modalNext = modal.querySelector('.modal-nav.next');

    let currentGalleryImages = [];
    let currentImageIndex = 0;

    function openModal(images, index) {
        currentGalleryImages = images;
        currentImageIndex = index;
        showModalImage();
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function showModalImage() {
        modalImg.src = currentGalleryImages[currentImageIndex];
        modalCounter.textContent = `${currentImageIndex + 1} / ${currentGalleryImages.length}`;
    }

    function navigateModal(direction) {
        currentImageIndex = (currentImageIndex + direction + currentGalleryImages.length) % currentGalleryImages.length;
        showModalImage();
    }

    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', () => navigateModal(-1));
    modalNext.addEventListener('click', () => navigateModal(1));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') navigateModal(-1);
        if (e.key === 'ArrowRight') navigateModal(1);
    });

    // 모달 스와이프 지원
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) {
            navigateModal(swipeDistance > 0 ? -1 : 1);
        }
    }, { passive: true });

    // ── 11. 통합 스크롤 핸들러 (requestAnimationFrame 최적화) ──
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress();
                updateParallax();
                updateDotNav();
                updateBackToTop();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // 초기 실행
    updateScrollProgress();
    updateDotNav();
    updateBackToTop();

    // ── 12. 동적 이미지 갤러리 렌더링 ──
    const allTrainingImages = ["training_01.webp", "training_02.webp", "training_03.webp", "training_04.webp", "training_05.webp", "training_06.webp", "training_07.webp"];
    const allActivityImages = ["activity_01.webp", "activity_02.webp", "activity_03.webp", "activity_04.webp", "activity_05.webp", "activity_06.webp", "activity_07.webp"];
    const allRandomImages = Array.from({ length: 75 }, (_, i) => `random_${String(i + 1).padStart(2, '0')}.webp`);

    function shuffle(array) {
        const arr = [...array];
        let currentIndex = arr.length;
        while (currentIndex > 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
        }
        return arr;
    }

    function renderGallery(galleryId, imagesArray, relativePath, useShuffle = false, limit = 0) {
        const galleryElement = document.getElementById(galleryId);
        if (!galleryElement) return;

        let workingArray = [...imagesArray];
        if (useShuffle) workingArray = shuffle(workingArray);
        if (limit > 0) workingArray = workingArray.slice(0, limit);

        const fullPaths = workingArray.map(name => `${relativePath}${name}`);

        galleryElement.innerHTML = workingArray.map((imgName, index) => `
            <div class="gallery-item" data-gallery="${galleryId}" data-index="${index}">
                <img src="${relativePath}${imgName}" alt="갤러리 사진 ${index + 1}" loading="lazy">
            </div>
        `).join('');

        // 갤러리 아이템 클릭 → 모달 열기
        galleryElement.querySelectorAll('.gallery-item').forEach((item, idx) => {
            item.addEventListener('click', () => openModal(fullPaths, idx));
        });
    }

    renderGallery('training-gallery', allTrainingImages, './images/training/');
    renderGallery('activities-gallery', allActivityImages, './images/activities/');
    renderGallery('random-gallery', allRandomImages, './images/random/', true, 8);
});
