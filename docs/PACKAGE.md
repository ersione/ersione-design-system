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
- 기본 컴포넌트는 hooks/browser API 없이 Server Component에서 사용할 수 있습니다. Tabs/Dialog/Toast는 별도 `use client` 모듈로 분리해 빌드합니다. 이벤트 핸들러를 전달하는 폼·인터랙션은 호스트의 Client Component에서 사용하세요. 패키지 전체에 `use client` 경계를 강제하지 않습니다.

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
Dialog/Tabs/Toast의 React 동작은 제공하지만, 바닐라 HTML용 JavaScript 동작은 자동으로 붙지 않습니다.

## 업데이트

토큰/스타일/React 소스 수정 → npm run build → npm run check → npm test → 패키지 설치 검증 → 앱에서 Git SHA 갱신 → 앱 typecheck/build/browser 검증.
Git SHA를 고정해 기존 서비스가 디자인 변경을 자동으로 받지 않도록 합니다. API를 바꾸면 버전과 변경 기록을 함께 갱신합니다.

## 추가 React 컴포넌트

- Textarea: 네이티브 props, 세로 resize, required/invalid/disabled. 라벨과 오류 설명을 연결하세요.
- Checkbox/Radio/Switch: 네이티브 input의 checked/defaultChecked/onChange/name/value/disabled/ref를 전달합니다. Radio는 같은 name으로 그룹화하고 fieldset/legend를 사용합니다. Switch는 role=switch입니다. 라벨을 포함해 최소 44px 터치 영역을 제공하세요.
- Alert: `tone`, `heading`, children. 정적 설명에는 live region을 강제하지 않습니다. 동적 오류는 소비자가 role=alert, 일반 알림은 role=status를 명시하세요.
- Card: `padding=sm|md|lg` (16/24/32px), `elevated`. 정보 구조에 따라 패널·표·본문을 선택하고 모든 콘텐츠를 카드로 감싸지 마세요.
- Progress: `label`, `value`, `max`, `valueText`. value를 생략하면 진행 정도를 알 수 없는 상태입니다.
- Skeleton: 장식용 정적 placeholder. style로 폭/높이를 조절하고, 부모 콘텐츠 영역에 aria-busy와 읽을 수 있는 로딩 설명을 제공합니다.
- Accordion: `heading`, children 및 네이티브 details props. open/onToggle/name을 전달할 수 있습니다.
- Pagination: `page`, `totalPages`, `onPageChange`. 첫/마지막 페이지의 버튼을 비활성화합니다. URL 이동 시 `previous`/`next`에 호스트 링크를 전달할 수 있습니다. 1-based 양수 페이지를 사용하세요.
- Tabs: `label`, `items=[{value,label,content,disabled?}]`, 선택적 `value/defaultValue/onValueChange/orientation`. 방향키·Home·End, roving focus, disabled 건너뛰기와 panel 연결. 로컬 패널은 이동 시 자동 활성화됩니다. item value는 유일해야 합니다.
- Dialog: `open`, `onOpenChange`, `heading`, 선택적 `description/closeLabel/initialFocusRef`. 네이티브 showModal 기반. Escape/닫기 버튼, 배경 inert, 포커스 복귀. 지정한 초기 포커스는 열릴 때 initialFocusRef로 전달합니다. 미지정 시 브라우저가 첫 포커스 대상을 선택합니다. 여러 모달을 동시에 띄우지 마세요. 바깥 클릭으로 자동 닫지 않습니다.
- Toast: `open`, children, 선택적 `onDismiss/dismissLabel`. 항상 마운트된 polite live region 내부에 메시지를 넣습니다. 읽기 시간을 제한하는 자동 타이머는 없으며 상태를 소비자가 관리합니다.

```tsx
'use client';
import { useRef, useState } from 'react';
import { Button, Dialog, Input, Tabs, Toast } from '@ersione/design-system/react';

function Settings() {
  const [open, setOpen] = useState(false);
  const initialFocus = useRef<HTMLInputElement>(null);
  return <>
    <Button onClick={() => setOpen(true)}>설정</Button>
    <Dialog open={open} onOpenChange={setOpen} heading="프로젝트 설정" initialFocusRef={initialFocus}>
      <label>프로젝트 이름<Input ref={initialFocus} name="name" /></label>
    </Dialog>
  </>;
}
```

검토 화면은 `examples/react/`이며 네 가지 테마와 크기·상태를 실제 React 소스로 렌더링합니다.
자동 브라우저 검사는 Chromium 대상입니다. Firefox/Safari 및 전체 스크린리더 인증을 완료했다고 주장하지 않습니다.
