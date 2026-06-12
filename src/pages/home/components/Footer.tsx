import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-viore-surface border-t border-viore-border">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 py-8 flex flex-col gap-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <img
            src="/brand/viore/logotype.png"
            alt="Viore"
            className="h-4 w-auto object-contain opacity-50"
          />
          <div className="flex flex-wrap items-center gap-4 text-[12px] text-viore-faint sm:justify-end">
            <a
              href="https://alphadoc.ai/legal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-viore-muted transition-colors cursor-pointer whitespace-nowrap"
            >
              {t('footer_legal_notice')}
            </a>
            <span className="whitespace-nowrap">{t('footer_copyright')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
