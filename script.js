document.addEventListener('DOMContentLoaded', () => {
    // 1. 스크롤 페이드인 (fade-in) 애니메이션
    const fadeElements = document.querySelectorAll('.fade-in');

    const checkFade = () => {
        const triggerBottom = window.innerHeight * 0.9;
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', checkFade);
    checkFade(); // 초기 로딩 시 한 번 실행

    // 2. 갤러리 가로 스크롤 시 스와이프 힌트(가이드 텍스트) 서서히 숨기기
    const galleryScroll = document.querySelector('.gallery-scroll');
    const swipeHint = document.querySelector('.swipe-hint');
    
    if (galleryScroll && swipeHint) {
        galleryScroll.addEventListener('scroll', () => {
            if (galleryScroll.scrollLeft > 20) {
                swipeHint.style.transition = 'opacity 0.5s ease';
                swipeHint.style.opacity = '0';
            } else {
                swipeHint.style.opacity = '1';
            }
        });
    }

    // 3. 네비게이션용 부드러운 스크롤 유도 화살표
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
        scrollIndicator.style.cursor = 'pointer';
    }
});
