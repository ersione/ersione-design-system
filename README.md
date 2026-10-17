# Ersione Design System v0.5.1

<img src="assets/favicon.svg" alt="Ersione 심볼" width="64" height="64">

개인 프로젝트에서 일관된 UI를 만드는 디자인 토큰, 공통 CSS, React 컴포넌트입니다.
블루·오렌지 브랜드와 라이트·다크 테마를 제공하며, Company Lens와 PogoAtlas의 공통 UI에 사용합니다.

![Version 0.5.1](https://img.shields.io/badge/version-0.5.1-blue)
![Node.js 20.11 이상](https://img.shields.io/badge/Node.js-%3E%3D20.11-339933)
![React 19](https://img.shields.io/badge/React-19-149ECA)

[쇼케이스](https://ersione-design-system.ersione.chatgpt.site/) · [React 데모](https://ersione-design-system.ersione.chatgpt.site/examples/react/) · [컬러 팔레트](https://ersione-design-system.ersione.chatgpt.site/docs/palette.html) · [패키지 문서](docs/PACKAGE.md) · [릴리스](https://github.com/ersione/ersione-design-system/releases/tag/v0.5.1)

[주요 기능](#주요-기능) · [설치](#설치) · [사용법](#사용법) · [개발](#개발) · [라이선스와-지원-범위](#라이선스와-지원-범위)

## 주요 기능

- **브랜드와 테마**: 블루·오렌지 × 라이트·다크의 네 가지 테마와 색상·간격·타이포그래피 토큰.
- **폼과 기본 UI**: Button, Input, Select, Textarea, Checkbox, Radio, Switch, Badge, Alert, Card, Table, Progress, Skeleton, Accordion, Pagination.
- **탐색과 상호작용**: Navigation / NavigationLink, Tabs, Dialog, Toast. NavigationLink는 `as`로 라우터 링크를 연결할 수 있습니다.
- **수치와 데이터 표시**: DataHighlight / HighlightPanel, DataPanel / DataBadge, Metric / MetricPanel. 수치·단위·보조 변화율과 관련 지표를 표현합니다.
- **선택형 팔레트**: blue, teal, orange, purple, rose, gray와 각 tint·subtle. 데이터별 색상 의미는 소비 프로젝트에서 정합니다.
- **차트 테마**: Canvas 차트에 적용할 색상·폰트·선·범례 설정을 읽고 테마 변경을 감지합니다. 차트 렌더링과 데이터 처리는 소비 앱에서 구현합니다.

컴포넌트별 속성과 동작은 [컴포넌트 목록](docs/COMPONENTS.md), 색상과 UI 역할은 [컬러 사용 기준](docs/COLORS.md)을 참고하세요.

## 요구사항

- Node.js **20.11 이상**, npm, Git.
- React 컴포넌트를 사용하는 앱: **React 19** (`>=19.0.0 <20`). CSS·토큰만 사용하면 React 런타임은 필요하지 않습니다.
- 로컬 정적 미리보기: Python 3.

## 설치

소비 프로젝트에서 GitHub 릴리스 태그를 지정해 설치합니다.

```bash
npm install github:ersione/ersione-design-system#v0.5.1
```

React 앱에 React가 없다면 `react@19`와 `react-dom@19`도 설치합니다.
Git 설치의 `prepare` 스크립트가 JavaScript와 타입 선언을 빌드합니다.
현재 0.x 버전으로 API와 스타일이 변경될 수 있으므로 검증한 태그 또는 커밋 SHA를 고정하세요.

## 사용법

### React

공통 스타일을 불러오고 테마 루트 안에서 컴포넌트를 사용합니다.

```tsx
import '@ersione/design-system/styles.css';
import {
  Navigation, NavigationLink, DataHighlight, HighlightPanel, Button,
} from '@ersione/design-system/react';

export function Overview() {
  return (
    <div className="eds-theme" data-brand="blue" data-dark="false">
      <Navigation aria-label="주 메뉴">
        <NavigationLink href="/" active>개요</NavigationLink>
        <NavigationLink href="/settings">설정</NavigationLink>
      </Navigation>
      <HighlightPanel>
        <DataHighlight tone="purple" size="lg" unit="명" secondary="+31.7%">
          83
        </DataHighlight>
      </HighlightPanel>
      <Button variant="secondary">취소</Button>
    </div>
  );
}
```

`data-brand`는 `blue` 또는 `orange`, `data-dark`는 `true` 또는 `false`로 설정합니다.
폰트 로딩과 전역 reset은 소비 앱에서 담당합니다. 기본 컴포넌트는 Server Component에서 사용할 수 있으며, Tabs·Dialog·Toast는 Client Component로 제공됩니다. 이벤트 핸들러를 전달하는 코드는 소비 앱의 Client Component에서 사용하세요.

### CSS와 토큰

바닐라 HTML과 Vue에서도 같은 CSS와 토큰을 사용할 수 있습니다.
Vue 전용 컴포넌트 래퍼와 바닐라 HTML용 Tabs·Dialog·Toast JavaScript 컨트롤러는 제공하지 않습니다.

```css
@import '@ersione/design-system/styles.css';
```

```html
<div class="eds-theme" data-brand="orange" data-dark="false">
  <button type="button" class="eds-button eds-button--primary eds-control--md">
    저장
  </button>
</div>
```

| 패키지 경로 | 용도 |
| --- | --- |
| `@ersione/design-system/styles.css` | 토큰을 포함한 공통 컴포넌트 스타일 |
| `@ersione/design-system/tokens.css` | CSS 변수만 사용 |
| `@ersione/design-system/tokens.json` | 디자인 토큰 원본 |
| `@ersione/design-system/react` | React 컴포넌트와 타입 |
| `@ersione/design-system/charts` | `readChartTheme(element)`, `observeChartTheme(element, callback)` |
| `@ersione/design-system/symbol.svg` | Ersione 심볼 |

상세 예시는 [패키지 사용법](docs/PACKAGE.md)과 [사용 규칙](docs/USAGE.md)을 참고하세요.

### 업데이트

새 릴리스를 적용하려면 설치 명령의 태그를 해당 버전으로 바꿉니다.
소비 앱의 관련 테스트와 빌드·화면을 확인하고 `package.json`과 `package-lock.json`을 함께 갱신하세요.
패키지를 설치하는 것만으로 배포된 앱이 업데이트되지는 않습니다.

## 개발

```bash
git clone https://github.com/ersione/ersione-design-system.git
cd ersione-design-system
npm ci
npm run build:site
python3 -m http.server 8766 --bind 127.0.0.1 --directory dist
```

브라우저에서 `http://127.0.0.1:8766`을 열어 쇼케이스를 확인합니다.
React 데모는 `/examples/react/`, 팔레트는 `/docs/palette.html`에 있습니다.

| 명령 | 용도 |
| --- | --- |
| `npm run build` | 토큰 CSS·정적 쇼케이스·React JavaScript와 타입 선언 생성 |
| `npm run build:playground` | 패키지 소스를 사용하는 React 데모 생성 |
| `npm run build:site` | 공개 정적 산출물과 React 데모 생성 |
| `npm run check` | 테마 대비·README 버전·정적 파일과 스크립트 검사 |
| `npm test` | SSR·폼·컴포넌트 계약 검사 |
| `npm run test:browser` | 키보드·포커스·테마·320/390/1280px 화면 검사 |

브라우저 검사를 처음 실행할 때는 `npx playwright install chromium`이 필요합니다.

토큰 원본은 `tokens/tokens.json`, 공통 스타일은 `styles.css`, React 소스는 `src/react/`에 있습니다.
`lib/react/`는 패키지 빌드 결과이며, `dist/`는 정적 쇼케이스 배포용 결과입니다.
정적 호스팅에는 `npm run build:site`로 생성한 `dist/`를 사용합니다.

[Figma 디자인 파일](https://www.figma.com/design/TfjaDsg9mQb5CF5SB6hcFL)은 초기 디자인과 응용 프레임을 제공합니다. 코드와 자동으로 양방향 동기화되지는 않습니다.
버전별 변경은 [변경 기록](docs/CHANGELOG.md)에서 확인할 수 있습니다.

## 라이선스와 지원 범위

패키지 라이선스 표기는 `UNLICENSED`이며, 소스 공개만으로 자유로운 재사용 권한을 부여하지 않습니다.
쇼케이스에 포함된 Noto Sans KR 폰트에는 별도의 [SIL Open Font License 1.1](assets/OFL-Noto-Sans-KR.txt)이 적용됩니다.

개인 프로젝트의 공통 UI를 위한 저장소이며, 외부 프로젝트의 요구사항 대응이나 장기 호환성 지원을 보장하지 않습니다.
