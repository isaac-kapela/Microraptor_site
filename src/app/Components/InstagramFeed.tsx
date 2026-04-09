'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const posts = [
  'https://www.instagram.com/reel/DWhfJyigQ4v/',
  'https://www.instagram.com/reel/DWm1AdODK9x/',
  'https://www.instagram.com/reel/DWHt9xtAV5U/',
  'https://www.instagram.com/p/DVoXvM0AEKZ/',
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto px-6">
        {posts.map((url, i) => (
          <motion.div
            key={url}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative rounded-2xl p-px bg-gradient-to-br from-[#a80303]/40 via-white/5 to-transparent hover:from-[#a80303]/70 hover:via-white/10 transition-all duration-300"
          >
            {/* Glow de fundo no hover */}
            <div className="absolute inset-0 rounded-2xl bg-[#a80303]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />

            <div className="rounded-2xl overflow-hidden bg-[#0a0000]">
              {/* Esqueleto enquanto carrega */}
              {!loaded && (
                <div className="w-full aspect-[9/16] bg-white/[0.04] animate-pulse flex items-center justify-center">
                  <span className="text-gray-700 text-xs tracking-widest uppercase font-medium">Carregando...</span>
                </div>
              )}

              <blockquote
                className="instagram-media !w-full !min-w-0 !m-0"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{
                  background: '#000',
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
          </motion.div>
        ))}
      </div>

      {/* Link para o 
       */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex justify-center mt-8"
      >
        <a
          href="https://www.instagram.com/microraptorufjf/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.04] hover:border-[#a80303]/50 hover:bg-[#980101]/10 text-gray-400 hover:text-white text-sm font-medium transition-all duration-300"
        >
          Ver todos no Instagram
          <span className="text-[#a80303] group-hover:translate-x-1 transition-transform duration-200">→</span>
        </a>
      </motion.div>
    </>
  );
}
