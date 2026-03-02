# 🥋 KAU Jiu-Jitsu Landing Page

한국항공대학교 주짓수 동아리 신입 부원 모집을 위한 모바일 체험형 랜딩 페이지입니다.

- **프로젝트 URL**: [leechan7942/kau-jiujitsu](https://github.com/leechan7942/kau-jiujitsu)
- **배포 사이트**: [https://leechan7942.github.io/kau-jiujitsu/](https://leechan7942.github.io/kau-jiujitsu/)

## 🚀 주요 기능
- 모바일 최적화 레이아웃
- 히어로 섹션 (대표 이미지 및 문구)
- 오픈카톡 QR 및 인스타그램 링크 연동
- 활동 갤러리 (랜덤 사진 렌더링 포함)

---

## 📝 최근 변경 사항

### 2026-03-02
- **Image Optimization & Compatibility**: "Our Moments" 및 "More Moments" 섹션의 갤러리 이미지 포맷 일괄 최적화 진행.
  - 모든 `.heic` 및 기존 이미지 파일을 `.webp` 형태로 일괄 변환 (총 82장 처리)하여 타 브라우저(Chrome, Edge 등) 교차 지원 도모 및 로딩 속도 향상.
  - URL 인코딩 이슈 및 관리 효율성을 고려하여 영문/숫자 기반의 간결한 파일명(예: `training_01.webp`, `random_01.webp`)으로 일괄 리네이밍 폴더 구조 적용.
  - `script.js` 내 파일 리스트 동기화 및 `index.html` 내 스크립트 캐시 클리어(`?v=26030201`) 적용.

### 2026-03-01
- **UI/UX Optimization (Benefit Cards)**: '입문자 완벽 적응' 및 '글로벌 교류 환경' 카드 제목의 폰트 크기를 미세 축소(1.2rem → 1.1rem)하여 레이아웃 균형 개선.
- **글씨 크기 조정 (Hero)**: 메인 히어로 타이틀 ("매트 위에서 증명하는 나의 한계")의 폰트 크기를 `2.8rem`에서 `2.5rem`으로 축소하여 모바일 화면에서의 시각적 균형 및 가독성 개선.
- **레이아웃 수정**: 타이틀 및 하단 CTA 섹션("한계를<br>극복할")의 줄바꿈을 조정하여 모바일 가독성 최적화.

---

&copy; 2026 KAU Jiu-Jitsu Club.
