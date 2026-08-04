// Rasterizes the brand SVGs in /public into the PNGs referenced by index.html
// (OG share image, apple-touch icon, favicon fallbacks). Run: node scripts/generate-images.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const pub = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public');

const render = (svgPath, outPath, width) => {
  const svg = readFileSync(resolve(pub, svgPath), 'utf8');
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true },
    background: 'rgba(0,0,0,0)',
  });
  writeFileSync(resolve(pub, outPath), resvg.render().asPng());
  console.log(`✓ ${outPath} (${width}px wide)`);
};

render('og-image.svg', 'og-image.png', 1200);
render('favicon.svg', 'apple-touch-icon.png', 180);
render('favicon.svg', 'favicon-32.png', 32);
