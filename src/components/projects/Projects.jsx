import { useRef, useState } from 'react';
import { projects, projectsSection } from '../../data';
import { Section } from '../layout/Section';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

export function Projects() {
  const [openProjectId, setOpenProjectId] = useState(null);
  const triggerElementRef = useRef(null);

  function handleOpen(id, triggerElement) {
    triggerElementRef.current = triggerElement;
    setOpenProjectId(id);
  }

  function handleClose() {
    setOpenProjectId(null);
    triggerElementRef.current?.focus();
  }

  const activeProject = projects.find((project) => project.id === openProjectId) ?? null;

  return (
    <Section id="projects" kicker={projectsSection.kicker} heading={projectsSection.heading}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} onOpen={handleOpen} />
        ))}
      </div>
      <ProjectModal project={activeProject} onClose={handleClose} />
    </Section>
  );
}
