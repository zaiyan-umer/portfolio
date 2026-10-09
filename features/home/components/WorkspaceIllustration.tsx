import { useId } from 'react';
import {
  WorkspaceFoliage,
  WorkspaceGlow,
  WorkspaceRestingSteam,
  WorkspaceSteam,
} from '@/features/home/components/WorkspaceHoverScene';

/** Server-rendered drawing; small client groups provide coordinated hover atmosphere. */
export default function WorkspaceIllustration() {
  const prefix = `workspace-${useId().replace(/:/g, '')}`;
  const paint = (name: string) => `url(#${prefix}-${name})`;

  return (
    <svg viewBox="0 0 580 520" fill="none" className="portfolio-workspace" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${prefix}-backdrop`} x1="120" y1="80" x2="430" y2="425" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--portfolio-art-backdrop)" />
          <stop offset="1" stopColor="var(--portfolio-background)" />
        </linearGradient>
        <linearGradient id={`${prefix}-wood`} x1="235" y1="330" x2="290" y2="425" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--portfolio-art-wood)" />
          <stop offset="1" stopColor="var(--portfolio-art-wood-edge)" />
        </linearGradient>
        <linearGradient id={`${prefix}-device`} x1="20" y1="0" x2="215" y2="185" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--portfolio-art-device-light)" />
          <stop offset="1" stopColor="var(--portfolio-art-device)" />
        </linearGradient>
        <linearGradient id={`${prefix}-ceramic`} x1="411" y1="316" x2="452" y2="357" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--portfolio-art-highlight)" />
          <stop offset=".38" stopColor="var(--portfolio-art-screen)" />
          <stop offset="1" stopColor="var(--portfolio-art-device-light)" />
        </linearGradient>
        <linearGradient id={`${prefix}-leaf`} x1="100" y1="230" x2="156" y2="285" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--portfolio-art-green)" />
          <stop offset="1" stopColor="var(--portfolio-art-leaf-shade)" />
        </linearGradient>
        <linearGradient id={`${prefix}-pot`} x1="99" y1="320" x2="145" y2="368" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--portfolio-art-terracotta)" />
          <stop offset="1" stopColor="var(--portfolio-art-pot-shade)" />
        </linearGradient>
        <radialGradient id={`${prefix}-glow`}>
          <stop stopColor="var(--portfolio-art-blue)" />
          <stop offset="1" stopColor="var(--portfolio-art-blue)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="portfolio-workspace-backdrop">
        <circle cx="292" cy="251" r="207" fill={paint('backdrop')} />
        <ellipse cx="296" cy="449" rx="218" ry="24" fill="var(--portfolio-art-shadow)" opacity=".65" />
        <ellipse cx="299" cy="447" rx="160" ry="13" fill="var(--portfolio-art-contact-shadow)" opacity=".08" />
      </g>
      <g className="portfolio-workspace-desk" stroke="var(--portfolio-art-line)" strokeLinejoin="round">
        {/* Legs meet the underside of the same desktop plane. */}
        <path
          d="M105 381v68m77-20v49m292-71v59"
          stroke="var(--portfolio-art-wood-edge)"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M103 386v61m77-12v40m292-62v50"
          stroke="var(--portfolio-art-line)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity=".5"
        />
        <path d="m74 352 338-27 107 67-339 30-106-70Z" fill={paint('wood')} strokeWidth="1.5" />
        <path d="m74 352 106 70v11L74 363v-11Z" fill="var(--portfolio-art-wood-edge)" strokeWidth="1.5" />
        <path d="m180 422 339-30v11l-339 30v-11Z" fill="var(--portfolio-art-wood-edge)" strokeWidth="1.5" />
        <path
          d="m84 352 326-26 99 62m-324 32 327-29"
          stroke="var(--portfolio-art-highlight)"
          strokeWidth="1.5"
          opacity=".5"
        />
        <path d="m189 409 158-14m-220-36 54-4" stroke="var(--portfolio-art-line)" strokeWidth="1" opacity=".12" />
      </g>
      <g className="portfolio-workspace-contact-shadows" fill="var(--portfolio-art-contact-shadow)">
        <ellipse cx="289" cy="374" rx="56" ry="9" transform="rotate(-5 289 374)" opacity=".18" />
        <ellipse cx="125" cy="365" rx="28" ry="7" transform="rotate(-5 125 365)" opacity=".18" />
        <ellipse cx="436" cy="358" rx="27" ry="7" transform="rotate(-5 436 358)" opacity=".18" />
        <path d="m219 380 111-9 40 26-112 10-39-27Zm164 2 55-5 28 19-55 5-28-19Z" opacity=".15" />
      </g>
      <g className="portfolio-workspace-monitor" stroke="var(--portfolio-art-line)" strokeLinejoin="round">
        <path d="m270 301 29-2 7 60-29 3-7-61Z" fill="var(--portfolio-art-device)" strokeWidth="1.5" />
        <path d="m245 368 58-5 33 15-59 6-32-16Z" fill="var(--portfolio-art-device-light)" strokeWidth="1.5" />
        <path d="m245 368 32 16 59-6v4l-59 6-32-16v-4Z" fill="var(--portfolio-art-device)" strokeWidth="1" />
        <path d="m277 320 4 35" stroke="var(--portfolio-art-highlight)" strokeWidth="2" opacity=".3" />
        <g transform="matrix(1 -.08 0 1 166 149)">
          {/* A narrow rear edge gives the frame thickness without a heavy outline. */}
          <rect x="6" y="4" width="245" height="181" rx="11" fill="var(--portfolio-art-device)" strokeWidth="1.5" />
          <rect width="245" height="181" rx="11" fill={paint('device')} strokeWidth="1.5" />
          <rect x="9" y="10" width="227" height="151" rx="5" fill="var(--portfolio-art-screen)" strokeWidth="1" />
          <WorkspaceGlow>
            <rect
              className="portfolio-workspace-glow-surface"
              x="9"
              y="10"
              width="227"
              height="151"
              rx="5"
              fill={paint('glow')}
              stroke="none"
            />
          </WorkspaceGlow>
          <path
            d="M12 4h220"
            stroke="var(--portfolio-art-highlight)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity=".55"
          />
          <path d="M10 29h225" strokeWidth=".8" opacity=".35" />
          <g stroke="none">
            <circle cx="20" cy="20" r="2.3" fill="var(--portfolio-art-terracotta)" />
            <circle cx="28" cy="20" r="2.3" fill="var(--portfolio-art-wood-edge)" />
            <circle cx="36" cy="20" r="2.3" fill="var(--portfolio-art-green)" />
            <circle cx="123" cy="172" r="2" fill="var(--portfolio-art-line)" opacity=".6" />
          </g>
          <g className="portfolio-workspace-code" strokeLinecap="round">
            <rect
              x="17"
              y="38"
              width="101"
              height="114"
              rx="4"
              fill="var(--portfolio-art-line)"
              fillOpacity=".055"
              stroke="none"
            />
            <path
              d="M26 50h26m-26 12h40m-31 12h47m-47 12h28m-37 12h21m-12 12h41"
              stroke="var(--portfolio-art-blue)"
              strokeWidth="3"
            />
            <path d="M58 50h24m-9 12h28m-33 24h28m-43 12h38" stroke="var(--portfolio-art-terracotta)" strokeWidth="3" />
            <path d="M27 132l4 3-4 3m12-1h14" stroke="var(--portfolio-art-green)" strokeWidth="2" />
          </g>
          <g className="portfolio-workspace-app">
            <rect
              x="127"
              y="38"
              width="101"
              height="114"
              rx="4"
              fill="var(--portfolio-art-blue)"
              fillOpacity=".06"
              stroke="none"
            />
            <path d="M137 51h33m-33 8h66" strokeWidth="2" strokeLinecap="round" opacity=".45" />
            <rect x="137" y="71" width="81" height="35" rx="4" fill="var(--portfolio-art-blue)" stroke="none" />
            <path
              d="M146 82h33m-33 10h54"
              stroke="var(--portfolio-art-screen)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity=".85"
            />
            <rect
              x="137"
              y="115"
              width="36"
              height="26"
              rx="4"
              fill="var(--portfolio-art-terracotta)"
              fillOpacity=".8"
              stroke="none"
            />
            <rect x="181" y="115" width="37" height="26" rx="4" fill="var(--portfolio-art-green)" stroke="none" />
          </g>
          <path
            d="M20 11h74l-24 18H12v-10a8 8 0 0 1 8-8Z"
            fill="var(--portfolio-art-highlight)"
            opacity=".08"
            stroke="none"
          />
        </g>
      </g>
      <g
        className="portfolio-workspace-keyboard"
        transform="matrix(1 -.08 .85 .55 217 374)"
        stroke="var(--portfolio-art-line)"
        strokeLinejoin="round"
      >
        <path d="M0 4h110v43H0Z" fill="var(--portfolio-art-device-light)" strokeWidth="1" />
        <rect width="110" height="42" rx="3" fill="var(--portfolio-art-screen)" strokeWidth="1.2" />
        <g fill="var(--portfolio-art-line)" opacity=".22" stroke="none">
          {[5, 15, 25].map((y) => (
            <g key={y}>
              {Array.from({ length: 11 }, (_, index) => (
                <rect key={index} x={5 + index * 9} y={y} width="6" height="6" rx="1" />
              ))}
            </g>
          ))}
          <rect x="29" y="34" width="51" height="4" rx="1" />
        </g>
      </g>
      <g
        className="portfolio-workspace-plant"
        stroke="var(--portfolio-art-line)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <WorkspaceFoliage>
          <path
            d="M122 324c-1-28 4-57 10-80m-8 43-22-21m24 7 23-29"
            stroke="var(--portfolio-art-leaf-shade)"
            strokeWidth="3"
          />
          <path
            d="M132 264c-17-12-21-31-7-49 17 11 23 32 7 49Zm-12 23c-21 1-38-10-38-30 24-2 40 10 38 30Zm15-16c-2-25 12-42 36-39 0 24-14 39-36 39Z"
            fill={paint('leaf')}
            strokeWidth="1"
          />
          <path
            d="m127 227 5 32m-39 7 20 14m47-39-19 23"
            stroke="var(--portfolio-art-highlight)"
            strokeWidth="1"
            opacity=".35"
          />
        </WorkspaceFoliage>
        <path d="m99 325 47-3-7 38c-3 9-23 11-30 4l-10-39Z" fill={paint('pot')} strokeWidth="1.2" />
        <ellipse
          cx="122"
          cy="323"
          rx="24"
          ry="7"
          transform="rotate(-4 122 323)"
          fill="var(--portfolio-art-terracotta)"
          strokeWidth="1.2"
        />
        <ellipse
          cx="122"
          cy="323"
          rx="19"
          ry="4"
          transform="rotate(-4 122 323)"
          fill="var(--portfolio-art-pot-shade)"
          stroke="none"
        />
        <path d="M107 334l5 22" stroke="var(--portfolio-art-highlight)" strokeWidth="2" opacity=".3" />
      </g>
      <g
        className="portfolio-workspace-notebook"
        transform="matrix(1 -.08 .85 .55 381 373)"
        stroke="var(--portfolio-art-line)"
        strokeLinejoin="round"
      >
        <rect y="4" width="55" height="35" rx="2" fill="var(--portfolio-art-pot-shade)" strokeWidth="1" />
        <rect y="1" width="55" height="35" rx="2" fill="var(--portfolio-art-terracotta)" strokeWidth="1" />
        <path d="M5 0h47v31H5Z" fill="var(--portfolio-art-screen)" strokeWidth=".8" />
        <path d="M12 9h29m-29 6h24m-24 6h27" strokeWidth="1.2" strokeLinecap="round" opacity=".35" />
        <path d="M9 1v29" stroke="var(--portfolio-art-terracotta)" strokeWidth="1.5" opacity=".5" />
      </g>
      <g className="portfolio-workspace-pencil" transform="matrix(1 -.08 .85 .55 369 407)">
        <path d="M0 0h44" stroke="var(--portfolio-art-pot-shade)" strokeWidth="3" strokeLinecap="round" />
        <path d="M0 -1h40" stroke="var(--portfolio-art-terracotta)" strokeWidth="3" strokeLinecap="round" />
        <path d="m40-2 7 2-7 2Z" fill="var(--portfolio-art-wood)" />
        <path d="m45-.6 2 .6-2 .6Z" fill="var(--portfolio-art-line)" />
      </g>
      <g className="portfolio-workspace-mug" stroke="var(--portfolio-art-line)" strokeLinejoin="round">
        <path d="M447 325c20-5 25 22 0 25" stroke="var(--portfolio-art-device-light)" strokeWidth="7" />
        <path d="M447 325c20-5 25 22 0 25" strokeWidth="1.2" />
        <path d="m413 317 37-2-3 37c-1 12-26 14-30 3l-4-38Z" fill={paint('ceramic')} strokeWidth="1.2" />
        <ellipse
          cx="432"
          cy="317"
          rx="19"
          ry="6"
          transform="rotate(-4 432 317)"
          fill="var(--portfolio-art-screen)"
          strokeWidth="1.2"
        />
        <ellipse
          cx="432"
          cy="317"
          rx="15"
          ry="3.5"
          transform="rotate(-4 432 317)"
          fill="var(--portfolio-art-pot-shade)"
          stroke="none"
          opacity=".75"
        />
        <path
          d="m422 327 2 19"
          stroke="var(--portfolio-art-highlight)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity=".5"
        />
        <g className="portfolio-workspace-steam" strokeWidth="1.2" strokeLinecap="round">
          <WorkspaceRestingSteam>
            <path d="M426 301c-8-9 7-13 1-22m13 21c-7-10 7-13 1-22" />
          </WorkspaceRestingSteam>
          <WorkspaceSteam index={0}>
            <path d="M426 301c-8-9 7-13 1-22" />
          </WorkspaceSteam>
          <WorkspaceSteam index={1}>
            <path d="M439 300c-7-10 7-13 1-22" />
          </WorkspaceSteam>
        </g>
      </g>
    </svg>
  );
}
