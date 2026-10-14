# 컬러 팔레트와 역할

[시각 팔레트](palette.html) · [React 예제](../examples/react/)

색상은 세 층으로 나눕니다. 팔레트는 재료, 공통 역할은 UI 의미, 데이터의 의미는 각 프로젝트가 정합니다.

## 1. 자유롭게 선택하는 기본 팔레트

| 팔레트 | 라이트 | 다크 | 토큰 |
|---|---|---|---|
| 블루 | #2b609f | #a4c9ff | --palette-blue |
| 틸 | #146b65 | #8bdfd0 | --palette-teal |
| 앰버 | #94600e | #f0cb81 | --palette-amber |
| 퍼플 | #7850a0 | #d5b3ff | --palette-purple |
| 로즈 | #a74670 | #f5b5d2 | --palette-rose |

각 색의 `-tint`는 보조 배경입니다. 예: `--palette-blue-tint`. 블루를 인원 전용, 틸을 금액 전용으로 제한하지 않습니다. 카테고리, 지표, 섹션 등에 어울리는 색을 고르되 같은 프로젝트의 같은 의미에는 같은 색을 유지합니다.

## 2. 공통 UI 역할

- primary/brand: 가장 중요한 동작과 강조. 브랜드에 따라 블루·오렌지로 전환합니다.
- neutral/secondary: 보조 동작, 취소, 닫기. 취소 자체는 danger가 아닙니다.
- danger/error: 삭제·파괴적 동작, 오류.
- warning: 주의가 필요한 상태. success: 성공한 처리.
- 정보의 강조·분류에는 팔레트를 선택할 수 있지만, 이미 위험·오류를 뜻하는 UI에 임의의 강조색을 대신 쓰지 않습니다.

버튼은 `variant="primary|secondary|ghost|danger"`, 수치 강조는 `DataHighlight tone="primary|neutral|blue|teal|amber|purple|rose"`를 사용합니다.

## 3. 프로젝트별 데이터 매핑

Company Lens의 인원=블루, 금액=틸, 취득=틸, 상실=앰버는 해당 서비스가 정한 선택입니다. 다른 서비스는 같은 색을 다른 지표에 사용할 수 있습니다. 이 매핑을 전역 규칙으로 강제하지 않습니다. 기존 v0.2의 data-people/salary/flow와 v0.3의 joiners/departures 별칭은 호환성을 위해 남겨두지만 새로운 프로젝트에는 이름 기반 팔레트와 로컬 매핑을 권장합니다.

차트는 기본 범주 팔레트 `--chart-series-1`~`5` 또는 named palette를 사용합니다. `@ersione/design-system/charts`의 readChartTheme(element).palette에서 named colors를 읽고 프로젝트가 데이터 이름에 연결합니다. observeChartTheme는 테마 변경을 반영합니다. 축·그리드·툴팁은 --chart-label/grid/tooltip-bg/tooltip-fg를 사용합니다.

여러 선은 범례·라벨과 필요 시 점선/마커로 구분합니다. 증감은 +/- 부호와 문구를 유지하며 색만으로 의미를 전달하지 않습니다.

참고: [Atlassian color roles](https://atlassian.design/foundations/color), [Carbon color system](https://carbondesignsystem.com/building-blocks/foundations/color/overview).
