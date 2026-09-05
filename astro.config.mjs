// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// See https://docs.astro.build/en/guides/deploy/github/
// See https://starlight.astro.build/getting-started/
export default defineConfig({
  adapter: cloudflare(),
  site: 'https://docs.p3dual.com',
  integrations: [
    starlight({
      title: 'Docs',
      favicon: '/favicon.ico',
      // https://starlight.astro.build/reference/icons/
      social: [
        {
          icon: 'discord',
          label: 'Discord',
          href: 'https://discord.gg/CQnkc5gS6a',
        },
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/p3d-project/persona-3-dual',
        },
      ],
      customCss: ['./src/styles/starlight.css'],
      components: {
        SiteTitle: './src/components/SiteTitle.astro',
      },
      expressiveCode: {
        shiki: {
          // workerd not liking webassembly
          engine: 'javascript',
        },
      },
      sidebar: [
        { label: 'Home', link: '/' },
        { label: 'Roadmap', link: 'roadmap' },
        {
          label: 'Guides',
          items: [{ autogenerate: { directory: 'guides' } }],
        },
        {
          label: 'Milestones',
          items: [{ autogenerate: { directory: 'milestones' } }],
        },
        {
          label: 'References',
          items: [{ autogenerate: { directory: 'references' } }],
        },
        { label: 'Credits', link: 'credits' },
      ],
    }),
    react(),
    markdoc(),
    keystatic(),
  ],
  vite: {
    plugins: [tailwindcss()],
    // https://github.com/expressive-code/expressive-code/issues/439
    optimizeDeps: {
      include: ['@astrojs/starlight>astro-expressive-code'],
    },
  },
});
