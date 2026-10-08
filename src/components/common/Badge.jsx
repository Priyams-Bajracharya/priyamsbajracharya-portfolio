// Small mono-font pill used for tech-stack tags.
export function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded border border-border bg-bg-surface-2 px-2 py-1 font-mono text-xs text-text-secondary">
      {children}
    </span>
  );
}
