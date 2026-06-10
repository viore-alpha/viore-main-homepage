# Alphadoc Clinical AI Chat Motion

Viore homepage Alphadoc explanation section에 넣기 위한 standalone motion artifact입니다.

## Files

- `index.html`: motion demo 본문
- `alphadoc_clinical_ai_chat_motion_assets/`: 로고, 알파윙, 기능 아이콘, 업로드 썸네일 자산

`index.html`과 assets 폴더는 같은 경로에 같이 배포해야 합니다.

## Recommended Frame

- Desktop: 840 x 560px
- Mobile: 390 x 450px
- Mobile minimum height: 430px

## Simple Embed

```html
<iframe
  src="/path/to/alphadoc-clinical-ai-chat-motion/index.html"
  title="Alphadoc Clinical AI Chat Motion"
  width="840"
  height="560"
  loading="lazy"
  style="width:100%;max-width:840px;aspect-ratio:3/2;border:0;border-radius:28px;overflow:hidden;"
></iframe>
```

Mobile CSS example:

```css
@media (max-width: 640px) {
  .alphadoc-motion-frame {
    max-width: 390px;
    height: 450px;
    min-height: 430px;
    aspect-ratio: auto;
    border-radius: 24px;
  }
}
```

## Notes

- Current HTML size is about 51KB. Total local assets are about 154KB.
- The file uses CDN links for Pretendard and Remix Icon. If the production site already loads those globally, they can be removed after confirming icons still render.
- Do not move or rename the assets folder unless the `src` paths in `index.html` are updated together.
