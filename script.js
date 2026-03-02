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
    const allTrainingImages = ["training_01.webp", "training_02.webp", "training_03.webp", "training_04.webp", "training_05.webp", "training_06.webp", "training_07.webp"];
    const allActivityImages = ["activity_01.webp", "activity_02.webp", "activity_03.webp", "activity_04.webp", "activity_05.webp", "activity_06.webp", "activity_07.webp"];
    const allRandomImages = ["random_01.webp", "random_02.webp", "random_03.webp", "random_04.webp", "random_05.webp", "random_06.webp", "random_07.webp", "random_08.webp", "random_09.webp", "random_10.webp", "random_11.webp", "random_12.webp", "random_13.webp", "random_14.webp", "random_15.webp", "random_16.webp", "random_17.webp", "random_18.webp", "random_19.webp", "random_20.webp", "random_21.webp", "random_22.webp", "random_23.webp", "random_24.webp", "random_25.webp", "random_26.webp", "random_27.webp", "random_28.webp", "random_29.webp", "random_30.webp", "random_31.webp", "random_32.webp", "random_33.webp", "random_34.webp", "random_35.webp", "random_36.webp", "random_37.webp", "random_38.webp", "random_39.webp", "random_40.webp", "random_41.webp", "random_42.webp", "random_43.webp", "random_44.webp", "random_45.webp", "random_46.webp", "random_47.webp", "random_48.webp", "random_49.webp", "random_50.webp", "random_51.webp", "random_52.webp", "random_53.webp", "random_54.webp", "random_55.webp", "random_56.webp", "random_57.webp", "random_58.webp", "random_59.webp", "random_60.webp", "random_61.webp", "random_62.webp", "random_63.webp", "random_64.webp", "random_65.webp", "random_66.webp", "random_67.webp", "random_68.webp", "random_69.webp", "random_70.webp", "random_71.webp", "random_72.webp", "random_73.webp", "random_74.webp", "random_75.webp"];

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
