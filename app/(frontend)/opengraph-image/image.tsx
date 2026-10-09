import { ImageResponse } from 'next/og';
import { siteOrigin } from '@/lib/site';
import { socialPreview } from '@/lib/metadata';

export const alt = socialPreview.alt;
export const size = { width: socialPreview.width, height: socialPreview.height };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', padding: '64px 76px', background: '#f6efe3',
          color: '#302a26', fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#2f4fc7' }} />
          <span style={{ fontSize: 24, color: '#65584b', letterSpacing: 2 }}>FULL-STACK DEVELOPER</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', fontSize: 112, fontWeight: 700, letterSpacing: -6, lineHeight: 1.1 }}>
            <span>Zaiyan&nbsp;</span><span style={{ color: '#2f4fc7' }}>Umer.</span>
          </div>
          <svg width="620" height="28" viewBox="0 0 620 28" fill="none">
            <path d="M4 18C130 3 318 6 610 12M12 24C160 12 360 15 604 20" stroke="#2f4fc7" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #cdbda8', paddingTop: 24 }}>
          <span style={{ fontSize: 30, fontWeight: 700 }}>{new URL(siteOrigin).hostname}</span>
          <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
            <path d="M9 37L37 9M9 9H37V37" stroke="#2f4fc7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    ),
    { ...size, headers: { 'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800' } },
  );
}
