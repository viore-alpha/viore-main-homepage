import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const navLinks = [
  { key: 'nav_main', href: '/' },
  { key: 'nav_alphadoc', href: '#alphadoc' },
  { key: 'nav_people', href: '#advisory' },
  { key: 'nav_direction', href: '#vision' },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [pathname, setPathname] = useState(window.location.pathname);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onNavigate = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onNavigate);
    window.addEventListener('viore:navigate', onNavigate);
    return () => {
      window.removeEventListener('popstate', onNavigate);
      window.removeEventListener('viore:navigate', onNavigate);
    };
  }, []);

  const navigate = (to: string) => {
    window.history.pushState(null, '', to);
    window.dispatchEvent(new Event('viore:navigate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLang = () => {
    const isKo = i18n.language === 'ko';
    if (isKo) {
      // EN 전환 → /global 이동 (GlobalPage가 i18n을 en으로 자동 처리)
      navigate('/global');
    } else {
      // KO 전환 → / 이동 (GlobalPage unmount 시 ko 복원)
      navigate('/');
    }
  };

  const isGlobal = pathname === '/global';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-black/[0.06]'
            : 'bg-transparent'
        }`}
        style={{ transitionDuration: '400ms' }}
      >
        <div
          className={`flex items-center justify-between px-6 md:px-10 lg:px-16 transition-all duration-400 ${
            scrolled ? 'h-14' : 'h-16'
          }`}
        >
          {/* Logo */}
          <a href="/" className="flex items-center cursor-pointer">
            <img
              src="https://storage.readdy-site.link/project_files/f0121b54-b4dd-49ef-9b9a-70a9b6263ce6/cdecc015-3612-48e5-96cf-4d67c12a1a43_viore-eng-logotype.png?v=c244b85742c4ab34af42521986a4c558"
              alt="Viore"
              className="h-6 w-auto object-contain"
            />
          </a>

          {/* Desktop center nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="nav-link whitespace-nowrap"
              >
                {t(link.key)}
              </a>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="text-[12px] font-medium text-viore-muted hover:text-viore-text transition-colors cursor-pointer tracking-wide"
            >
              {isGlobal ? t('lang_ko') : t('lang_en')}
            </button>
            <a
              href="#contact"
              className="inline-flex items-center px-5 py-2 rounded-[14px] text-[13px] font-semibold text-white bg-viore-teal hover:bg-viore-teal-mid transition-all duration-300 hover:translate-y-[-1px] whitespace-nowrap cursor-pointer"
            >
              {t('nav_contact')}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴 열기"
          >
            <span
              className={`block h-[1.5px] bg-viore-text transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] bg-viore-text transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] bg-viore-text transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-viore-bg flex flex-col justify-center px-8 transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-8">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-3xl font-light text-viore-text hover:text-viore-teal transition-colors cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              {t(link.key)}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-4 inline-flex items-center self-start px-6 py-3 rounded-[14px] text-[14px] font-semibold text-white bg-viore-teal whitespace-nowrap cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            {t('nav_contact')}
          </a>
        </nav>
        <div className="mt-10 pt-8 border-t border-viore-border">
          <button
            onClick={() => { toggleLang(); setMenuOpen(false); }}
            className="text-sm text-viore-muted hover:text-viore-text transition-colors tracking-wider cursor-pointer"
          >
            {isGlobal ? '한국어' : 'English'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
