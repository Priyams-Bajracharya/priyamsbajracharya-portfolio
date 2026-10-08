import { site } from '../../data';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-bg-base/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#hero" className="font-mono text-sm font-medium text-text-primary transition-colors hover:text-accent">
          {site.name}
        </a>
        <nav className="hidden items-center gap-6 font-mono text-xs uppercase tracking-wide text-text-secondary sm:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-accent">
              {link.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
