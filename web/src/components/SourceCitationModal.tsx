import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface StatSource {
  value: string;
  description: string;
  year: string;
  sourceName: string;
  sourceUrl: string;
  methodology?: string;
}

interface SourceCitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  stat: StatSource | null;
}

export function SourceCitationModal({ isOpen, onClose, stat }: SourceCitationModalProps) {
  const { t } = useTranslation();
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();

      if (e.key === 'Tab') {
        const modal = document.getElementById('source-modal');
        if (!modal) return;
        const focusable = modal.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    firstFocusRef.current?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !stat) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        id="source-modal"
        className="
          relative z-10 w-full sm:max-w-lg
          bg-tvk-dark border border-tvk-blue/50
          rounded-t-2xl sm:rounded-2xl
          p-6 space-y-4
          shadow-xl shadow-tvk-blue/10
        "
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="modal-title" className="text-lg font-bold text-tvk-white">
            {t('stats.source', 'Source')}
          </h2>
          <button
            ref={firstFocusRef}
            onClick={onClose}
            className="text-tvk-white/60 hover:text-tvk-white transition-colors shrink-0"
            aria-label={t('common.close', 'Close')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-1">
          <p className="text-3xl font-bold text-tvk-gold">{stat.value}</p>
          <p className="text-tvk-white/80 text-sm leading-relaxed">{stat.description}</p>
        </div>

        <div className="border-t border-tvk-blue/30 pt-4 space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-tvk-white/50 shrink-0">{t('stats.year', 'Year')}:</span>
            <span className="text-tvk-white font-medium">{stat.year}</span>
          </div>

          <div className="flex items-start gap-2 text-sm">
            <span className="text-tvk-white/50 shrink-0">{t('stats.source', 'Source')}:</span>
            <a
              href={stat.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-tvk-blue hover:text-tvk-gold transition-colors underline underline-offset-2 break-all"
            >
              {stat.sourceName}
            </a>
          </div>

          {stat.methodology && (
            <div className="flex items-start gap-2 text-sm">
              <span className="text-tvk-white/50 shrink-0">Method:</span>
              <span className="text-tvk-white/70">{stat.methodology}</span>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="
            w-full mt-2 py-2.5 px-4
            border border-tvk-blue text-tvk-blue
            hover:bg-tvk-blue hover:text-tvk-white
            transition-colors rounded-lg text-sm font-medium
          "
        >
          {t('common.close', 'Close')}
        </button>
      </div>
    </div>
  );
}
