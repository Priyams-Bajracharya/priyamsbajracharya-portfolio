// Rasterizes the hand-authored public/favicon.svg into favicon.ico and
// apple-touch-icon.png. Run via `npm run generate-favicons` whenever
// favicon.svg changes.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgBuffer = readFileSync(join(__dirname, '../public/favicon.svg'));

async function run() {
  // png-to-ico takes one 256x256 source and derives the 48/32/16 sizes itself.
  const basePng = await sharp(svgBuffer).resize(256, 256).png().toBuffer();
  const icoBuffer = await pngToIco(basePng);
  writeFileSync(join(__dirname, '../public/favicon.ico'), icoBuffer);
  console.log('wrote public/favicon.ico');

  const appleTouchIcon = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  writeFileSync(join(__dirname, '../public/apple-touch-icon.png'), appleTouchIcon);
  console.log('wrote public/apple-touch-icon.png');
}

run();
