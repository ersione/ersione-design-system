# 컴포넌트 목록

- **Button**: S/M/L; primary, secondary, ghost, danger; default, hover, focus, disabled, loading
- **Input**: M; default, focus, required, invalid, disabled
- **Textarea**: M; resize vertically
- **Checkbox**: 20px; checked, unchecked, disabled, focus
- **Radio**: 20px; selected, unselected, disabled, focus
- **Switch**: 44x26; on, off, disabled, focus
- **Select**: M; closed, open, selected, disabled option, invalid, keyboard
- **Badge**: status or information, 12px label
- **Alert**: success, warning, error, information
- **Tabs**: selected, unselected, keyboard
- **Dialog**: open, closed, dismiss, focus return
- **Toast**: non-blocking message
- **Progress**: determinate, textual value
- **Skeleton**: static loading placeholder
- **Accordion**: expanded, collapsed
- **Pagination**: previous/next, boundaries
- **Card**: content surface; optional elevation
- **Table**: numeric alignment, headers, empty result
- **Metric**: salary, people, flow highlights
- **MetricPanel**: cards or unified; S/M/L is not required

React v0.2는 위 20개 계열과 TableContainer를 제공합니다. Input과 Select는 sm/md/lg 시각 크기를 지원하고, Textarea/Checkbox/Radio/Switch 등은 용도에 맞는 크기를 유지합니다. API와 접근성 책임은 [PACKAGE.md](PACKAGE.md)를 참고하세요.

## v0.3 공통 메뉴·수치·차트

Navigation / NavigationLink: sm/md/lg, 선택적 아이콘, active → aria-current=page. Next 등의 라우터는 as={Link}로 연결하고 경로 매칭은 호스트에서 처리합니다. 일반 페이지 링크이므로 탭 키로 이동하며 ARIA tablist를 사용하지 않습니다. 모바일은 가로 스크롤합니다.
DataHighlight: sm/md/lg, 단위·보조 변화율, 자료 없음 muted 상태. HighlightPanel은 흰색/다크 표면과 상단 강조선을 제공합니다.
색상은 팔레트(blue/teal/amber/purple/rose), 공통 UI 역할(primary/neutral/danger/success/warning), 프로젝트별 데이터 매핑으로 구분합니다. 특정 지표와 색을 전역으로 고정하지 않습니다. 상세 규칙은 COLORS.md를 참고하세요.
`@ersione/design-system/charts`의 readChartTheme(element)는 현재 테마의 색상·5개 범주 팔레트·폰트·선·범례 설정을 반환합니다. observeChartTheme(element, callback)는 상위 data-brand/data-dark/class/style 변경을 반영하며 반환한 정리 함수를 언마운트 시 호출해야 합니다. Chart.js 등은 호스트 의존성입니다. 축 단위·툴팁 숫자 포맷·누락 데이터 처리는 호스트가 책임집니다.
CSS 클래스와 tokens.css는 바닐라/Vue에서도 동일하게 사용 가능합니다.

## v0.4 자유 팔레트와 프로젝트별 매핑
DataHighlight / HighlightPanel의 tone은 primary, neutral 또는 blue/teal/amber/purple/rose 중 선택할 수 있습니다. ChartTheme.palette도 같은 이름을 제공합니다. 인원·급여 같은 도메인 규칙은 호스트가 정하며 기존 DataTone 별칭은 이전 소비자 호환용입니다. 취소/닫기는 보조 동작, 삭제 등 위험한 동작은 danger로 구분합니다.
