const VARIANT_CLASSES = {
  primary: 'bg-accent text-bg-base hover:bg-accent-soft',
  secondary: 'border border-border text-text-primary hover:border-accent hover:text-accent',
  ghost: 'text-text-secondary hover:text-accent',
};

export function Button({ as = 'a', variant = 'primary', className = '', children, ...props }) {
  const Tag = as;
  return (
    <Tag
      className={`inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
