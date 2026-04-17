import { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
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
import { AnimatedCounter } from '../components/AnimatedCounter';
import { SourceCitationModal } from '../components/SourceCitationModal';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { TVKBarChart, TVKLineChart } from '../components/ChartWrapper';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface DomainData {
  key: string;
  icon: string;
  stats: Stat[];
  beforeAfter: BeforeAfter[];
}

const DOMAIN_MAP: Record<string, DomainData> = {
  education:      { key: 'education',      icon: '📚', stats: educationStats,      beforeAfter: educationBeforeAfter },
  healthcare:     { key: 'healthcare',     icon: '🏥', stats: healthcareStats,     beforeAfter: healthcareBeforeAfter },
  economy:        { key: 'economy',        icon: '💰', stats: economyStats,        beforeAfter: economyBeforeAfter },
  infrastructure: { key: 'infrastructure', icon: '🏗️', stats: infrastructureStats, beforeAfter: infrastructureBeforeAfter },
  lawAndOrder:    { key: 'lawAndOrder',    icon: '⚖️', stats: lawAndOrderStats,    beforeAfter: lawAndOrderBeforeAfter },
  agriculture:    { key: 'agriculture',    icon: '🌾', stats: agricultureStats,    beforeAfter: agricultureBeforeAfter },
};

function getHeadlineStat(stats: Stat[]): Stat {
  return stats.find((s) => s.isNegative && s.trend === 'up') ?? stats[0];
}

function formatStatValue(stat: Stat): string {
  return `${stat.value}${stat.unit ?? ''}`;
}

function buildBarChartData(stats: Stat[]): Array<Record<string, unknown>> {
  return stats
    .filter((s) => typeof s.value === 'number')
    .slice(0, 6)
    .map((s) => ({
      name: s.description.slice(0, 30),
      value: s.value,
    }));
}

function buildBeforeAfterChartData(beforeAfter: BeforeAfter[]): Array<Record<string, unknown>> {
  return beforeAfter.map((ba) => ({
    name: ba.metric.length > 25 ? ba.metric.slice(0, 25) + '…' : ba.metric,
    Before: typeof ba.before.value === 'number' ? ba.before.value : parseFloat(String(ba.before.value)),
    After: typeof ba.after.value === 'number' ? ba.after.value : parseFloat(String(ba.after.value)),
  }));
}

export function DomainPage() {
  const { domainKey } = useParams<{ domainKey: string }>();
  const { t, i18n } = useTranslation();
  const pageRef = useRef<HTMLDivElement>(null);
  const [citationStat, setCitationStat] = useState<Stat | null>(null);
  const isTamil = i18n.language === 'ta';

  const domain = domainKey ? DOMAIN_MAP[domainKey] : null;

  useGSAP(
    () => {
      gsap.fromTo('.stat-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.stats-grid', start: 'top 85%', once: true },
      });
      gsap.fromTo('.chart-section', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.chart-section', start: 'top 85%', once: true },
      });
    },
    { scope: pageRef, dependencies: [domainKey] },
  );

  if (!domain) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-tvk-white">{t('common.notFound', 'Domain not found')}</h1>
        <Link to="/" className="mt-4 text-tvk-blue hover:text-tvk-gold transition-colors">
          ← {t('nav.home')}
        </Link>
      </div>
    );
  }

  const headline = getHeadlineStat(domain.stats);
  const barData = buildBarChartData(domain.stats);
  const baChartData = buildBeforeAfterChartData(domain.beforeAfter);

  return (
    <div ref={pageRef} className="min-h-screen pt-16">
      <Helmet>
        <title>{t(`domains.${domain.key}`)} — Why TVK</title>
        <meta name="description" content={`${isTamil && headline.descriptionTa ? headline.descriptionTa : headline.description} — ${headline.source}`} />
        <meta property="og:title" content={`${t(`domains.${domain.key}`)} — Why TVK`} />
        <meta property="og:description" content={isTamil && headline.descriptionTa ? headline.descriptionTa : headline.description} />
      </Helmet>
      {/* Hero banner */}
      <section
        className="relative px-4 py-20 sm:px-6 sm:py-28"
        style={{
          background: 'linear-gradient(160deg, #0A0A0A 0%, #0d1f6e 60%, #1B4FD8 100%)',
        }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-tvk-white/60 transition-colors hover:text-tvk-gold">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('nav.home')}
          </Link>
          <div className="mb-4 text-6xl">{domain.icon}</div>
          <h1 className="mb-4 text-3xl font-black text-tvk-gold sm:text-4xl lg:text-5xl">
            {t(`domains.${domain.key}`)}
          </h1>
          <p className="mb-6 text-sm text-tvk-white/60 sm:text-base">
            {isTamil && headline.descriptionTa ? headline.descriptionTa : headline.description}
          </p>
          <div className="flex justify-center">
            <AnimatedCounter
              value={typeof headline.value === 'number' ? headline.value : parseFloat(String(headline.value))}
              suffix={headline.unit}
              decimals={String(headline.value).includes('.') ? 1 : 0}
            />
          </div>
        </div>
      </section>

      {/* Stats grid */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-black text-tvk-white sm:text-3xl">
            {t('domainPage.keyFindings', 'Key Findings')}
          </h2>
          <div className="stats-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {domain.stats.map((stat) => (
              <button
                key={stat.id}
                className="stat-card flex flex-col rounded-xl border border-tvk-blue/20 bg-tvk-blue/5 p-5 text-left transition-all hover:border-tvk-gold/40 cursor-pointer"
                onClick={() => setCitationStat(stat)}
              >
                <span className={`mb-2 text-2xl font-black ${stat.isNegative ? 'text-tvk-fire' : 'text-green-400'}`}>
                  {formatStatValue(stat)}
                </span>
                <p className="mb-3 flex-1 text-sm text-tvk-white/80">
                  {isTamil && stat.descriptionTa ? stat.descriptionTa : stat.description}
                </p>
                <div className="flex items-center gap-1 text-xs text-tvk-blue/60">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {stat.source} · {stat.year}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After section */}
      {domain.beforeAfter.length > 0 && (
        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <BeforeAfterSlider
              title={t('stats.beforeAfter', 'Before vs After')}
              beforeLabel={domain.beforeAfter[0].before.party + ' ' + domain.beforeAfter[0].before.year}
              afterLabel={domain.beforeAfter[0].after.party + ' ' + domain.beforeAfter[0].after.year}
              stats={domain.beforeAfter.map((ba) => ({
                label: isTamil && ba.metricTa ? ba.metricTa : ba.metric,
                before: typeof ba.before.value === 'number' ? ba.before.value : parseFloat(String(ba.before.value)),
                after: typeof ba.after.value === 'number' ? ba.after.value : parseFloat(String(ba.after.value)),
                suffix: ba.before.unit,
                source: {
                  value: `${ba.before.value}${ba.before.unit ?? ''} → ${ba.after.value}${ba.after.unit ?? ''}`,
                  description: isTamil && ba.metricTa ? ba.metricTa : ba.metric,
                  year: `${ba.before.year}–${ba.after.year}`,
                  sourceName: ba.source,
                  sourceUrl: ba.sourceUrl,
                },
              }))}
            />
          </div>
        </section>
      )}

      {/* Charts section */}
      <section className="chart-section px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-black text-tvk-white sm:text-3xl">
            {t('domainPage.dataVisualization', 'Data Visualization')}
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {barData.length > 0 && (
              <TVKBarChart
                data={barData}
                xKey="name"
                yKey="value"
                title={t(`domains.${domain.key}`) + ' — ' + t('domainPage.statsOverview', 'Stats Overview')}
              />
            )}
            {baChartData.length > 0 && (
              <TVKLineChart
                data={baChartData}
                xKey="name"
                yKey="After"
                title={t('stats.beforeAfter', 'Before vs After') + ' — ' + t('domainPage.trends', 'Trends')}
              />
            )}
          </div>
        </div>
      </section>

      <SourceCitationModal
        isOpen={citationStat !== null}
        onClose={() => setCitationStat(null)}
        stat={citationStat ? {
          value: formatStatValue(citationStat),
          description: isTamil && citationStat.descriptionTa ? citationStat.descriptionTa : citationStat.description,
          year: citationStat.year,
          sourceName: citationStat.source,
          sourceUrl: citationStat.sourceUrl,
        } : null}
      />
    </div>
  );
}
