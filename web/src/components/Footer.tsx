import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  educationStats, healthcareStats, lawAndOrderStats,
  economyStats, agricultureStats, infrastructureStats,
} from '../data';

function countUniqueSources(): number {
  const allStats = [
    ...educationStats, ...healthcareStats, ...lawAndOrderStats,
    ...economyStats, ...agricultureStats, ...infrastructureStats,
  ];
  return new Set(allStats.map((s) => s.sourceUrl)).size;
}

export function Footer() {
  const { t } = useTranslation();
  const sourceCount = countUniqueSources();

  return (
    <footer className="border-t border-tvk-blue/20 bg-tvk-dark px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <span className="text-xl font-black text-tvk-gold">TVK</span>
            <p className="mt-2 text-sm text-tvk-white/50">{t('hero.partyNameEn')}</p>
            <p className="mt-1 text-sm italic text-tvk-white/40">{t('footer.tagline')}</p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-tvk-white/40">
              {t('nav.domains')}
            </h4>
            <div className="flex flex-col gap-2">
              {['education', 'healthcare', 'economy', 'infrastructure', 'lawAndOrder', 'agriculture'].map((key) => (
                <Link
                  key={key}
                  to={`/domain/${key}`}
                  className="text-sm text-tvk-white/60 transition-colors hover:text-tvk-gold"
                >
                  {t(`domains.${key}`)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-tvk-white/40">
              {t('footer.connect')}
            </h4>
            <div className="flex gap-4">
              <a href="https://x.com/tvaborgin" target="_blank" rel="noopener noreferrer" className="text-tvk-white/60 hover:text-tvk-gold transition-colors" aria-label="X / Twitter">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://instagram.com/tvkparty" target="_blank" rel="noopener noreferrer" className="text-tvk-white/60 hover:text-tvk-gold transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://youtube.com/@tvkofficial" target="_blank" rel="noopener noreferrer" className="text-tvk-white/60 hover:text-tvk-gold transition-colors" aria-label="YouTube">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-tvk-blue/20 pt-6 sm:flex-row sm:justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-tvk-blue/30 bg-tvk-blue/10 px-4 py-1.5">
            <svg className="h-4 w-4 text-tvk-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-semibold text-tvk-white/70">
              {t('footer.sourceBadge', { count: String(sourceCount) })}
            </span>
          </div>
          <p className="text-xs text-tvk-white/30">
            © 2026 Tamilaga Vettri Kazhagam
          </p>
        </div>
      </div>
    </footer>
  );
}
