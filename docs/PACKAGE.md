# 패키지 사용법 (v0.2)

## 공통 원칙

토큰 JSON → 생성 CSS → 프레임워크 공통 CSS → React 래퍼 순서입니다.
색상과 형태를 프레임워크별로 복제하지 않습니다. 공통 CSS는 `eds-*` 클래스에만 적용되며 전역 reset과 글꼴 강제 지정이 없습니다.
폰트는 호스트 앱에서 Noto Sans KR로 설정합니다. 기존 앱의 폰트 로딩을 중복하지 마세요.
테마 루트에는 `class="eds-theme" data-brand="blue" data-dark="false"`를 지정합니다.
React는 `>=19 <20`이며 React 19의 ref prop을 그대로 전달합니다. 토큰/CSS만 쓰는 프로젝트에는 React 런타임이 필요하지 않습니다.

## React

```tsx
import '@ersione/design-system/styles.css';
import { Button, Input, Select, Badge, Metric, MetricPanel, Table, TableContainer } from '@ersione/design-system/react';

<form>
  <label htmlFor="company">회사명</label>
  <Input id="company" name="company" required aria-describedby="company-help" />
  <p id="company-help">회사명을 입력하세요.</p>
  <Select name="region" aria-label="지역"><option value="">전체 지역</option></Select>
  <Button type="submit" loading={false}>검색</Button>
</form>
<Badge tone="warning">과거 관측 자료</Badge>
<MetricPanel aria-label="주요 지표">
  <Metric label="가입자 수" value="1,280" unit="명" tone="people" description="기준월 가입자" />
  <Metric label="추정 연봉" value="6,240" unit="만원" tone="salary" />
</MetricPanel>
<TableContainer role="region" aria-label="월별 자료" tabIndex={0}>
  <Table><caption>월별 가입자 수</caption><thead><tr><th scope="col">월</th><th scope="col" data-numeric>가입자</th></tr></thead>
    <tbody><tr><th scope="row">8월</th><td data-numeric>1,280명</td></tr></tbody></Table>
</TableContainer>
```

- Button: `variant=primary|secondary|ghost|danger`, `size=sm|md|lg`, `loading`. 기본 type은 button. 제출 시 type=submit 명시. Loading은 disabled와 aria-busy를 설정하며 로딩 문구는 소비자가 제공합니다.
- Input/Select: `controlSize=sm|md|lg`. 네이티브 props, name/value/defaultValue/ref/event를 전달합니다. Input의 네이티브 size, Select의 네이티브 size/multiple과 시각 크기를 혼동하지 않습니다.
- Badge: `tone=neutral|success|warning|error`. 정적인 상태 라벨이며 자동 live region을 만들지 않습니다.
- Metric: `label`, `value`, 선택적 `unit`, `description`, `children`, `tone=neutral|salary|people|flow`. 데이터색은 성공/오류 의미가 아닙니다.
- MetricPanel: 직접 자식 Metric을 균등 배치하며 600px 이하에서 세로로 배치합니다. 앱의 정보 밀도에 따라 별도 className으로 조절할 수 있습니다.
- Table: 네이티브 table. caption/th/scope와 정렬은 소비자가 명시합니다. 숫자 셀에는 data-numeric. TableContainer는 가로 스크롤이 가능하며 키보드 접근이 필요하면 tabIndex와 영역 이름을 지정하세요.
- 모든 컴포넌트는 className과 해당 HTML 속성을 전달합니다. 폼 검증 설명, 라벨 연결과 앱 도메인 데이터는 소비자 책임입니다.
- React entry에는 hooks나 browser API가 없어 Next.js Server Component에서 사용 가능합니다. 이벤트 핸들러가 필요한 폼은 호스트의 Client Component에서 사용하세요. 전역 `use client` 경계를 강제하지 않습니다.

## 바닐라 HTML / Vue

```html
<link rel="stylesheet" href="./node_modules/@ersione/design-system/styles.css">
<div class="eds-theme" data-brand="orange" data-dark="false">
  <button type="button" class="eds-button eds-button--primary eds-control--md">저장</button>
  <label>회사명 <input class="eds-input eds-control--md" name="company"></label>
</div>
```

CSS 클래스는 지금 사용 가능합니다. 네이티브 버튼/입력/선택의 기본 동작 외 바닐라 JS 컨트롤러는 없습니다.
Vue에서는 같은 CSS 클래스를 사용할 수 있지만 Vue 컴포넌트 import API는 후속 범위입니다.
Dialog/Tabs 등 복잡한 인터랙션은 별도 접근성 검증 후 추가합니다.

## 업데이트

토큰/스타일/React 소스 수정 → npm run build → npm run check → npm test → 패키지 설치 검증 → 앱에서 Git SHA 갱신 → 앱 typecheck/build/browser 검증.
Git SHA를 고정해 기존 서비스가 디자인 변경을 자동으로 받지 않도록 합니다. API를 바꾸면 버전과 변경 기록을 함께 갱신합니다.
