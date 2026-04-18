import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'The Objective', path: '/' },
  { label: 'Diagnostic', path: '/diagnostic' },
  { label: 'The Engine', path: '/engine' },
  { label: 'The Roadmap', path: '/roadmap' },
  { label: 'Access', path: '/access' },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-500',
        scrolled
          ? 'bg-warmMidnight/95 backdrop-blur-sm border-b border-rule'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        <NavLink
          to="/"
          className="font-serif font-semibold text-warmIvory text-lg tracking-tight shrink-0"
        >
          Processa
        </NavLink>

        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  [
                    'font-sans font-light text-xs uppercase tracking-widest transition-opacity duration-200',
                    isActive
                      ? 'text-parchmentGold opacity-100'
                      : 'text-warmIvory opacity-50 hover:opacity-100',
                  ].join(' ')
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <NavLink
          to="/access"
          className="hidden md:block font-sans font-light text-xs uppercase tracking-widest text-warmIvory border border-rule px-5 py-2 transition-all duration-200 hover:border-parchmentGold hover:text-parchmentGold"
        >
          Apply
        </NavLink>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-1 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Toggle menu"
        >
          <span
            className={[
              'block h-px w-6 bg-warmIvory transition-all duration-300',
              menuOpen ? 'rotate-45 translate-y-[7px]' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block h-px w-6 bg-warmIvory transition-all duration-300',
              menuOpen ? 'opacity-0' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block h-px w-6 bg-warmIvory transition-all duration-300',
              menuOpen ? '-rotate-45 -translate-y-[7px]' : '',
            ].join(' ')}
          />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-warmMidnight/98 backdrop-blur-sm border-b border-rule">
          <ul className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
            {NAV_LINKS.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    [
                      'font-sans font-light text-sm uppercase tracking-widest transition-opacity duration-200',
                      isActive
                        ? 'text-parchmentGold'
                        : 'text-warmIvory opacity-50',
                    ].join(' ')
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="pt-4 border-t border-rule">
              <NavLink
                to="/access"
                className="font-sans font-light text-sm uppercase tracking-widest text-parchmentGold"
              >
                Apply for Access
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
