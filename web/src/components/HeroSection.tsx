import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { LanguageToggle } from './LanguageToggle';

gsap.registerPlugin(useGSAP);

export function HeroSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-party-name', {
        opacity: 0,
        y: 60,
        duration: 1,
      })
        .from(
          '.hero-party-name-en',
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
          },
          '-=0.5',
        )
        .from(
          '.hero-quote',
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          '-=0.4',
        )
        .from(
          '.hero-tagline',
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          '-=0.4',
        );

      if (chevronRef.current) {
        gsap.to(chevronRef.current, {
          y: 10,
          duration: 0.9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
      style={{
        background: 'linear-gradient(160deg, #0A0A0A 0%, #0d1f6e 60%, #1B4FD8 100%)',
      }}
    >
      {/* Language toggle */}
      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <LanguageToggle />
      </div>

      {/* Fire particles */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="fire-particle absolute bottom-0 rounded-full opacity-70"
            style={{
              left: `${6 + i * 7}%`,
              width: `${6 + (i % 4) * 4}px`,
              height: `${10 + (i % 5) * 8}px`,
              background: `radial-gradient(ellipse at 50% 80%, #F5C518, #DC2626 60%, transparent 100%)`,
              animationName: 'fireRise',
              animationDuration: `${2 + (i % 3) * 0.8}s`,
              animationTimingFunction: 'ease-in',
              animationIterationCount: 'infinite',
              animationDelay: `${(i * 0.35) % 2.5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="hero-party-name mb-3 font-tamil text-4xl font-black leading-tight tracking-tight text-tvk-gold sm:text-5xl md:text-6xl lg:text-7xl">
          {t('hero.partyName')}
        </h1>

        <p className="hero-party-name-en mb-6 text-base font-semibold uppercase tracking-[0.25em] text-tvk-white/70 sm:text-lg">
          {t('hero.partyNameEn')}
        </p>

        <blockquote className="hero-quote mx-auto mb-8 max-w-xl text-base italic leading-relaxed text-tvk-white/80 sm:text-lg md:text-xl">
          &ldquo;{t('hero.quote')}&rdquo;
        </blockquote>

        <p className="hero-tagline text-xl font-bold text-tvk-gold sm:text-2xl md:text-3xl">
          {t('hero.tagline')}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-tvk-white/50">
          {t('hero.scrollDown')}
        </span>
        <div ref={chevronRef} aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-tvk-gold"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Fire rise keyframe injected via style tag */}
      <style>{`
        @keyframes fireRise {
          0%   { transform: translateY(0) scaleX(1); opacity: 0.8; }
          50%  { transform: translateY(-60px) scaleX(0.7); opacity: 0.5; }
          100% { transform: translateY(-120px) scaleX(0.3); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
