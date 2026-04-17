import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { LanguageToggle } from './LanguageToggle';

const NAV_LINKS = [
  { key: 'home', path: '/' },
  { key: 'domains', path: '/#domains' },
  { key: 'atrocities', path: '/#atrocities' },
  { key: 'vision', path: '/#vision' },
] as const;

export function NavigationHeader() {
  const { t } = useTranslation();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (path: string) => {
    setMenuOpen(false);
    if (path.startsWith('/#')) {
      const id = path.slice(2);
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-tvk-blue/20 bg-tvk-dark/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-black text-tvk-gold">TVK</span>
          <span className="hidden text-sm font-semibold text-tvk-white/70 sm:inline">
            {t('hero.partyNameEn')}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              to={link.path}
              onClick={() => handleNavClick(link.path)}
              className="text-sm font-medium text-tvk-white/70 transition-colors hover:text-tvk-gold"
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}
          <LanguageToggle />
        </nav>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`block h-0.5 w-6 bg-tvk-white transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-tvk-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-tvk-white transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-tvk-blue/20 bg-tvk-dark/95 px-4 pb-4 pt-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              to={link.path}
              onClick={() => handleNavClick(link.path)}
              className="block py-3 text-base font-medium text-tvk-white/80 transition-colors hover:text-tvk-gold"
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}
          <div className="pt-3">
            <LanguageToggle />
          </div>
        </div>
      )}
    </header>
  );
}
