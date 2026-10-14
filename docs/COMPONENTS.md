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
