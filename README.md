# Ersione Design System v0.1

여러 개인 서비스가 공유하는 디자인 토큰, 컴포넌트 명세와 인터랙티브 HTML 쇼케이스입니다.
기존 Ersione 심볼을 유지하며 Noto Sans KR, 블루/오렌지, 라이트/다크를 지원합니다.

## 현재 범위
- `tokens/tokens.json`: 디자인 토큰 원본
- `tokens/tokens.css`: JSON에서 생성한 CSS 변수
- `docs/COMPONENTS.md`: 컴포넌트 목록, 크기와 상태
- `docs/USAGE.md`: 테마, 데이터 색상, 레이아웃, 접근성, 변경 규칙
- `showcase/index.html`: 동작 검토용 HTML
- `figma/state.json`: 같은 Figma 파일을 업데이트하기 위한 ID 기록
- `dist/`: 공유 사이트용 정적 파일. 실제 회사 데이터와 Company Lens 프로토타입 제외

## 실행
Node.js 20 이상에서 `npm run build`, `npm run check`, `npm run preview`.
외부 의존성 없이 토큰 생성과 정적 패키징을 수행합니다.

## 설치 상태
v0.1은 토큰·명세 릴리스입니다. React 라이브러리와 전체 바닐라 컴포넌트 API는 아직 계획 단계입니다.
Git 설치로 토큰 CSS/JSON을 사용할 수 있지만 `Button` 등의 React export는 아직 없습니다.
`npm install git+https://github.com/ersione/ersione-design-system.git#v0.1.0` (비공개 저장소 접근 권한 필요)
CSS: `@ersione/design-system/tokens.css` / JSON: `@ersione/design-system/tokens.json`.
Noto Sans KR 파일은 쇼케이스에 로컬 제공하며 SIL OFL 1.1 라이선스를 함께 보관합니다.

## Figma
https://www.figma.com/design/TfjaDsg9mQb5CF5SB6hcFL
무료 플랜을 고려하여 Foundations / Components / Applications 3페이지를 사용합니다.
멀티 모드 대신 테마별 단일 모드 컬렉션과 Variant로 표현합니다.
코드와 Figma는 자동 양방향 동기화되지 않습니다. 토큰을 원본으로 두고 ID를 보존하여 변경을 반영합니다.

## 변경
토큰 변경 → `npm run build` → 쇼케이스 네 테마 확인 → Figma 기존 노드 업데이트 → 버전 태그.
GitHub 저장소는 비공개이며 공개 Sites에는 디자인 검토용 파일만 게시합니다.

## 공유 링크
- 공개 쇼케이스: https://ersione-design-system.ersione.chatgpt.site
- 비공개 GitHub: https://github.com/ersione/ersione-design-system

Figma 초기 명세: 80개 테마별 컴포넌트 세트 / 284개 variant 컴포넌트와 8개 지표 패턴 원본.
모든 family가 완성된 생산용 컴포넌트를 뜻하지 않습니다. Dialog/Table/Tabs 등 일부는 초기 시각 명세이며, 전체 상태·프로토타입 동작·React API는 후속 구현 대상입니다.
Figma 생성 스크립트는 초기 생성용이며 반복 실행으로 기존 작업을 덮어쓰지 않습니다. 수정 시 state.json의 ID를 기준으로 대상만 업데이트합니다.
