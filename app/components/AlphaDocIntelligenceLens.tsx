export function AlphaDocIntelligenceLens() {
  return (
    <span className="orchestration-lens" aria-hidden="true">
      <span className="intelligence-lens-object">
        <svg viewBox="0 0 1448 1086" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="intelligence-lens-white-key" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 0 2.98"
                result="whiteKeyedLens"
              />
              <feComponentTransfer in="whiteKeyedLens" result="clarifiedLens">
                <feFuncA type="gamma" amplitude="1.55" exponent="0.52" offset="0" />
              </feComponentTransfer>
              <feComposite in="clarifiedLens" in2="SourceAlpha" operator="in" />
            </filter>
          </defs>
          <image
            href="/media/alphadoc-intelligence-lens.png"
            width="1448"
            height="1086"
            filter="url(#intelligence-lens-white-key)"
          />
        </svg>
      </span>
      <span className="intelligence-lens-sheen" />
    </span>
  );
}
