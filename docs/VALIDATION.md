# v0.1 검증 기록 — 2026-10-14

- JSON → CSS 4개 테마 생성 및 로컬 링크/인라인 JS 구문 검사 통과.
- 주요 텍스트, 액션 버튼 글자, 상태·데이터 강조색 대비 조합 4.5:1 이상 검사 통과.
- 쇼케이스의 테마 전환·통합 패널 전환을 브라우저에서 확인.
- Figma 3페이지 / 178개 변수(56 primitive + 122 semantic/geometry), 텍스트 스타일 7개, 효과 스타일 2개.
- Figma 80개 테마별 컴포넌트 세트, 284개 variant 컴포넌트, 지표 패턴 원본 8개, 인스턴스 예시 116개.
- Figma 적용 예시 및 선택 라디오의 마커 정렬을 시각 검토하고 수정.
- Sites 버전 1 공개 배포 성공 및 공개 URL 렌더링 확인.
- React 구현, 전체 컴포넌트 상태 매트릭스, 전체 스크린리더/모바일 접근성 검증은 완료 범위가 아님.

## v0.2 React / 공통 CSS — 2026-10-14

- 20개 컴포넌트 계열 + TableContainer, JavaScript/타입 선언 빌드 통과.
- 토큰·상태·데이터·액션 대비 검사 통과.
- 서버 렌더링/네이티브 폼/경계 조건 테스트 6개 통과.
- Chromium 브라우저 테스트 7개 통과: 탭 키보드 이동·disabled 건너뛰기, Dialog 초기 포커스/순환/Escape/복귀, Toast 닫기, 로딩 중 중복 제출 방지, Pagination 경계, 폼 컨트롤·아코디언, 320/390/1280px 네 테마 overflow 검사.
- React 검토 화면 `examples/react/`. 생성된 번들과 브라우저 스크린샷은 Git에 포함하지 않음.
- npm 패키지에는 런타임 JavaScript/타입/CSS/토큰/심볼/문서만 포함. 쇼케이스의 대용량 글꼴과 가상 서비스 예시는 제외.
- Firefox/Safari 및 전체 스크린리더 인증, Vue 래퍼와 바닐라 JS API는 완료 범위가 아님.

## v0.2.1 — 2026-10-14

- 셀렉트의 펼친 목록 공통 테마·선택·disabled 스타일 추가.
- Chromium 브라우저 검사 8개 통과. 네 가지 popup 테마, pointer 선택, Home/End/Enter/Escape 및 포커스 복귀 포함.
- 비지원 브라우저와 multiple/size 목록은 기본 picker로 유지. 브라우저 전용 JavaScript를 추가하지 않음.


## v0.5 공개 쇼케이스·색상 정리 — 2026-10-14

- 홈페이지에 Navigation / NavigationLink, SM/MD/LG 선택, 현재 메뉴, 수치 강조색·크기·보조 변화율과 팔레트 추가.
- 실제 React playground를 공개 dist/examples/react에 번들링하고 팔레트·문서 링크 검증.
- README·패키지 문서 갱신, package.json과 README 버전 일치 검사. 홈페이지/React 예제 버전은 package.json에서 생성.
- 네 테마 및 320/390/1280px 브라우저 시나리오 13개 통과(공개 산출물 검사 2개 포함). SSR 검사 8개와 색상 대비/정적 파일 검사를 수행.
- 기존 갈색 골드를 오렌지로 조정하고 amber 토큰·CSS·타입·차트 API를 제거.
- Company Lens의 중복 통계 메뉴 제거 및 고용 변화 강조색을 퍼플로 매핑. 서비스 배포 검증은 해당 저장소 docs/design-system.md에서 관리.
