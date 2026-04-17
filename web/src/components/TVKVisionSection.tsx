import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  educationStats,
  healthcareStats,
  lawAndOrderStats,
  economyStats,
  agricultureStats,
  infrastructureStats,
} from '../data';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface VisionItem {
  domain: string;
  domainTa: string;
  icon: string;
  problemStat: string;
  problemStatTa: string;
  promise: string;
  promiseTa: string;
  target: string;
  targetTa: string;
}

function getTopNegativeStat(stats: { description: string; descriptionTa?: string; value: string | number; unit?: string; isNegative?: boolean }[]) {
  const neg = stats.find((s) => s.isNegative);
  return neg ?? stats[0];
}

const edStat = getTopNegativeStat(educationStats);
const hcStat = getTopNegativeStat(healthcareStats);
const loStat = getTopNegativeStat(lawAndOrderStats);
const ecStat = getTopNegativeStat(economyStats);
const agStat = getTopNegativeStat(agricultureStats);
const inStat = getTopNegativeStat(infrastructureStats);

const VISION_ITEMS: VisionItem[] = [
  {
    domain: 'Education',
    domainTa: 'கல்வி',
    icon: '📚',
    problemStat: `${edStat.value}${edStat.unit ?? ''} — ${edStat.description.slice(0, 80)}`,
    problemStatTa: edStat.descriptionTa ?? edStat.description,
    promise: 'NEET exemption for TN students. Upgrade all government schools with labs, computers, and trained teachers. Double education budget allocation.',
    promiseTa: 'TN மாணவர்களுக்கு NEET விலக்கு. அனைத்து அரசு பள்ளிகளையும் ஆய்வகங்கள், கணினிகள், பயிற்சி பெற்ற ஆசிரியர்களுடன் மேம்படுத்துதல். கல்வி பட்ஜெட்டை இரட்டிப்பாக்குதல்.',
    target: '75% government school enrollment by 2031',
    targetTa: '2031 க்குள் 75% அரசு பள்ளி சேர்க்கை',
  },
  {
    domain: 'Healthcare',
    domainTa: 'சுகாதாரம்',
    icon: '🏥',
    problemStat: `${hcStat.value}${hcStat.unit ?? ''} — ${hcStat.description.slice(0, 80)}`,
    problemStatTa: hcStat.descriptionTa ?? hcStat.description,
    promise: 'One PHC per 15,000 people. Fill all vacant doctor and nurse positions. Free diagnostic centers in every taluk. Mental health support in all district hospitals.',
    promiseTa: 'ஒவ்வொரு 15,000 பேருக்கும் ஒரு PHC. அனைத்து காலி மருத்துவர், செவிலியர் பணியிடங்களை நிரப்புதல். ஒவ்வொரு தாலுகாவிலும் இலவச கண்டறிதல் மையங்கள்.',
    target: '1 doctor per 1,000 population by 2030',
    targetTa: '2030 க்குள் 1,000 பேருக்கு 1 மருத்துவர்',
  },
  {
    domain: 'Law & Order',
    domainTa: 'சட்டம் & ஒழுங்கு',
    icon: '⚖️',
    problemStat: `${loStat.value}${loStat.unit ?? ''} — ${loStat.description.slice(0, 80)}`,
    problemStatTa: loStat.descriptionTa ?? loStat.description,
    promise: 'Fast-track courts for caste atrocity cases. Mandatory bodycams for all police. Zero tolerance for custodial violence. Witness protection program.',
    promiseTa: 'சாதி கொடுமை வழக்குகளுக்கு விரைவு நீதிமன்றங்கள். அனைத்து காவல்துறைக்கும் கட்டாய பாடிகேம்கள். காவல் வன்முறைக்கு பூஜ்ஜிய சகிப்புத்தன்மை.',
    target: '50% conviction rate for SC/ST cases by 2030',
    targetTa: '2030 க்குள் SC/ST வழக்குகளில் 50% தண்டனை விகிதம்',
  },
  {
    domain: 'Economy',
    domainTa: 'பொருளாதாரம்',
    icon: '💰',
    problemStat: `${ecStat.value}${ecStat.unit ?? ''} — ${ecStat.description.slice(0, 80)}`,
    problemStatTa: ecStat.descriptionTa ?? ecStat.description,
    promise: 'MSME revival fund of ₹10,000 crore. Skill development centers in every district. Transparent fiscal management — no off-budget borrowing.',
    promiseTa: '₹10,000 கோடி MSME புத்துயிர் நிதி. ஒவ்வொரு மாவட்டத்திலும் திறன் மேம்பாட்டு மையங்கள். வெளிப்படையான நிதி மேலாண்மை.',
    target: 'Reduce fiscal deficit to 2.5% of GSDP',
    targetTa: 'நிதிப் பற்றாக்குறையை GSDP இன் 2.5% ஆக குறைத்தல்',
  },
  {
    domain: 'Agriculture',
    domainTa: 'விவசாயம்',
    icon: '🌾',
    problemStat: `${agStat.value}${agStat.unit ?? ''} — ${agStat.description.slice(0, 80)}`,
    problemStatTa: agStat.descriptionTa ?? agStat.description,
    promise: 'MSP guarantee for all major crops. Crop insurance within 30 days of loss. Interest-free farm loans up to ₹3 lakh. Cold storage in every block.',
    promiseTa: 'அனைத்து முக்கிய பயிர்களுக்கும் MSP உத்தரவாதம். இழப்பின் 30 நாட்களுக்குள் பயிர் காப்பீடு. ₹3 லட்சம் வரை வட்டியில்லா விவசாயக் கடன்.',
    target: 'Zero farmer suicides — debt relief within 6 months',
    targetTa: 'பூஜ்ஜிய விவசாயி தற்கொலை — 6 மாதங்களில் கடன் நிவாரணம்',
  },
  {
    domain: 'Infrastructure',
    domainTa: 'உள்கட்டமைப்பு',
    icon: '🏗️',
    problemStat: `${inStat.value}${inStat.unit ?? ''} — ${inStat.description.slice(0, 80)}`,
    problemStatTa: inStat.descriptionTa ?? inStat.description,
    promise: 'Complete Chennai Metro Phase 2 on schedule. Stormwater drain overhaul for all flood-prone cities. 100% piped water to every household by 2028.',
    promiseTa: 'சென்னை மெட்ரோ கட்டம் 2 ஐ நிர்ணயிக்கப்பட்ட காலத்தில் முடித்தல். வெள்ளம் பாதிக்கும் நகரங்களுக்கு மழைநீர் வடிகால் மேம்படுத்தல்.',
    target: '100% piped water coverage by 2028',
    targetTa: '2028 க்குள் 100% குழாய் நீர்',
  },
];

export function TVKVisionSection() {
  const { i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isTamil = i18n.language === 'ta';

  useGSAP(
    () => {
      gsap.fromTo(
        '.vision-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
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
    <section id="vision" ref={sectionRef} className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-black text-tvk-gold sm:text-4xl lg:text-5xl">
            {isTamil ? 'TVK தொலைநோக்கு' : 'TVK Vision'}
          </h2>
          <p className="mx-auto max-w-xl text-sm text-tvk-white/50 sm:text-base">
            {isTamil
              ? 'கோபத்திற்குப் பிறகு, நம்பிக்கை. இது TVK இன் உறுதிமொழி.'
              : 'After the anger, hope. This is what TVK promises to change.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {VISION_ITEMS.map((item) => (
            <div
              key={item.domain}
              className="vision-card overflow-hidden rounded-xl border border-tvk-blue/30 bg-tvk-blue/5"
            >
              <div className="flex items-stretch">
                <div className="flex-1 border-r border-tvk-fire/20 bg-red-950/20 p-5">
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-tvk-fire">
                    {isTamil ? 'தற்போது' : 'Current Reality'}
                  </div>
                  <div className="mb-1 text-lg">{item.icon}</div>
                  <h3 className="mb-2 text-sm font-bold text-tvk-white">
                    {isTamil ? item.domainTa : item.domain}
                  </h3>
                  <p className="text-xs leading-relaxed text-tvk-white/60">
                    {isTamil ? item.problemStatTa : item.problemStat}
                  </p>
                </div>

                <div className="flex-1 bg-tvk-blue/10 p-5">
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-tvk-gold">
                    {isTamil ? 'TVK உறுதிமொழி' : 'TVK Promise'}
                  </div>
                  <p className="mb-3 text-xs leading-relaxed text-tvk-white/80">
                    {isTamil ? item.promiseTa : item.promise}
                  </p>
                  <div className="rounded-lg border border-tvk-gold/30 bg-tvk-gold/10 px-3 py-2 text-xs font-bold text-tvk-gold">
                    🎯 {isTamil ? item.targetTa : item.target}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
