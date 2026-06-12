import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-viore-surface border-t border-viore-border">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 py-8 flex flex-col gap-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-[620px] space-y-3">
            <img
              src="/brand/viore/logotype.png"
              alt="Viore"
              className="h-4 w-auto object-contain opacity-50"
            />
            <p className="text-[12px] leading-5 text-viore-faint">{t('footer_identity')}</p>
          </div>
          <div className="flex items-center gap-4 text-[12px] text-viore-faint">
            <a
              href="/viore/"
              className="hover:text-viore-muted transition-colors cursor-pointer whitespace-nowrap"
            >
              {t('footer_viore')}
            </a>
            <a
              href="https://alphadoc.ai/legal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-viore-muted transition-colors cursor-pointer whitespace-nowrap"
            >
              {t('footer_legal_notice')}
            </a>
            <a
              href="mailto:sj@vioreai.com"
              rel="nofollow"
              className="hover:text-viore-muted transition-colors cursor-pointer whitespace-nowrap"
            >
              sj@vioreai.com
            </a>
          </div>
        </div>
        <p className="text-[12px] text-viore-faint">{t('footer_copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;
