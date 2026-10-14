import type { ComponentProps, ReactNode } from "react";

const cx = (...values: (string | undefined | false)[]) => values.filter(Boolean).join(" ");
export type ControlSize = "sm" | "md" | "lg";
export type DataTone = "neutral" | "salary" | "people" | "flow";
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
