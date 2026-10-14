# Ersione Design System v0.2

여러 개인 서비스가 공유하는 디자인 토큰, 공통 CSS, React 컴포넌트와 HTML 쇼케이스입니다.
기존 Ersione 심볼을 유지하며 Noto Sans KR, 블루/오렌지, 라이트/다크를 지원합니다.

## 현재 범위
- `tokens/tokens.json`: 디자인 토큰 원본
- `tokens/tokens.css`: JSON에서 생성한 CSS 변수
- `styles.css`: 프레임워크에 독립적인 `eds-*` 공통 클래스
- `src/react/index.tsx`: React 19용 기본 컴포넌트 (빌드 결과 `lib/react`)
- `docs/COMPONENTS.md`: 컴포넌트 목록, 크기와 상태
- `docs/USAGE.md`: 테마, 데이터 색상, 레이아웃, 접근성, 변경 규칙
- `showcase/index.html`: 동작 검토용 HTML
- `figma/state.json`: 같은 Figma 파일을 업데이트하기 위한 ID 기록
- `dist/`: 공유 사이트용 정적 파일. 실제 회사 데이터와 Company Lens 프로토타입 제외

## 실행
Node.js 20 이상에서 `npm run build`, `npm run check`, `npm run preview`.
토큰·쇼케이스 생성과 React JavaScript/타입 선언 빌드를 수행합니다. `npm test`는 서버 렌더링과 네이티브 폼 계약을 검사합니다.

## 설치 상태
v0.2는 공통 CSS와 React 기본 컴포넌트를 제공합니다. Git 설치에는 비공개 저장소 접근 권한이 필요합니다.
설치 시 `prepare`가 JavaScript와 타입 선언을 빌드합니다. 서비스에서는 검증한 커밋 SHA 또는 릴리스 태그를 고정하세요.

```bash
npm install git+ssh://git@github.com/ersione/ersione-design-system.git#<commit-sha>
```

```tsx
// Next.js root layout / React application entry
import "@ersione/design-system/styles.css";
import { Button, Input, Select, Badge, Metric, MetricPanel, Table, TableContainer } from "@ersione/design-system/react";

// Wrap your application; typography is explicitly owned by the application.
<body className="eds-theme" data-brand="blue" data-dark="false">
  <Button type="submit">검색</Button>
</body>
```

React는 peer dependency이며 번들에 포함하지 않습니다. React 소비자는 React 19를 설치해야 합니다.
바닐라 HTML은 동일한 CSS의 `eds-*` 클래스를 사용합니다. Vue 전용 래퍼와 바닐라 JS 동작 API는 아직 제공하지 않습니다.
색상 테마는 `.eds-theme` 또는 기존 쇼케이스의 `.app`에 적용됩니다.
전체 사용 예시와 상태 계약은 [패키지 사용법](docs/PACKAGE.md)을 참고하세요.

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
모든 family가 구현된 것은 아닙니다. React 제공 범위는 Button/Input/Select/Badge/Metric/MetricPanel/Table/TableContainer이며, Dialog/Tabs 등은 후속 구현 대상입니다.
Figma 생성 스크립트는 초기 생성용이며 반복 실행으로 기존 작업을 덮어쓰지 않습니다. 수정 시 state.json의 ID를 기준으로 대상만 업데이트합니다.

## Figma revision 2 (DRAFT)
Foundations / Components / Patterns & Applications were expanded in the existing file. Twenty Company Lens desktop frames cover search, results and details across four themes. Final typography clipping/overlap repair remains blocked by the Starter MCP call limit. See [revision notes](docs/FIGMA-REVISION-2.md). This is not a new package release or Sites publication.
