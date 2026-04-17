import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { atrocitiesTimeline } from '../data/atrocities-timeline';
import type { AtrocityEntry } from '../data/atrocities-timeline';
import { SourceCitationModal } from './SourceCitationModal';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CATEGORY_ICONS: Record<AtrocityEntry['category'], string> = {
  corruption: '💰',
  'welfare-failure': '🏚️',
  infrastructure: '🏗️',
  'farmer-crisis': '🌾',
  'women-safety': '🚨',
  'caste-violence': '⚔️',
};

const PARTY_COLORS: Record<AtrocityEntry['rulingParty'], string> = {
  DMK: '#E11D48',
  ADMK: '#16A34A',
  Congress: '#3B82F6',
  'BJP-NDA': '#F97316',
};

export function AtrocitiesTimeline() {
  const { i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedEntry, setSelectedEntry] = useState<AtrocityEntry | null>(null);
  const isTamil = i18n.language === 'ta';

  useGSAP(
    () => {
      gsap.fromTo(
        '.atrocity-entry',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section id="atrocities" ref={sectionRef} className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-tvk-dark via-red-950/20 to-tvk-dark" />

      <div className="relative mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-black text-tvk-fire sm:text-4xl lg:text-5xl">
            {isTamil ? 'அட்டூழியங்கள்' : 'Atrocities Timeline'}
          </h2>
          <p className="mx-auto max-w-xl text-sm text-tvk-white/50 sm:text-base">
            {isTamil
              ? 'அரசு தரவுகளால் ஆதரிக்கப்பட்ட ஆட்சித் தோல்விகளின் வரலாறு'
              : 'A sourced chronicle of governance failures — backed by government data'}
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-tvk-fire/30 sm:left-1/2 sm:-translate-x-px" />

          {atrocitiesTimeline.map((entry, idx) => (
            <div
              key={entry.id}
              className={`atrocity-entry relative mb-8 flex ${idx % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
            >
              <div className="absolute left-4 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-tvk-fire bg-tvk-dark sm:left-1/2" />

              <div className="w-full pl-10 sm:w-1/2 sm:pl-0 sm:pr-8 sm:even:pl-8 sm:even:pr-0">
                <button
                  type="button"
                  onClick={() => setSelectedEntry(entry)}
                  className="w-full rounded-xl border border-tvk-fire/20 bg-red-950/30 p-5 text-left transition-all duration-200 hover:border-tvk-fire/50 hover:bg-red-950/50"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className="rounded px-2 py-0.5 text-xs font-bold text-white"
                      style={{ backgroundColor: PARTY_COLORS[entry.rulingParty] }}
                    >
                      {entry.rulingParty}
                    </span>
                    <span className="text-xs font-semibold text-tvk-fire">{entry.year}</span>
                    <span className="text-lg">{CATEGORY_ICONS[entry.category]}</span>
                  </div>

                  <h3 className="mb-2 text-sm font-bold leading-snug text-tvk-white sm:text-base">
                    {isTamil ? entry.titleTa : entry.title}
                  </h3>

                  <p className="mb-3 text-xs leading-relaxed text-tvk-white/60 sm:text-sm">
                    {isTamil ? entry.descriptionTa : entry.description}
                  </p>

                  <div className="rounded-lg border border-tvk-fire/30 bg-tvk-fire/10 px-3 py-2 text-xs font-semibold text-tvk-fire sm:text-sm">
                    {isTamil ? entry.impactTa : entry.impact}
                  </div>

                  <div className="mt-2 text-xs text-tvk-white/40">
                    {entry.source}
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedEntry && (
        <SourceCitationModal
          isOpen={true}
          stat={{
            value: selectedEntry.impact,
            year: String(selectedEntry.year),
            description: selectedEntry.description,
            sourceName: selectedEntry.source,
            sourceUrl: selectedEntry.sourceUrl,
          }}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </section>
  );
}
