import { Badge } from '../common/Badge';
import { ImagePlaceholder } from '../common/ImagePlaceholder';
import { RevealOnScroll } from '../common/RevealOnScroll';

export function ProjectCard({ project, index, onOpen }) {
  return (
    <RevealOnScroll delay={index * 0.08}>
      <button
        type="button"
        onClick={(event) => onOpen(project.id, event.currentTarget)}
        className="group block w-full overflow-hidden rounded-lg border border-border bg-bg-surface text-left transition-colors hover:border-accent"
      >
        <ImagePlaceholder
          file={project.screenshot.file}
          width={project.screenshot.width}
          height={project.screenshot.height}
          alt={project.screenshot.alt}
        />
        <div className="p-5">
          {project.team && (
            <span className="mb-2 inline-block rounded border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-text-muted">
              Team project
            </span>
          )}
          <h3 className="text-lg font-semibold text-text-primary transition-colors group-hover:text-accent">{project.title}</h3>
          <p className="mt-2 text-sm text-text-secondary">{project.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </div>
      </button>
    </RevealOnScroll>
  );
}
