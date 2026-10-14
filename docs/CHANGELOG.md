# 변경 기록

## 0.2.1 — 2026-10-14
Select의 펼친 목록에 공통 토큰과 선택·포커스·비활성 스타일 적용. 네이티브 폼 동작과 비지원 브라우저 fallback 유지. 네 가지 테마 및 pointer/Home/End/Enter/Escape 검사 추가.

## 0.2.0 — 2026-10-14
공통 `eds-*` CSS, `.eds-theme` 테마 루트, React 19 컴포넌트 20개 계열 및 타입 선언. 버튼/입력/선택 크기, 상태, 모달 초기 포커스·Escape·포커스 복귀, 탭 키보드 이동과 페이지 경계 지원. Git 설치 시 prepare 빌드, SSR/폼 및 브라우저 테스트와 CI 추가. Vue 래퍼와 바닐라 JS 컨트롤러는 미제공.

## 0.1.0 — 2026-10-14
브랜드/테마/데이터 토큰, 컴포넌트 명세, 카드/통합 패널, HTML 쇼케이스, Figma 초기 파일.

## v0.3 공통 메뉴·수치·차트

Navigation / NavigationLink: sm/md/lg, 선택적 아이콘, active → aria-current=page. Next 등의 라우터는 as={Link}로 연결하고 경로 매칭은 호스트에서 처리합니다. 일반 페이지 링크이므로 탭 키로 이동하며 ARIA tablist를 사용하지 않습니다. 모바일은 가로 스크롤합니다.
DataHighlight: sm/md/lg, 단위·보조 변화율, 자료 없음 muted 상태. HighlightPanel은 흰색/다크 표면과 상단 강조선을 제공합니다.
색상 역할: primary=주요 강조, people=인원·규모(블루), salary=금액(틸), joiners=취득(틸), departures=상실(앰버), flow=변동. 증가·감소는 부호/문구로 표시하며 오류·성공 색상과 구별합니다.
`@ersione/design-system/charts`의 readChartTheme(element)는 현재 테마의 색상·5개 범주 팔레트·폰트·선·범례 설정을 반환합니다. observeChartTheme(element, callback)는 상위 data-brand/data-dark/class/style 변경을 반영하며 반환한 정리 함수를 언마운트 시 호출해야 합니다. Chart.js 등은 호스트 의존성입니다. 축 단위·툴팁 숫자 포맷·누락 데이터 처리는 호스트가 책임집니다.
CSS 클래스와 tokens.css는 바닐라/Vue에서도 동일하게 사용 가능합니다.

### v0.3.1
Canvas 크기 조정 등 색상과 무관한 style 변경은 테마 갱신에서 제외하여 차트가 반복 생성되지 않도록 했습니다.
