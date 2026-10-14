# 공통 컬러 팔레트

미리보기: [팔레트](palette.html), [React 예제](../examples/react/).

| 색 | 라이트 | 다크 | 용도 |
|---|---|---|---|
| 블루 | #2b609f | #a4c9ff | 인원·규모, 첫 번째 차트 시리즈 |
| 틸 | #146b65 | #8bdfd0 | 금액·급여, 신규 취득 |
| 앰버 | #94600e | #f0cb81 | 변동·자격상실 |
| 퍼플 | #7850a0 | #d5b3ff | 네 번째 범주 |
| 로즈 | #a74670 | #f5b5d2 | 다섯 번째 범주 |

primary는 브랜드 blue/orange에 따라 전환됩니다. `--data-people`, `--data-salary`, `--data-joiners`, `--data-departures`는 데이터의 의미를 유지하므로 브랜드가 바뀌어도 동일합니다. tint는 면·보조 변화율 배경, 기본 색상은 수치·선·아이콘에 사용합니다. 오류/성공 등의 상태는 별도 `--status-*` 토큰을 사용합니다.

차트는 `--chart-series-1`~`5`를 순서대로 사용하며 같은 범주의 색을 화면 전체에서 유지합니다. 축·그리드·툴팁은 `--chart-label`, `--chart-grid`, `--chart-tooltip-bg/fg`를 사용합니다. 여러 선은 범례와 라벨을 함께 제공하고 필요한 경우 점선/마커로도 구분합니다. 수치 증감은 +/- 부호와 증가/감소 문구를 유지하며 색만으로 의미를 전달하지 않습니다.

Canvas는 `@ersione/design-system/charts`에서 readChartTheme / observeChartTheme를 사용합니다. 공통 선 너비·누락 월 비연결·범례 스타일을 제공하며 데이터 포맷과 차트 라이브러리는 호스트가 관리합니다.
