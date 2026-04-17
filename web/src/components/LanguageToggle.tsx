import { useTranslation } from 'react-i18next';

export function LanguageToggle() {
  const { t, i18n } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ta' ? 'en' : 'ta');
  };

  return (
    <button
      onClick={toggle}
      className="rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors duration-200"
      style={{ backgroundColor: '#1B4FD8' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F5C518';
        (e.currentTarget as HTMLButtonElement).style.color = '#000';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1B4FD8';
        (e.currentTarget as HTMLButtonElement).style.color = '#fff';
      }}
    >
      {t('nav.language')}
    </button>
  );
}
