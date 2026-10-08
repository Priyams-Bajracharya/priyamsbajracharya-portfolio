// Resolves whether a named image actually exists under
// src/assets/images/optimized/ at build time (via import.meta.glob), instead
// of a manually maintained "does this file exist" flag that could drift out
// of sync. Scoped to optimized/ only — raw source images elsewhere in
// src/assets/images/ are pipeline inputs (see scripts/optimize-images.mjs),
// not meant to be served directly, and must not get bundled by this glob.
// Missing files render a dashed placeholder box sized to the same
// width/height the real image will use, so dropping the real file in later
// causes no layout shift.
const imageModules = import.meta.glob('/src/assets/images/optimized/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
});

const imagesByFilename = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => [path.split('/').pop(), url])
);

// `fluid` (default) stretches to the parent's width at the given aspect
// ratio — used for cards/screenshots. Pass `fluid={false}` for a
// fixed-pixel-size image like the About section's avatar.
export function ImagePlaceholder({ file, width, height, alt, className = '', label = 'TODO: add image', fluid = true }) {
  const src = imagesByFilename[file];
  const style = fluid ? { aspectRatio: `${width} / ${height}` } : { width, height };
  const sizeClass = fluid ? 'w-full' : '';

  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center border border-dashed border-border bg-bg-surface-2 text-text-muted ${sizeClass} ${className}`}
        style={style}
      >
        <span aria-hidden="true" className="px-4 text-center font-mono text-xs uppercase tracking-wide">
          {label}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={`object-cover ${sizeClass} ${className}`}
      style={style}
    />
  );
}
