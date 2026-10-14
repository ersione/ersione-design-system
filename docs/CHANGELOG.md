## 0.5.1

- 기존 기본색 유지, gray 및 모든 색의 subtle 단계 추가.
- DataPanel / DataBadge로 아주 연한 영역과 연한 수치 배지 조합 제공.
- 공개 쇼케이스·React 예제·팔레트에 여섯 색과 세 농도 예시 추가.

# 변경 기록

## 0.5.0 — 2026-10-14
- 공개 사이트에 공통 메뉴·수치 강조·팔레트 및 실제 React playground 추가.
- README·사용법을 현재 버전에 맞추고 문서 버전 일치 검사 추가.
- 갈색에 가까운 골드 팔레트를 선명한 오렌지로 조정. orange 토큰/tone 사용. 기존 amber 별칭은 제거.


## 0.2.1 — 2026-10-14
Select의 펼친 목록에 공통 토큰과 선택·포커스·비활성 스타일 적용. 네이티브 폼 동작과 비지원 브라우저 fallback 유지. 네 가지 테마 및 pointer/Home/End/Enter/Escape 검사 추가.

## 0.2.0 — 2026-10-14
공통 `eds-*` CSS, `.eds-theme` 테마 루트, React 19 컴포넌트 20개 계열 및 타입 선언. 버튼/입력/선택 크기, 상태, 모달 초기 포커스·Escape·포커스 복귀, 탭 키보드 이동과 페이지 경계 지원. Git 설치 시 prepare 빌드, SSR/폼 및 브라우저 테스트와 CI 추가. Vue 래퍼와 바닐라 JS 컨트롤러는 미제공.

## 0.1.0 — 2026-10-14
브랜드/테마/데이터 토큰, 컴포넌트 명세, 카드/통합 패널, HTML 쇼케이스, Figma 초기 파일.

## v0.3 공통 메뉴·수치·차트

Navigation / NavigationLink: sm/md/lg, 선택적 아이콘, active → aria-current=page. Next 등의 라우터는 as={Link}로 연결하고 경로 매칭은 호스트에서 처리합니다. 일반 페이지 링크이므로 탭 키로 이동하며 ARIA tablist를 사용하지 않습니다. 모바일은 가로 스크롤합니다.
DataHighlight: sm/md/lg, 단위·보조 변화율, 자료 없음 muted 상태. HighlightPanel은 흰색/다크 표면과 상단 강조선을 제공합니다.
색상은 팔레트(blue/teal/orange/purple/rose), 공통 UI 역할(primary/neutral/danger/success/warning), 프로젝트별 데이터 매핑으로 구분합니다. 특정 지표와 색을 전역으로 고정하지 않습니다. 상세 규칙은 COLORS.md를 참고하세요.
`@ersione/design-system/charts`의 readChartTheme(element)는 현재 테마의 색상·5개 범주 팔레트·폰트·선·범례 설정을 반환합니다. observeChartTheme(element, callback)는 상위 data-brand/data-dark/class/style 변경을 반영하며 반환한 정리 함수를 언마운트 시 호출해야 합니다. Chart.js 등은 호스트 의존성입니다. 축 단위·툴팁 숫자 포맷·누락 데이터 처리는 호스트가 책임집니다.
CSS 클래스와 tokens.css는 바닐라/Vue에서도 동일하게 사용 가능합니다.

### v0.3.1
Canvas 크기 조정 등 색상과 무관한 style 변경은 테마 갱신에서 제외하여 차트가 반복 생성되지 않도록 했습니다.

## v0.4 자유 팔레트와 프로젝트별 매핑
DataHighlight / HighlightPanel의 tone은 primary, neutral 또는 blue/teal/orange/purple/rose 중 선택할 수 있습니다. ChartTheme.palette도 같은 이름을 제공합니다. 인원·급여 같은 도메인 규칙은 호스트가 정하며 기존 DataTone 별칭은 이전 소비자 호환용입니다. 취소/닫기는 보조 동작, 삭제 등 위험한 동작은 danger로 구분합니다.
