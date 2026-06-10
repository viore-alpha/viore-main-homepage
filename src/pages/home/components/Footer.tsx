import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-viore-surface border-t border-viore-border">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <img
          src="https://storage.readdy-site.link/project_files/f0121b54-b4dd-49ef-9b9a-70a9b6263ce6/cdecc015-3612-48e5-96cf-4d67c12a1a43_viore-eng-logotype.png?v=c244b85742c4ab34af42521986a4c558"
          alt="Viore"
          className="h-4 w-auto object-contain opacity-50"
        />
        <p className="text-[12px] text-viore-faint">{t('footer_copyright')}</p>
        <div className="flex items-center gap-4 text-[12px] text-viore-faint">
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
    </footer>
  );
};

export default Footer;
