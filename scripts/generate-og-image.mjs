// Generates public/og-image.png from the site's name/title (never the
// photo, per the brief). Dev-time only — satori + sharp are devDependencies,
// not shipped in the app bundle. Run via `npm run generate-og-image`.
//
// satori supports TTF/OTF/WOFF font data but NOT WOFF2, so this pulls the
// static WOFF builds (@fontsource/space-grotesk, @fontsource/jetbrains-mono)
// rather than the WOFF2-only variable font used by the live site's CSS.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import sharp from 'sharp';
import { site } from '../src/data.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function h(type, props = {}, children) {
  return { type, props: { ...props, children } };
}

function fontPath(pkg, file) {
  return join(__dirname, '../node_modules', pkg, 'files', file);
}

const fonts = [
  {
    name: 'Space Grotesk',
    data: readFileSync(fontPath('@fontsource/space-grotesk', 'space-grotesk-latin-700-normal.woff')),
    weight: 700,
    style: 'normal',
  },
  {
    name: 'JetBrains Mono',
    data: readFileSync(fontPath('@fontsource/jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff')),
    weight: 500,
    style: 'normal',
  },
];

const ACCENT = '#2DD4BF';

const tree = h(
  'div',
  {
    style: {
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '80px',
      backgroundColor: '#07090A',
      color: '#F2F5F4',
      fontFamily: 'Space Grotesk',
    },
  },
  [
    h(
      'div',
      {
        style: {
          fontFamily: 'JetBrains Mono',
          fontSize: '22px',
          color: ACCENT,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '28px',
        },
      },
      site.domain.replace('https://', '')
    ),
    h('div', { style: { fontSize: '76px', fontWeight: 700, lineHeight: 1.1 } }, site.name),
    h(
      'div',
      {
        style: {
          fontFamily: 'JetBrains Mono',
          fontSize: '30px',
          color: ACCENT,
          textTransform: 'uppercase',
          letterSpacing: '3px',
          marginTop: '24px',
        },
      },
      site.role
    ),
    h('div', { style: { marginTop: '48px', width: '120px', height: '4px', backgroundColor: ACCENT } }),
  ]
);

async function run() {
  const svg = await satori(tree, { width: 1200, height: 630, fonts });
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  const outputPath = join(__dirname, '../public/og-image.png');
  writeFileSync(outputPath, pngBuffer);
  console.log('wrote public/og-image.png');
}

run();
