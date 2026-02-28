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

    // 4. 동적 이미지 갤러리 렌더링
    const allTrainingImages = ["KakaoTalk_Photo_2026-02-28-21-01-28 007.heic", "KakaoTalk_Photo_2026-02-28-21-02-20 013.heic", "KakaoTalk_Photo_2026-02-28-21-01-54 016.heic", "KakaoTalk_Photo_2026-02-28-21-01-54 014.heic", "KakaoTalk_Photo_2026-02-28-21-02-21 016.heic", "KakaoTalk_Photo_2026-02-28-21-02-21 022.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-29 016.jpeg"];
    const allActivityImages = ["activity_01.webp", "activity_02.webp", "activity_03.webp", "activity_04.webp", "activity_05.webp", "activity_06.webp", "activity_07.webp"];
    const allRandomImages = ["KakaoTalk_Photo_2026-02-28-21-01-29 018.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-10 005.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-54 011.heic", "KakaoTalk_Photo_2026-02-28-21-02-19 002.heic", "KakaoTalk_Photo_2026-02-28-21-02-20 012.heic", "KakaoTalk_Photo_2026-02-28-21-02-19 003.heic", "KakaoTalk_Photo_2026-02-28-21-01-54 010.heic", "KakaoTalk_Photo_2026-02-28-21-02-22 024.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-28 006.heic", "KakaoTalk_Photo_2026-02-28-21-01-29 019.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-29 012.jpeg", "KakaoTalk_Photo_2026-02-28-21-02-22 026.heic", "KakaoTalk_Photo_2026-02-28-21-01-10 003.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-55 017.heic", "KakaoTalk_Photo_2026-02-28-21-02-22 030.heic", "KakaoTalk_Photo_2026-02-28-21-01-30 027.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-53 006.heic", "KakaoTalk_Photo_2026-02-28-21-02-19 001.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-28 001.heic", "KakaoTalk_Photo_2026-02-28-21-02-21 019.heic", "KakaoTalk_Photo_2026-02-28-21-02-22 023.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-29 020.webp", "KakaoTalk_Photo_2026-02-28-21-02-21 018.heic", "KakaoTalk_Photo_2026-02-28-21-02-20 014.webp", "KakaoTalk_Photo_2026-02-28-21-01-53 002.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-09 001.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-30 026.jpeg", "KakaoTalk_Photo_2026-02-28-21-02-22 027.heic", "KakaoTalk_Photo_2026-02-28-21-01-53 004.heic", "KakaoTalk_Photo_2026-02-28-21-02-21 017.heic", "KakaoTalk_Photo_2026-02-28-21-01-30 025.jpeg", "KakaoTalk_Photo_2026-02-28-21-02-22 028.webp", "KakaoTalk_Photo_2026-02-28-21-02-19 006.heic", "KakaoTalk_Photo_2026-02-28-21-01-29 015.webp", "KakaoTalk_Photo_2026-02-28-21-01-10 004.webp", "KakaoTalk_Photo_2026-02-28-21-01-54 015.heic", "KakaoTalk_Photo_2026-02-28-21-02-20 008.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-28 010.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-30 029.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-28 003.heic", "KakaoTalk_Photo_2026-02-28-21-02-21 021.heic", "KakaoTalk_Photo_2026-02-28-21-01-09 002.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-53 001.jpeg", "KakaoTalk_Photo_2026-02-28-21-02-21 020.heic", "KakaoTalk_Photo_2026-02-28-21-01-55 018.heic", "KakaoTalk_Photo_2026-02-28-21-01-30 028.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-28 002.heic", "KakaoTalk_Photo_2026-02-28-21-01-54 007.jpeg", "KakaoTalk_Photo_2026-02-28-21-02-22 025.heic", "KakaoTalk_Photo_2026-02-28-21-01-29 011.jpeg", "KakaoTalk_Photo_2026-02-28-21-02-20 009.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-29 014.webp", "KakaoTalk_Photo_2026-02-28-21-02-19 007.heic", "KakaoTalk_Photo_2026-02-28-21-01-30 021.webp", "KakaoTalk_Photo_2026-02-28-21-01-53 005.heic", "KakaoTalk_Photo_2026-02-28-21-01-28 005.heic", "KakaoTalk_Photo_2026-02-28-21-02-19 005.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-54 009.heic", "KakaoTalk_Photo_2026-02-28-21-02-20 011.heic", "KakaoTalk_Photo_2026-02-28-21-01-30 023.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-28 009.heic", "KakaoTalk_Photo_2026-02-28-21-01-30 030.webp", "KakaoTalk_Photo_2026-02-28-21-01-29 013.webp", "KakaoTalk_Photo_2026-02-28-21-01-54 013.heic", "KakaoTalk_Photo_2026-02-28-21-01-29 017.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-10 006.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-54 012.heic", "KakaoTalk_Photo_2026-02-28-21-01-30 022.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-28 008.heic", "KakaoTalk_Photo_2026-02-28-21-02-20 010.heic", "KakaoTalk_Photo_2026-02-28-21-01-53 003.heic", "KakaoTalk_Photo_2026-02-28-21-01-54 008.heic", "KakaoTalk_Photo_2026-02-28-21-02-21 015.jpeg", "KakaoTalk_Photo_2026-02-28-21-02-19 004.jpeg", "KakaoTalk_Photo_2026-02-28-21-01-28 004.heic"];

    // 셔플 함수 (Fisher-Yates)
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    // 갤러리 렌더링 헬퍼 함수
    function renderGallery(galleryId, imagesArray, relativePath, useShuffle = false, limit = 0) {
        const galleryElement = document.getElementById(galleryId);
        if (!galleryElement) return;

        let workingArray = [...imagesArray];

        // 셔플 및 리미트 처리
        if (useShuffle) {
            workingArray = shuffle(workingArray);
        }
        if (limit > 0) {
            workingArray = workingArray.slice(0, limit);
        }

        let htmlContent = '';
        workingArray.forEach((imgName, index) => {
            htmlContent += `
                <div class="gallery-item">
                    <img src="${relativePath}${imgName}" alt="갤러리 사진 ${index + 1}" loading="lazy">
                </div>
            `;
        });

        galleryElement.innerHTML = htmlContent;
    }

    // 트레이닝(Our Moments) 렌더링 (전체)
    renderGallery('training-gallery', allTrainingImages, './images/training/');

    // 활동(Our Activities) 렌더링 (전체)
    renderGallery('activities-gallery', allActivityImages, './images/activities/');

    // 랜덤(More Moments) 렌더링 (8장 셔플)
    renderGallery('random-gallery', allRandomImages, './images/random/', true, 8);
});
