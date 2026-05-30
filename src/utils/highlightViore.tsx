import { Fragment } from 'react';

const TEAL = '#0E6E6E';

/**
 * "바이오레" 또는 "Viore" 단어를 브랜드 틸 컬러로 하이라이트합니다.
 */
export const highlightViore = (text: string) => {
  // Split on both KO and EN brand names
  const regex = /(바이오레|Viore)/g;
  const parts = text.split(regex);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) =>
        part === '바이오레' || part === 'Viore' ? (
          <Fragment key={i}>
            <span style={{ color: TEAL, fontWeight: 600 }}>{part}</span>
          </Fragment>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
};