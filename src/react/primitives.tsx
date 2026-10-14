import type { ComponentProps, ElementType, ReactNode } from "react";

const cx = (...values: (string | undefined | false)[]) => values.filter(Boolean).join(" ");
export type ControlSize = "sm" | "md" | "lg";
export type PaletteColor = "blue" | "teal" | "amber" | "purple" | "rose";
export type HighlightTone = "primary" | "neutral" | PaletteColor;
/** Legacy data aliases remain for v0.2 consumers; new projects choose palette colors. */
export type DataTone = "neutral" | "primary" | "salary" | "people" | "flow" | "joiners" | "departures";
export type StatusTone = "neutral" | "success" | "warning" | "error";

export type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: ControlSize;
  loading?: boolean;
};
/** Explicit type="submit" is required inside forms. Loading blocks repeated actions. */
export function Button({ variant = "primary", size = "md", loading = false, disabled, type = "button", className, children, ...props }: ButtonProps) {
  return <button {...props} type={type} disabled={disabled || loading} aria-busy={loading || props["aria-busy"]}
    className={cx("eds-button", `eds-button--${variant}`, `eds-control--${size}`, className)}>{children}</button>;
}

export type InputProps = Omit<ComponentProps<"input">, "size"> & { controlSize?: ControlSize };
/** Label, validation copy and aria-describedby belong to the consuming form. */
export function Input({ controlSize = "md", className, ...props }: InputProps) {
  return <input {...props} className={cx("eds-input", `eds-control--${controlSize}`, className)} />;
}

export type SelectProps = ComponentProps<"select"> & { controlSize?: ControlSize };
/** A native select retains platform keyboard, touch and form behavior. */
export function Select({ controlSize = "md", className, ...props }: SelectProps) {
  return <select {...props} className={cx("eds-select", `eds-control--${controlSize}`, className)} />;
}

export type BadgeProps = ComponentProps<"span"> & { tone?: StatusTone };
export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return <span {...props} className={cx("eds-badge", `eds-status--${tone}`, className)} />;
}

export type MetricProps = Omit<ComponentProps<"div">, "children"> & {
  label: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  description?: ReactNode;
  tone?: DataTone;
  children?: ReactNode;
};
export function Metric({ label, value, unit, description, tone = "neutral", className, children, ...props }: MetricProps) {
  return <div {...props} className={cx("eds-metric", `eds-data--${tone}`, className)}>
    <span className="eds-metric__label">{label}</span>
    <strong className="eds-metric__value">{value}{unit != null && <small>{unit}</small>}</strong>
    {description != null && <div className="eds-metric__description">{description}</div>}
    {children}
  </div>;
}

export type MetricPanelProps = ComponentProps<"div">;
export function MetricPanel({ className, ...props }: MetricPanelProps) {
  return <div {...props} className={cx("eds-metric-panel", className)} />;
}

export type TableProps = ComponentProps<"table">;
/** Keep native caption, th/scope and tbody markup in the consumer. No div-based table. */
export function Table({ className, ...props }: TableProps) {
  return <table {...props} className={cx("eds-table", className)} />;
}
export type TableContainerProps = ComponentProps<"div">;
export function TableContainer({ className, ...props }: TableContainerProps) {
  return <div {...props} className={cx("eds-table-container", className)} />;
}

export type TextareaProps = ComponentProps<"textarea">;
export function Textarea({ className, ...props }: TextareaProps) {
  return <textarea {...props} className={cx("eds-textarea", className)} />;
}

export type CheckboxProps = Omit<ComponentProps<"input">, "type" | "size">;
export function Checkbox({ className, ...props }: CheckboxProps) {
  return <input {...props} type="checkbox" className={cx("eds-checkbox", className)} />;
}
export type RadioProps = Omit<ComponentProps<"input">, "type" | "size">;
export function Radio({ className, ...props }: RadioProps) {
  return <input {...props} type="radio" className={cx("eds-radio", className)} />;
}
export type SwitchProps = Omit<ComponentProps<"input">, "type" | "size" | "role">;
export function Switch({ className, ...props }: SwitchProps) {
  return <input {...props} type="checkbox" role="switch" className={cx("eds-switch", className)} />;
}

export type AlertProps = ComponentProps<"div"> & { tone?: StatusTone; heading?: ReactNode };
export function Alert({ tone = "neutral", heading, className, children, ...props }: AlertProps) {
  return <div {...props} className={cx("eds-alert", `eds-status--${tone}`, className)}>
    {heading != null && <strong className="eds-alert__heading">{heading}</strong>}{children}
  </div>;
}

export type CardProps = ComponentProps<"div"> & { padding?: "sm" | "md" | "lg"; elevated?: boolean };
export function Card({ padding = "md", elevated = false, className, ...props }: CardProps) {
  return <div {...props} className={cx("eds-card", `eds-card--${padding}`, elevated && "eds-card--elevated", className)} />;
}

export type ProgressProps = Omit<ComponentProps<"progress">, "children"> & { label: ReactNode; valueText?: ReactNode };
/** Omit value for an indeterminate native progress indicator. Always label it. */
export function Progress({ label, valueText, className, ...props }: ProgressProps) {
  return <label className="eds-progress"><span>{label}{valueText != null && <strong>{valueText}</strong>}</span>
    <progress {...props} className={cx("eds-progress__bar", className)} />
  </label>;
}

export type SkeletonProps = ComponentProps<"div">;
/** Decorative placeholder. Set aria-busy on the content region, not each skeleton. */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div {...props} aria-hidden="true" className={cx("eds-skeleton", className)} />;
}

export type AccordionProps = Omit<ComponentProps<"details">, "children"> & { heading: ReactNode; children: ReactNode };
/** Native details provides keyboard and expanded-state semantics without JavaScript. */
export function Accordion({ heading, className, children, ...props }: AccordionProps) {
  return <details {...props} className={cx("eds-accordion", className)}><summary>{heading}</summary><div className="eds-accordion__content">{children}</div></details>;
}

export type PaginationProps = Omit<ComponentProps<"nav">, "children"> & {
  page: number;
  totalPages: number;
  previous?: ReactNode;
  next?: ReactNode;
  onPageChange?: (page: number) => void;
};
/** Host supplies links (including Next Link/Vue-equivalent markup) or buttons. */
export function Pagination({ page, totalPages, previous, next, onPageChange, className, ...props }: PaginationProps) {
  return <nav aria-label="페이지 이동" {...props} className={cx("eds-pagination", className)}>
    {previous ?? <Button variant="secondary" size="sm" disabled={!onPageChange || page <= 1} onClick={onPageChange ? () => onPageChange(page - 1) : undefined}>이전</Button>}
    <span aria-current="page">{page} / {totalPages} 페이지</span>
    {next ?? <Button variant="secondary" size="sm" disabled={!onPageChange || page >= totalPages} onClick={onPageChange ? () => onPageChange(page + 1) : undefined}>다음</Button>}
  </nav>;
}



export type NavigationProps = ComponentProps<"nav"> & { size?: ControlSize };
/** Ordinary page links, not ARIA tabs. The host owns routing and active matching. */
export function Navigation({ size = "md", className, ...props }: NavigationProps) {
  return <nav aria-label="주 메뉴" {...props} className={cx("eds-navigation", `eds-navigation--${size}`, className)} />;
}
export type NavigationLinkProps = ComponentProps<"a"> & { active?: boolean; icon?: ReactNode; as?: ElementType };
/** `as={Link}` supports a router without introducing a framework dependency. */
export function NavigationLink({ active = false, icon, as: Link = "a", className, children, ...props }: NavigationLinkProps) {
  return <Link {...props} aria-current={active ? "page" : props["aria-current"]} className={cx("eds-navigation__link", className)}>
    {icon != null && <span className="eds-navigation__icon" aria-hidden="true">{icon}</span>}<span>{children}</span>
  </Link>;
}
export type DataHighlightProps = ComponentProps<"strong"> & { tone?: HighlightTone | DataTone; size?: ControlSize; unit?: ReactNode; secondary?: ReactNode; muted?: boolean };
export function DataHighlight({ tone = "primary", size = "md", unit, secondary, muted = false, className, children, ...props }: DataHighlightProps) {
  return <strong {...props} className={cx("eds-highlight", `eds-data--${tone}`, `eds-highlight--${size}`, muted && "eds-highlight--muted", className)}>
    <span>{children}{unit != null && <small className="eds-highlight__unit">{unit}</small>}</span>
    {secondary != null && <small className="eds-highlight__secondary">{secondary}</small>}
  </strong>;
}
export type HighlightPanelProps = ComponentProps<"section"> & { tone?: HighlightTone | DataTone };
export function HighlightPanel({ tone = "primary", className, ...props }: HighlightPanelProps) {
  return <section {...props} className={cx("eds-highlight-panel", `eds-data--${tone}`, className)} />;
}
