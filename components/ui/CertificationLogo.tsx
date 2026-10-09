'use client';

import Image from 'next/image';
import { Award } from 'lucide-react';
import { useState } from 'react';

function LogoImage({ src, issuer }: { src: string | null; issuer: string }) {
  const [failed, setFailed] = useState(false);
  const initials = issuer.split(/\s+/).filter(Boolean).slice(0, 2).map(word => word[0]).join('').toUpperCase();

  return src && !failed ? (
    <Image src={src} alt="" width={40} height={40} unoptimized loading="lazy" onError={() => setFailed(true)} />
  ) : initials ? <span>{initials}</span> : <Award size={22} strokeWidth={1.5} />;
}

export function CertificationLogo({ src, issuer }: { src: string | null; issuer: string }) {
  return <span className="portfolio-certification-logo" aria-hidden="true"><LogoImage key={src || 'missing'} src={src} issuer={issuer} /></span>;
}
