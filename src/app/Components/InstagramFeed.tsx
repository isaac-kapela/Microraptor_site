'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const posts = [
  'https://www.instagram.com/reel/DWhfJyigQ4v/',
  'https://www.instagram.com/reel/DWm1AdODK9x/',
  'https://www.instagram.com/reel/DWHt9xtAV5U/',
  'https://www.instagram.com/p/DVoXvM0AEKZ/',
];

export default function InstagramFeed() {
  // Re-processa os embeds caso o script já esteja carregado
  useEffect(() => {
    // @ts-expect-error – global do embed.js do Instagram
    if (window.instgrm) window.instgrm.Embeds.process();
  }, []);

  return (
    <>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          // @ts-expect-error – global do embed.js do Instagram
          if (window.instgrm) window.instgrm.Embeds.process();
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
        {posts.map((url) => (
          <div key={url} className="flex justify-center">
            <blockquote
              className="instagram-media w-full"
              data-instgrm-permalink={url}
              data-instgrm-version="14"
              style={{
                background: '#FFF',
                border: '0',
                borderRadius: '12px',
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                margin: '0',
                minWidth: '220px',
                padding: '0',
                width: '100%',
              }}
            />
          </div>
        ))}
      </div>
    </>

);
}
