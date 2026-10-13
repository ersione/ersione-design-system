# Figma revision 2 — DRAFT / final typography repair pending

2026-10-14. Existing file: https://www.figma.com/design/TfjaDsg9mQb5CF5SB6hcFL

## Applied

- Foundations: nine visual boards covering introduction, original symbol at six sizes, Noto Sans KR typography, four theme color roles, spacing, sizing, radius, shadows and usage combinations.
- Components: existing main component IDs preserved; twenty family catalogs with specimens and usage notes. Rebuilt dialog, tabs, table, pagination, accordion, inputs and controls. Added feedback/danger buttons, expanded select menus and accordion examples for four themes.
- App components: CompanyHeader, SearchFilters, CompanyResultRow and DataMetric for each theme. Exposed text properties and nested reusable control instances.
- Applications: search, Samsung results/detail and Tving results/detail, in blue/orange × light/dark: twenty desktop frames and thirty-two navigation reactions.
- Salary, subscribers and acquisition/loss use separate semantic data colors. Detail pages use a unified metric strip and broad employment summary rather than only separate cards.
- Removed four obsolete owned review boards. Existing reusable metric pattern components remain.

## Verification and remaining defect

Mutation tool responses confirmed node creation and navigation assignment. Chrome visually confirmed the Foundations typography board and Tving detail screen in the actual file.

**Not ready for release:** browser inspection found clipped large type in Foundations and overlapping value/support text in application metrics. The builder's text sizing needs correction. Figma MCP returned the Starter-plan tool-call limit before the audit/repair call could run. No successful final bounds audit or prototype playback verification is claimed.

`figma/revision2-pending-text-repair.js` records the proposed repair. It has NOT been executed or visually validated. Repair source components first, then Foundations and Applications, review all four themes and reflow top-level board positions as needed. The shared builder will also need the validated fix before reuse. Source sets are placed away from the catalogs; the old pattern area still needs final navigation/layout polish.

## Data and scope

Company Lens sample data: public company pages, baseline August 2026, checked October 14, 2026. Samsung results show only five observed samples out of sixty-three results; Tving has one sample. History shows three observed points, not an invented continuous monthly series. Figures are pension-derived estimates, not actual salary or staffing guarantees.

Figma screens are editable design/prototype frames, not a functional search application. No React component library was generated. Sites publication was not changed; Company Lens samples remain outside the public showcase.

## Entry points

- Foundations: https://www.figma.com/design/TfjaDsg9mQb5CF5SB6hcFL?node-id=3-195
- Components: https://www.figma.com/design/TfjaDsg9mQb5CF5SB6hcFL?node-id=11-729
- Search: https://www.figma.com/design/TfjaDsg9mQb5CF5SB6hcFL?node-id=13-240
- Samsung results: https://www.figma.com/design/TfjaDsg9mQb5CF5SB6hcFL?node-id=13-322
- Tving detail: https://www.figma.com/design/TfjaDsg9mQb5CF5SB6hcFL?node-id=13-608

Each `revision2-*-state.json` records the exact returned IDs. Scripts are change records, not safe repeatable imports: do not rerun creation scripts blindly.
