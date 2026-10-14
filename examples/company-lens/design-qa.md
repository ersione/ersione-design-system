# Company Lens HTML preview QA

final result: passed

## Scope and evidence
- Source visual truth: `qa/reference.png`, existing Ersione HTML showcase, blue/light.
- Implementation screenshot: `qa/preview.png`, Company Lens home, blue/light.
- Both screenshots opened together in the same browser tool output for comparison.
- Source: 1280 × 720 pixels; implementation full page: 1280 × 1291 pixels. Browser CSS viewport 1280 × 720, screenshots at 1x. Compare shared tokens and components at native scale; full-page height is intentionally different.
- This is a design-system application, not a pixel clone. Workspace sidebar is intentionally replaced with Company Lens navigation. Independent metric cards become a unified panel following USAGE.md.

## Findings
No actionable P0/P1/P2 findings in the inspected states.
- Typography: local Noto Sans KR; hierarchy, numeric units and wrapping readable in desktop home and mobile detail. No observed clipped values.
- Layout: 16px panels, 10px controls, 4px spacing rhythm; mobile detail stacks metrics. At 390px, document scroll width equals viewport width. Results table intentionally scrolls within its container.
- Colors: direct import of repository tokens; blue/orange × light/dark visually inspected. Salary, people and flow keep independent semantic roles.
- Assets: original `figma/symbol.svg` used directly, with no generated replacement. Source showcase has broken relative image paths when served from its source folder; preview asset resolves correctly.
- Content: all companies and figures explicitly fictional; no backend calls.
- Core interactions verified: example query returns three Hanbit companies; company detail opens; return works; Seoul filter returns two companies; nonexistent query shows empty state; reset restores examples; theme and brand controls work.
- Browser warning/error logs: none observed.

## Comparison history
Initial implementation passed inspected visual checks without P0/P1/P2 correction iterations. Final capture resets query and region for handoff.

## Follow-up / test limits
Not a production React component library. Full keyboard/screen-reader certification, every filter combination and every mobile theme were not tested. Primary screenshot pair evaluates design language across different application content rather than pixel-identical screens.
