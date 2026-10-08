import { skills } from '../../data';
import { Section } from '../layout/Section';
import { SkillGroup } from './SkillGroup';

export function Skills() {
  return (
    <Section id="skills" kicker={skills.kicker} heading={skills.heading}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.groups.map((group, index) => (
          <SkillGroup key={group.id} group={group} index={index} />
        ))}
      </div>
    </Section>
  );
}
