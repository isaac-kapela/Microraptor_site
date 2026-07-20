'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const posts = [
  'https://www.instagram.com/reel/DWhfJyigQ4v/',
  'https://www.instagram.com/reel/DWm1AdODK9x/',
  'https://www.instagram.com/reel/DWHt9xtAV5U/',
  'https://www.instagram.com/p/DVoXvM0AEKZ/',
  'https://www.instagram.com/p/DYPx2e-Ecv6/',
  'https://www.instagram.com/p/DaiVjgMgODE/',
];

export default function InstagramFeed() {
  const [loaded, setLoaded] = useState(false);

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
          setLoaded(true);
        }}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-5xl mx-auto px-6">
        {posts.map((url, i) => (
          <motion.div
            key={url}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            className="group relative rounded-2xl overflow-hidden border border-white/[0.06] hover:border-[#a80303]/60 transition-all duration-300"
            style={{ height: '320px' }}
          >
            {/* Embed clippado — mostra só a imagem */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ marginBottom: '-120px' }}
            >
              {!loaded && (
                <div className="w-full h-full bg-white/[0.04] animate-pulse flex items-center justify-center">
                  <Icon icon="mdi:instagram" className="text-white/10" width={40} />
                </div>
              )}
              <blockquote
                className="instagram-media !w-full !min-w-0 !m-0"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{
                  background: '#111',
                  border: 'none',
                  borderRadius: '0',
                  boxShadow: 'none',
                  margin: '0',
                  minWidth: '0',
                  padding: '0',
                  width: '100%',
                }}
              />
            </div>

            {/* Gradiente inferior para esconder corte */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

            {/* Hover overlay com link */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-[2px]"
            >
              <div className="flex flex-col items-center gap-2 text-white">
                <Icon icon="mdi:instagram" width={32} height={32} />
                <span className="text-sm font-medium">Ver no Instagram</span>
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Link para o perfil */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="flex justify-center mt-8 relative z-10"
      >
        <a
          href="https://www.instagram.com/microraptorufjf/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.04] hover:border-[#a80303]/50 hover:bg-[#980101]/10 text-gray-400 hover:text-white text-sm font-medium transition-all duration-300"
        >
          <Icon icon="mdi:instagram" width={16} height={16} className="text-[#a80303]" />
          Ver todos no Instagram
          <span className="text-[#a80303] group-hover:translate-x-1 transition-transform duration-200">→</span>
        </a>
      </motion.div>
    </>
  );
}
