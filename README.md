# Ersione Design System v0.5.1

개인 프로젝트에서 함께 사용하는 디자인 토큰, 공통 CSS, React 컴포넌트와 시각 쇼케이스입니다.
Ersione 심볼과 Noto Sans KR, 블루/오렌지 브랜드, 라이트/다크 테마를 지원합니다.

Company Lens와 PogoAtlas의 공통 UI를 관리하며, 실제 서비스에서 필요한 기능을 중심으로 다듬고 있습니다.
현재 0.x 버전으로 API와 스타일이 변경될 수 있으므로 소비 프로젝트에서는 검증한 릴리스 태그를 고정합니다.

## 미리보기

- [공개 쇼케이스 — 메뉴·수치 강조](https://ersione-design-system.ersione.chatgpt.site/#shared-components)
- [React 컴포넌트 — 실제 패키지 소스로 동작](https://ersione-design-system.ersione.chatgpt.site/examples/react/)
- [컬러 팔레트·UI 역할·차트](https://ersione-design-system.ersione.chatgpt.site/docs/palette.html)
- [사용 규칙](https://ersione-design-system.ersione.chatgpt.site/docs/usage.html)

## 제공 기능

- **Navigation / NavigationLink**: S/M/L, 선택적 아이콘, 현재 메뉴 표시, 키보드 포커스. Next 등 라우터는 `as={Link}`로 연결합니다.
- **DataHighlight / HighlightPanel**: S/M/L 수치 강조, 단위·보조 변화율, 자료 없음 상태, 관련 지표를 묶는 표면.
- **컬러 팔레트**: blue/teal/orange/purple/rose/gray와 각 tint·subtle. 특정 색을 인원·급여 등에 전역으로 고정하지 않습니다.
- **공통 UI 역할**: primary, secondary/neutral, danger/error, success, warning. 취소·닫기는 보조 동작, 삭제 등 위험한 동작은 danger로 구분합니다.
- **Canvas 차트 테마**: named palette·범주 팔레트, 폰트·선·그리드·범례·툴팁 설정, 테마 변경 감지. 차트 라이브러리와 데이터 처리는 호스트가 담당합니다.
- **DataPanel / DataBadge**: 아주 연한 영역 배경과 연한 배지 배경을 분리하고 DataHighlight로 숫자를 강조합니다. S/M/L, 여섯 색, 라이트/다크 지원.
- **기본 컴포넌트**: Button, Input, Select, Textarea, Checkbox, Radio, Switch, Badge, Alert, Tabs, Dialog, Toast, Progress, Skeleton, Accordion, Pagination, Card, Metric, MetricPanel, Table / TableContainer.

기존 `data-people/salary/flow` 등의 별칭은 이전 소비자 호환을 위해 유지합니다. 새 프로젝트에서는 이름 기반 팔레트를 고르고 데이터 매핑을 프로젝트 안에 둡니다. [컬러 사용 기준](docs/COLORS.md)

## 설치와 사용

Node.js 20.11 이상. 공개 GitHub 저장소에서 설치하며 React 소비자는 React 19를 설치해야 합니다.
Git 설치의 `prepare`가 JavaScript와 타입 선언을 빌드합니다. 검증한 SHA 또는 릴리스 태그를 고정하세요.

```bash
npm install github:ersione/ersione-design-system#v0.5.1
```

### 소비 프로젝트 업데이트

Company Lens와 PogoAtlas는 현재 `v0.5.1` 태그에 고정되어 있습니다. 인자 없이 `npm install`을 다시 실행하면 같은 버전을 설치하므로, 업데이트할 새 릴리스 태그나 SHA를 명시합니다.
예를 들어 디자인 시스템의 `v0.5.2` 태그를 생성하고 push한 다음 Company Lens에서 실행합니다. 아래 버전은 다음 릴리스 예시입니다.

```bash
npm install github:ersione/ersione-design-system#v0.5.2
npm run typecheck
npm run build
```

관련 테스트와 화면을 확인하고 `package.json`, `package-lock.json`을 함께 커밋한 뒤 앱을 배포합니다. 패키지 설치만으로 운영 사이트가 바뀌지는 않습니다.
기존 릴리스 태그를 다른 커밋으로 이동하지 않습니다.

### 버전 운영 기준

- 현재 디자인 시스템 버전은 `0.5.1`입니다. 기존 버전과 태그는 유지합니다.
- 일반적인 스타일 조정, 버그 수정과 호환되는 소규모 개선은 마지막 자리만 올립니다: `0.5.0` → `0.5.1` → `0.5.2`.
- 매 작업마다 가운데 자리를 올리지 않습니다. 큰 기능 묶음이나 호환성 변경이 필요할 때 별도로 결정하고 변경 기록에 설명합니다.
- 문서·공개 예제만 수정하고 소비 패키지 동작이 바뀌지 않으면 패키지 버전을 올리지 않아도 됩니다.

Git 태그는 코드의 특정 시점을 고정하고, GitHub 릴리스는 그 태그에 설명과 다운로드를 붙입니다. 첫 릴리스는 현재 제공 기능·설치·제약을 정리하며, 이후 릴리스는 직전 릴리스 태그부터 새 태그까지의 의미 있는 변경·수정·업데이트 방법을 묶습니다. 중간 태그마다 릴리스를 만들 필요는 없습니다. 소스 아카이브는 해당 태그의 전체 코드이고 릴리스 설명은 변경 요약입니다.

[첫 릴리스 v0.5.1](https://github.com/ersione/ersione-design-system/releases/tag/v0.5.1) · [릴리스 설명 원본](docs/releases/v0.5.1.md)

```tsx
import '@ersione/design-system/styles.css';
import { Navigation, NavigationLink, DataHighlight, HighlightPanel, Button } from '@ersione/design-system/react';

<div className="eds-theme" data-brand="blue" data-dark="false">
  <Navigation aria-label="주 메뉴">
    <NavigationLink href="/" active>개요</NavigationLink>
    <NavigationLink href="/settings">설정</NavigationLink>
  </Navigation>
  <HighlightPanel>
    <DataHighlight tone="purple" size="lg" unit="명" secondary="+31.7%">83</DataHighlight>
  </HighlightPanel>
  <Button variant="secondary">취소</Button>
</div>
```

- 색상 조합: `palette-{color}`는 기본색, `-tint`는 연한색, `-subtle`은 더 옅은색입니다. DataPanel에는 subtle, DataBadge에는 tint를 사용하며 의미는 프로젝트가 정합니다.
- 차트: `@ersione/design-system/charts`의 `readChartTheme(element)`, `observeChartTheme(element, callback)`.
- 토큰: `@ersione/design-system/tokens.css`, `@ersione/design-system/tokens.json`.
- 심볼: `@ersione/design-system/symbol.svg`.
- React는 peer dependency입니다. 바닐라 HTML과 Vue는 동일한 CSS·토큰을 사용할 수 있으며, Vue 전용 컴포넌트 래퍼는 아직 제공하지 않습니다.
- 폰트 로딩과 전역 reset은 소비 앱이 담당합니다. 공개 쇼케이스에는 로컬 Noto Sans KR와 SIL OFL 1.1 라이선스를 제공합니다.

상세 API와 동작 계약은 [패키지 사용법](docs/PACKAGE.md), [컴포넌트 목록](docs/COMPONENTS.md), [사용 규칙](docs/USAGE.md)을 참고하세요.

## 개발과 검증

```bash
npm install
npm run build          # 토큰 CSS + 정적 쇼케이스 + React JS/타입 선언
npm run check          # 네 테마 대비, 문서 버전, 정적 파일/스크립트 검사
npm test               # SSR·폼·컴포넌트 계약
npm run test:browser   # 키보드·포커스·테마·320/390/1280px
npm run build:site     # 공개 배포용 dist + 실제 React playground
npm run preview        # http://127.0.0.1:8766
```

최초 브라우저 검사에는 `npx playwright install chromium`이 필요합니다.
`npm run build:playground` 후 저장소 루트 서버의 `/examples/react/`에서도 React 예제를 검토할 수 있습니다.
버전 변경 시 README 제목도 갱신해야 하며 `npm run check`가 package.json과 일치하는지 확인합니다. 쇼케이스 버전 표시는 빌드 시 package.json에서 생성합니다.

## 구조와 배포

- `tokens/tokens.json`: 토큰 원본. `tokens/tokens.css`는 생성 결과.
- `styles.css`, `src/react/`: 공통 스타일과 React 소스. `lib/react`는 생성 결과.
- `showcase/index.html`, `examples/react/`, `docs/palette.html`: 공개 검토 화면.
- `dist/`: `build:site`가 만드는 공개 정적 산출물. 서비스의 실제 데이터·비밀정보·프로토타입은 게시하지 않습니다.
- `.openai/hosting.json`: 기존 Sites 프로젝트 ID와 정적 디렉터리. 새 사이트를 만들지 않고 기존 사이트에 배포합니다.

토큰/컴포넌트 변경 → build·check·test·브라우저 검증 → Git push·버전 고정 → 소비 앱 설치·빌드·배포.
공개 쇼케이스 변경은 `build:site` 후 Sites에 별도로 배포해야 합니다. Git push나 npm 패키지 갱신만으로 공개 사이트가 바뀌지는 않습니다.

## Figma와 변경 기록

[Figma 디자인 파일](https://www.figma.com/design/TfjaDsg9mQb5CF5SB6hcFL)은 초기 디자인과 응용 프레임을 보관합니다.
코드와 자동으로 양방향 동기화되지 않으며, 현재 코드의 메뉴·하이라이트·팔레트 구현이 Figma 전체에 반영됐다는 뜻은 아닙니다.
기존 ID는 `figma/state.json`에 보관하고, 과거 revision 2 상태는 [해당 기록](docs/FIGMA-REVISION-2.md)을 참고하세요.

[변경 기록](docs/CHANGELOG.md) · [검증 기록](docs/VALIDATION.md) · [GitHub 저장소](https://github.com/ersione/ersione-design-system)

## 라이선스와 지원 범위

패키지의 라이선스 표기는 기존과 동일하게 `UNLICENSED`입니다. 소스 공개는 자유로운 재사용 라이선스를 부여한다는 뜻이 아닙니다.
포함된 Noto Sans KR 폰트에는 별도의 [SIL Open Font License 1.1](assets/OFL-Noto-Sans-KR.txt)이 적용됩니다.

개인 프로젝트의 공통 UI를 위한 저장소이며, 외부 프로젝트의 요구사항 대응이나 장기 호환성 지원을 보장하지 않습니다.
