"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ComponentProps, ReactNode, RefObject } from "react";
import { Button } from "./primitives.js";

const cx = (...values: (string | undefined | false)[]) => values.filter(Boolean).join(" ");
export type TabItem = { value: string; label: ReactNode; content: ReactNode; disabled?: boolean };
export type TabsProps = Omit<ComponentProps<"div">, "onChange" | "children" | "defaultValue"> & {
  items: readonly TabItem[];
  label: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
};
export function Tabs({ items, label, value, defaultValue, onValueChange, orientation = "horizontal", className, ...props }: TabsProps) {
  const id = useId();
  const [internal, setInternal] = useState(defaultValue ?? items.find(item => !item.disabled)?.value);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = items.find(item => item.value === (value ?? internal) && !item.disabled)?.value ?? items.find(item => !item.disabled)?.value;
  const select = (next: string) => { if (value === undefined) setInternal(next); onValueChange?.(next); };
  return <div {...props} className={cx("eds-tabs", className)}>
    <div className="eds-tabs__list" role="tablist" aria-label={label} aria-orientation={orientation}>
      {items.map((item, index) => <button key={item.value} type="button" role="tab" id={`${id}-tab-${index}`}
        aria-controls={`${id}-panel-${index}`} aria-selected={selected === item.value} disabled={item.disabled}
        tabIndex={selected === item.value ? 0 : -1} ref={node => { refs.current[index] = node; }}
        onClick={() => select(item.value)} onKeyDown={event => {
          const nextKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
          const prevKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
          if (![nextKey, prevKey, "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          const enabled = items.map((entry, i) => entry.disabled ? -1 : i).filter(i => i >= 0);
          if (!enabled.length) return;
          const current = enabled.indexOf(index);
          const target = event.key === "Home" ? enabled[0] : event.key === "End" ? enabled.at(-1)!
            : enabled[(current + (event.key === nextKey ? 1 : -1) + enabled.length) % enabled.length];
          refs.current[target]?.focus(); select(items[target].value);
        }}>{item.label}</button>)}
    </div>
    {items.map((item, index) => <div key={item.value} role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`}
      hidden={selected !== item.value} tabIndex={0} className="eds-tabs__panel">{item.content}</div>)}
  </div>;
}

export type DialogProps = Omit<ComponentProps<"dialog">, "open" | "children" | "ref"> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  heading: ReactNode;
  description?: ReactNode;
  closeLabel?: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
  children: ReactNode;
};
/** Native modal dialog provides top-layer rendering, focus containment and restoration. */
export function Dialog({ open, onOpenChange, heading, description, closeLabel = "닫기", initialFocusRef, children, className, onCancel, onClose, onKeyDown, ...props }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) { dialog.showModal(); initialFocusRef?.current?.focus(); }
    if (!open && dialog.open) dialog.close();
  }, [open, initialFocusRef]);
  useEffect(() => {
    const dialog = ref.current;
    return () => { if (dialog?.open) dialog.close(); };
  }, []);
  return <dialog {...props} ref={ref} aria-labelledby={`${id}-heading`} aria-describedby={description != null ? `${id}-description` : props["aria-describedby"]}
    className={cx("eds-dialog", className)} onKeyDown={event => {
      onKeyDown?.(event);
      if (event.defaultPrevented || event.key !== "Tab") return;
      const nodes = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
      )).filter(node => node.tabIndex >= 0 && node.getClientRects().length > 0 && !node.closest('[inert]'));
      const first = nodes[0], last = nodes.at(-1);
      if (!first) { event.preventDefault(); event.currentTarget.focus(); return; }
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }} onCancel={event => {
      onCancel?.(event); if (!event.defaultPrevented) { event.preventDefault(); onOpenChange(false); }
    }} onClose={event => { onClose?.(event); if (open) onOpenChange(false); }}>
    <div className="eds-dialog__header"><h2 id={`${id}-heading`}>{heading}</h2><Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>{closeLabel}</Button></div>
    {description != null && <p id={`${id}-description`} className="eds-dialog__description">{description}</p>}
    {children}
  </dialog>;
}

export type ToastProps = Omit<ComponentProps<"div">, "children"> & {
  open: boolean;
  children: ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
};
/** Persistent polite live region. Dismiss manually; no reading-time-dependent timeout. */
export function Toast({ open, children, onDismiss, dismissLabel = "알림 닫기", className, ...props }: ToastProps) {
  return <div {...props} role="status" aria-live="polite" aria-atomic="true" className={cx("eds-toast-region", className)}>
    {open && <div className="eds-toast"><span>{children}</span>{onDismiss && <Button variant="ghost" size="sm" onClick={onDismiss}>{dismissLabel}</Button>}</div>}
  </div>;
}
