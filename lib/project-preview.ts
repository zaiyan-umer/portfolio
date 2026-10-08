import type { ProjectSummary } from '@/lib/project.types';
import { urlFor } from '@/sanity/lib/imgUrl';

/** Fit the complete screenshot without applying editorial crop/hotspot settings. */
export function projectPreviewUrl(thumbnail: ProjectSummary['thumbnail'], width = 1800): string | null {
  if (!thumbnail) return null;
  try {
    const src = urlFor(thumbnail).ignoreImageParams().width(width).fit('max').quality(85).auto('format').url();
    const url = new URL(src);
    return url.protocol === 'https:' && url.hostname === 'cdn.sanity.io' ? src : null;
  } catch {
    return null;
  }
}
