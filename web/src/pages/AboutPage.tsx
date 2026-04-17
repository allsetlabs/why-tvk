import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DISTRICTS = [
  'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore',
  'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram',
  'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam',
  'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram',
  'Ranipet', 'Salem', 'Sivagangai', 'Tenkasi', 'Thanjavur',
  'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur',
  'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore',
  'Viluppuram', 'Virudhunagar',
];

const MILESTONES = [
  { year: '2024', key: 'partyFounded' },
  { year: '2024', key: 'firstConference' },
  { year: '2025', key: 'grassroots' },
  { year: '2026', key: 'manifestoLaunch' },
];

export function AboutPage() {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', district: '', ward: '' });
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(
        '.about-animate',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>{isTamil ? 'TVK பற்றி — இணையுங்கள்' : 'About TVK — Join Us'}</title>
        <meta
          name="description"
          content={isTamil
            ? 'தமிழக வெற்றி கழகம் பற்றி அறிந்துகொள்ளுங்கள். தன்னார்வலராக இணையுங்கள்.'
            : 'Learn about Tamilaga Vettri Kazhagam. Join as a volunteer and be part of the change.'}
        />
      </Helmet>

      <div ref={sectionRef} className="px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">

          {/* Hero */}
          <div className="about-animate mb-16 text-center">
            <div className="mb-6 text-6xl">🐅</div>
            <h1 className="mb-4 text-4xl font-black text-tvk-gold sm:text-5xl">
              {t('about.title')}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-tvk-white/60">
              {t('about.subtitle')}
            </p>
          </div>

          {/* Vijay's Vision */}
          <section className="about-animate mb-16 rounded-xl border border-tvk-blue/30 bg-tvk-blue/5 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-black text-tvk-white sm:text-3xl">
              {t('about.visionTitle')}
            </h2>
            <blockquote className="border-l-4 border-tvk-gold pl-4 text-tvk-white/70 italic">
              {t('about.visionQuote')}
            </blockquote>
            <p className="mt-4 leading-relaxed text-tvk-white/60">
              {t('about.visionBody')}
            </p>
          </section>

          {/* Party Timeline */}
          <section className="about-animate mb-16">
            <h2 className="mb-8 text-center text-2xl font-black text-tvk-white sm:text-3xl">
              {t('about.timelineTitle')}
            </h2>
            <div className="relative border-l-2 border-tvk-blue/30 pl-8">
              {MILESTONES.map((ms, i) => (
                <div key={i} className="about-animate relative mb-8 last:mb-0">
                  <div className="absolute -left-[2.55rem] top-1 h-4 w-4 rounded-full border-2 border-tvk-gold bg-tvk-dark" />
                  <span className="text-xs font-bold text-tvk-gold">{ms.year}</span>
                  <p className="mt-1 text-sm text-tvk-white/70">{t(`about.milestone.${ms.key}`)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Core Principles */}
          <section className="about-animate mb-16">
            <h2 className="mb-8 text-center text-2xl font-black text-tvk-white sm:text-3xl">
              {t('about.principlesTitle')}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(['transparency', 'dataFirst', 'youthPower', 'socialJustice'] as const).map((key) => (
                <div key={key} className="about-animate rounded-lg border border-tvk-blue/20 bg-tvk-blue/5 p-5">
                  <h3 className="mb-2 text-sm font-bold text-tvk-gold">{t(`about.principle.${key}.title`)}</h3>
                  <p className="text-xs leading-relaxed text-tvk-white/60">{t(`about.principle.${key}.desc`)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Join / Volunteer Form */}
          <section className="about-animate rounded-xl border-2 border-tvk-gold/30 bg-gradient-to-b from-tvk-blue/10 to-tvk-dark p-6 sm:p-8">
            <h2 className="mb-2 text-center text-2xl font-black text-tvk-gold sm:text-3xl">
              {t('about.joinTitle')}
            </h2>
            <p className="mb-8 text-center text-sm text-tvk-white/50">
              {t('about.joinSubtitle')}
            </p>

            {submitted ? (
              <div className="py-12 text-center">
                <div className="mb-4 text-5xl">✊</div>
                <h3 className="mb-2 text-xl font-bold text-tvk-gold">{t('about.thankYou')}</h3>
                <p className="text-sm text-tvk-white/60">{t('about.thankYouMsg')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
                <div>
                  <label htmlFor="vol-name" className="mb-1 block text-xs font-bold text-tvk-white/50">
                    {t('about.form.name')}
                  </label>
                  <input
                    id="vol-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="w-full rounded-lg border border-tvk-blue/30 bg-tvk-dark px-4 py-2.5 text-sm text-tvk-white placeholder:text-tvk-white/30 focus:border-tvk-gold focus:outline-none"
                    placeholder={t('about.form.namePlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="vol-phone" className="mb-1 block text-xs font-bold text-tvk-white/50">
                    {t('about.form.phone')}
                  </label>
                  <input
                    id="vol-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full rounded-lg border border-tvk-blue/30 bg-tvk-dark px-4 py-2.5 text-sm text-tvk-white placeholder:text-tvk-white/30 focus:border-tvk-gold focus:outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label htmlFor="vol-district" className="mb-1 block text-xs font-bold text-tvk-white/50">
                    {t('about.form.district')}
                  </label>
                  <select
                    id="vol-district"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData((p) => ({ ...p, district: e.target.value }))}
                    className="w-full rounded-lg border border-tvk-blue/30 bg-tvk-dark px-4 py-2.5 text-sm text-tvk-white focus:border-tvk-gold focus:outline-none"
                  >
                    <option value="">{t('about.form.selectDistrict')}</option>
                    {DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="vol-ward" className="mb-1 block text-xs font-bold text-tvk-white/50">
                    {t('about.form.ward')}
                  </label>
                  <input
                    id="vol-ward"
                    type="text"
                    value={formData.ward}
                    onChange={(e) => setFormData((p) => ({ ...p, ward: e.target.value }))}
                    className="w-full rounded-lg border border-tvk-blue/30 bg-tvk-dark px-4 py-2.5 text-sm text-tvk-white placeholder:text-tvk-white/30 focus:border-tvk-gold focus:outline-none"
                    placeholder={t('about.form.wardPlaceholder')}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-tvk-gold py-3 text-sm font-black text-tvk-dark transition-colors hover:bg-tvk-gold/90"
                >
                  {t('about.form.submit')}
                </button>
              </form>
            )}
          </section>

        </div>
      </div>
    </>
  );
}
