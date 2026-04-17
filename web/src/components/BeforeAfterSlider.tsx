import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatedCounter } from './AnimatedCounter';
import { SourceCitationModal } from './SourceCitationModal';

interface StatSource {
  value: string;
  description: string;
  year: string;
  sourceName: string;
  sourceUrl: string;
}

interface BeforeAfterStat {
  label: string;
  before: number;
  after: number;
  suffix?: string;
  source: StatSource;
}

interface BeforeAfterSliderProps {
  title: string;
  beforeLabel: string;
  afterLabel: string;
  stats: BeforeAfterStat[];
}

export function BeforeAfterSlider({ title, beforeLabel, afterLabel, stats }: BeforeAfterSliderProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');
  const [modalStat, setModalStat] = useState<StatSource | null>(null);

  const isAfter = activeTab === 'after';

  return (
    <div className="rounded-2xl border border-tvk-blue/40 overflow-hidden">
      <div className="px-6 pt-5 pb-0 bg-tvk-dark/80">
        <h3 className="text-xl font-bold text-tvk-white mb-4">{title}</h3>

        <div className="flex rounded-lg overflow-hidden border border-tvk-blue/40 w-fit">
          <button
            onClick={() => setActiveTab('before')}
            className={`px-5 py-2 text-sm font-semibold transition-colors ${
              !isAfter
                ? 'bg-tvk-blue text-tvk-white'
                : 'text-tvk-white/60 hover:text-tvk-white'
            }`}
          >
            {beforeLabel}
          </button>
          <button
            onClick={() => setActiveTab('after')}
            className={`px-5 py-2 text-sm font-semibold transition-colors ${
              isAfter
                ? 'bg-tvk-gold text-tvk-dark'
                : 'text-tvk-white/60 hover:text-tvk-white'
            }`}
          >
            {afterLabel}
          </button>
        </div>
      </div>

      <div className="divide-y divide-tvk-blue/20 bg-tvk-dark/60">
        {stats.map((stat, i) => {
          const displayValue = isAfter ? stat.after : stat.before;
          const changed = stat.after !== stat.before;
          const improved = stat.after > stat.before;

          return (
            <div key={i} className="flex items-center justify-between px-6 py-4 gap-4">
              <span className="text-tvk-white/80 text-sm flex-1">{stat.label}</span>

              <div className="flex items-center gap-3 shrink-0">
                <AnimatedCounter
                  value={displayValue}
                  suffix={stat.suffix}
                  decimals={Number.isInteger(displayValue) ? 0 : 1}
                />

                {isAfter && changed && (
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      improved
                        ? 'bg-green-900/40 text-green-400'
                        : 'bg-tvk-fire/20 text-tvk-fire'
                    }`}
                  >
                    {improved ? '+' : ''}
                    {stat.after - stat.before > 0 ? '+' : ''}
                    {(stat.after - stat.before).toFixed(Number.isInteger(stat.after - stat.before) ? 0 : 1)}
                    {stat.suffix}
                  </span>
                )}

                <button
                  onClick={() => setModalStat(stat.source)}
                  className="text-tvk-blue/60 hover:text-tvk-blue transition-colors"
                  aria-label={t('stats.source', 'Source')}
                  title={t('stats.source', 'Source')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <SourceCitationModal
        isOpen={modalStat !== null}
        onClose={() => setModalStat(null)}
        stat={modalStat}
      />
    </div>
  );
}
