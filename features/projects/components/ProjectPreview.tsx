import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { projectPreviewUrl } from '@/features/projects/lib/preview';
import type { ProjectSummary } from '@/features/projects/types';

type Props = {
  thumbnail: ProjectSummary['thumbnail'];
  title: string;
  variant: 'listing' | 'detail';
};

export default function ProjectPreview({ thumbnail, title, variant }: Props) {
  const listing = variant === 'listing';
  const width = listing ? 900 : 1800;
  const preview = projectPreviewUrl(thumbnail, width);

  return (
    <div className={listing ? 'portfolio-work-card-preview' : 'portfolio-project-detail-preview'}>
      {preview ? (
        <Image
          src={preview}
          alt={`${title} project preview`}
          width={width}
          height={listing ? 506 : 1013}
          sizes={
            listing
              ? '(min-width: 1216px) 516px, (min-width: 768px) calc((100vw - 184px) / 2), (min-width: 640px) calc(100vw - 112px), calc(100vw - 80px)'
              : '(min-width: 1216px) 1152px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)'
          }
          className="portfolio-project-detail-image"
        />
      ) : (
        <div className="portfolio-project-placeholder">
          <ImageIcon size={listing ? 28 : 32} strokeWidth={1.25} aria-hidden="true" />
          <span>Preview unavailable</span>
        </div>
      )}
    </div>
  );
}
