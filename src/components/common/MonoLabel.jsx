// Pipeline-stage-style section label, e.g. "01 / extract".
export function MonoLabel({ children }) {
  return (
    <span className="font-mono text-xs uppercase tracking-wide text-accent sm:text-sm">
      {children}
    </span>
  );
}
