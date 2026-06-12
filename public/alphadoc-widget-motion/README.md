# Alphadoc Widget Motion Embed

바이오레 홈페이지에 넣는 Alphadoc 위젯바 모션 정적 번들입니다.

## 파일 구조

```text
public/alphadoc-widget-motion/
  index.html
  assets/
```

`index.html`과 `assets` 폴더를 같은 위치에 두면 동작합니다.

## Vite/React 홈페이지에서 사용

```tsx
<iframe
  src="/alphadoc-widget-motion/index.html"
  title="Alphadoc widget bar motion"
  loading="lazy"
  style={{
    width: "100%",
    maxWidth: 840,
    aspectRatio: "840 / 560",
    minHeight: 430,
    border: 0,
    display: "block",
  }}
/>
```

## 권장 프레임

- PC: `840 x 560`
- 모바일: `390 x 450`
- 모바일 최소 높이: `430px` 이상
- PC 비율: 약 `3:2`
- 모바일 비율: 약 `0.86:1`

## 공통 규격 원칙

- Alphadoc 설명 섹션의 3개 우측 모션은 모두 같은 외곽 프레임을 사용합니다.
- 가장 복잡한 Clinical AI 채팅 모션을 기준 규격으로 삼습니다.
- 다른 모션은 같은 프레임 안에서 내부 UI만 재배치합니다.

## 주의

- 이 번들은 실제 Alphadoc UI 에셋을 축소한 정적 버전입니다.
- `assets` 폴더를 누락하면 로고와 아이콘이 깨집니다.
- 총 원시 용량은 약 `126KB`입니다.
