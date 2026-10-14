/** Canvas chart adapters: no React, router or chart-library dependency. */
export function readChartTheme(element: Element) {
  const style = getComputedStyle(element);
  const token = (name: string) => style.getPropertyValue(`--${name}`).trim();
  return {
    palette: { blue: token("palette-blue"), teal: token("palette-teal"), orange: token("palette-orange"), purple: token("palette-purple"), rose: token("palette-rose"), gray: token("palette-gray") },
    tints: { blue: token("palette-blue-tint"), teal: token("palette-teal-tint"), orange: token("palette-orange-tint"), purple: token("palette-purple-tint"), rose: token("palette-rose-tint"), gray: token("palette-gray-tint") },
    subtles: Object.fromEntries(["blue", "teal", "orange", "purple", "rose", "gray"].map(color => [color, token(`palette-${color}-subtle`)])),
    colors: { primary: token("data-primary"), people: token("data-people"), salary: token("data-salary"), flow: token("data-flow"), joiners: token("data-joiners"), departures: token("data-departures"),
      error: token("status-error-fg"), warning: token("status-warning-fg"), grid: token("chart-grid"), label: token("chart-label"), tooltipBackground: token("chart-tooltip-bg"), tooltipText: token("chart-tooltip-fg"),
      peopleFill: token("data-people-tint"), salaryFill: token("data-salary-tint"), primaryFill: token("data-primary-tint") },
    series: [1, 2, 3, 4, 5].map(index => token(`chart-series-${index}`)),
    font: { family: style.fontFamily, size: 12 },
    line: { borderWidth: 2, pointHitRadius: 12, spanGaps: false, tension: 0 },
    legend: { usePointStyle: true, boxWidth: 8, padding: 18 },
  };
}
export type ChartTheme = ReturnType<typeof readChartTheme>;
/** Re-read inherited tokens when an ancestor's theme changes. Returns cleanup. */
export function observeChartTheme(element: Element, callback: (theme: ChartTheme) => void) {
  let previous = "";
  const update = () => {
    const theme = readChartTheme(element);
    const signature = JSON.stringify(theme);
    if (signature !== previous) {
      previous = signature;
      callback(theme);
    }
  };
  const observer = new MutationObserver(update);
  for (let node: Element | null = element; node; node = node.parentElement) {
    observer.observe(node, { attributes: true, attributeFilter: ["class", "style", "data-brand", "data-dark"] });
  }
  update();
  return () => observer.disconnect();
}
