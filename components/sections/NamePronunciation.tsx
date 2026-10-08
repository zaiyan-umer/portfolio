'use client';

import { Volume2 } from 'lucide-react';
import { useRef, useState } from 'react';

export default function NamePronunciation() {
  const audio = useRef<HTMLAudioElement>(null);
  const [error, setError] = useState(false);

  async function pronounceName() {
    if (!audio.current) return;
    setError(false);
    try {
      audio.current.currentTime = 0;
      await audio.current.play();
    } catch {
      setError(true);
    }
  }

  return (
    <div className="portfolio-pronunciation">
      <button type="button" onClick={pronounceName} aria-label="Hear how to pronounce Zaiyan Umer">
        <Volume2 size={16} aria-hidden="true" />
        <span>How to say my name</span>
      </button>
      <audio ref={audio} src="/name-pronounciation.mp3" preload="none" />
      <span role="status" className="portfolio-audio-status">
        {error ? 'Audio unavailable. Please try again.' : ''}
      </span>
    </div>
  );
}
