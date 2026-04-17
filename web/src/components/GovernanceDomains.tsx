import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Stat, BeforeAfter } from '../data/types';
import {
  educationStats, educationBeforeAfter,
  healthcareStats, healthcareBeforeAfter,
  lawAndOrderStats, lawAndOrderBeforeAfter,
  economyStats, economyBeforeAfter,
  agricultureStats, agricultureBeforeAfter,
  infrastructureStats, infrastructureBeforeAfter,
} from '../data';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface DomainConfig {
  key: string;
  icon: string;
  stats: Stat[];
  beforeAfter: BeforeAfter[];
}

const DOMAINS: DomainConfig[] = [
  { key: 'education',      icon: '📚', stats: educationStats,      beforeAfter: educationBeforeAfter },
  { key: 'healthcare',     icon: '🏥', stats: healthcareStats,     beforeAfter: healthcareBeforeAfter },
  { key: 'economy',        icon: '💰', stats: economyStats,        beforeAfter: economyBeforeAfter },
  { key: 'infrastructure', icon: '🏗️', stats: infrastructureStats, beforeAfter: infrastructureBeforeAfter },
  { key: 'lawAndOrder',    icon: '⚖️', stats: lawAndOrderStats,    beforeAfter: lawAndOrderBeforeAfter },
  { key: 'agriculture',    icon: '🌾', stats: agricultureStats,    beforeAfter: agricultureBeforeAfter },
];

function getHeadlineStat(stats: Stat[]): Stat {
  return stats.find((s) => s.isNegative && s.trend === 'up') ?? stats[0];
}

function formatStatValue(stat: Stat): string {
  return `${stat.value}${stat.unit ?? ''}`;
}

export function GovernanceDomains() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isTamil = i18n.language === 'ta';

  useGSAP(
    () => {
      gsap.fromTo(
        '.domain-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-black text-tvk-gold sm:text-4xl lg:text-5xl">
            {t('nav.domains')}
          </h2>
          <p className="mx-auto max-w-xl text-sm text-tvk-white/50 sm:text-base">
            {t('hero.quote')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((domain) => {
            const headline = getHeadlineStat(domain.stats);
            return (
              <Link
                key={domain.key}
                to={`/domain/${domain.key}`}
                className="domain-card group flex flex-col rounded-xl border border-tvk-blue/30 bg-tvk-blue/10 p-6 text-left transition-all duration-300 hover:border-tvk-gold hover:shadow-[0_0_24px_rgba(245,197,24,0.12)] active:scale-95"
              >
                <div className="mb-4 text-4xl" role="img" aria-label={t(`domains.${domain.key}`)}>
                  {domain.icon}
                </div>
                <h3 className="mb-1 text-lg font-bold text-tvk-white">
                  {t(`domains.${domain.key}`)}
                </h3>
                <div className="mb-1 text-xs uppercase tracking-wider text-tvk-white/40">
                  {isTamil && headline.descriptionTa
                    ? headline.descriptionTa.slice(0, 60)
                    : headline.description.slice(0, 60)}
                </div>
                <div className="mb-6 text-2xl font-black text-tvk-fire">
                  {formatStatValue(headline)}
                </div>
                <div className="mt-auto w-full rounded-lg border border-tvk-blue/50 py-2 text-center text-sm font-semibold text-tvk-white/80 transition-colors duration-200 group-hover:border-tvk-gold group-hover:text-tvk-gold">
                  {t('domains.viewDetails')}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </section>
  );
}
