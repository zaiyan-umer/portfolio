'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

function IconVariant({ src, name, className }: { src: string; name: string; className?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className={cn('portfolio-tech-icon-variant', className)}>
      {failed ? (
        <span className="portfolio-tech-initial">{name.slice(0, 2).toUpperCase()}</span>
      ) : (
        <Image src={src} alt="" width={28} height={28} unoptimized onError={() => setFailed(true)} />
      )}
    </span>
  );
}

export function TechnologyIcon({ iconKey, name, themed }: { iconKey: string; name: string; themed: boolean }) {
  const base = `https://ik.imagekit.io/mllj8vxiah/${encodeURIComponent(iconKey)}`;

  return (
    <span className="portfolio-tech-icon" aria-hidden="true">
      {!iconKey ? <span className="portfolio-tech-initial">{name.slice(0, 2).toUpperCase()}</span> : themed ? (
        <>
          <IconVariant key={`${base}-light.svg`} src={`${base}-light.svg`} name={name} className="portfolio-tech-icon-light" />
          <IconVariant key={`${base}-dark.svg`} src={`${base}-dark.svg`} name={name} className="portfolio-tech-icon-dark" />
        </>
      ) : <IconVariant key={`${base}.svg`} src={`${base}.svg`} name={name} />}
    </span>
  );
}
