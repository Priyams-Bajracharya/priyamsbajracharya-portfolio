import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { Badge } from '../common/Badge';
import { ImagePlaceholder } from '../common/ImagePlaceholder';
import { StarSchemaDiagram } from './StarSchemaDiagram';

function ModalField({ label, value }) {
  const isTodo = value.trim().toUpperCase().startsWith('TODO');
  return (
    <div>
      <dt className="font-mono text-xs uppercase tracking-wide text-text-muted">{label}</dt>
      <dd className={`mt-1 text-sm ${isTodo ? 'rounded border border-dashed border-accent px-2 py-1 text-accent' : 'text-text-secondary'}`}>
        {value}
      </dd>
    </div>
  );
}

// A single reusable modal instance, portal-rendered and focus-trapped.
// Projects.jsx owns which project (if any) is open and passes it in here.
export function ProjectModal({ project, onClose }) {
  const containerRef = useRef(null);
  useFocusTrap(containerRef, { active: Boolean(project), onClose });

  useEffect(() => {
    if (!project) return undefined;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 py-10 sm:py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="w-full max-w-2xl rounded-lg border border-border bg-bg-surface p-6 sm:p-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                {project.team && (
                  <span className="mb-2 inline-block rounded border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-text-muted">
                    Team project
                  </span>
                )}
                <h3 id="project-modal-title" className="text-xl font-semibold text-text-primary">
                  {project.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="shrink-0 rounded-md border border-border px-2 py-1 text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                ✕
              </button>
            </div>

            <ImagePlaceholder
              file={project.screenshot.file}
              width={project.screenshot.width}
              height={project.screenshot.height}
              alt={project.screenshot.alt}
              className="mt-5 rounded-md"
            />

            {project.architecture.type === 'star-schema' && (
              <div className="mt-6">
                <h4 className="font-mono text-xs uppercase tracking-wide text-text-muted">Architecture</h4>
                <StarSchemaDiagram fact={project.architecture.schema.fact} dimensions={project.architecture.schema.dimensions} />
              </div>
            )}

            <dl className="mt-6 space-y-5">
              <ModalField label="Problem" value={project.caseStudy.problem} />
              <ModalField label="My Role" value={project.caseStudy.myRole} />
              <div>
                <dt className="font-mono text-xs uppercase tracking-wide text-text-muted">Tech Stack</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </dd>
              </div>
              <ModalField label="Challenges & Fixes" value={project.caseStudy.challenges} />
              <ModalField label="What I'd Improve" value={project.caseStudy.improvements} />
            </dl>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-accent transition-colors hover:text-accent-soft"
            >
              View on GitHub →
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
