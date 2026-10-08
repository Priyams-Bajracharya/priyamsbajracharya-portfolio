// Converts source images to WebP at the exact sizes they're actually
// displayed at, per scripts/image-targets.json. Run via `npm run
// optimize-images` whenever a new source image is added to
// src/assets/images/. Sources that don't exist yet are skipped (not
// an error) so this is safe to run before all real images are in place —
// components fall back to the TODO placeholder box until then.
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesDir = join(__dirname, '../src/assets/images');
const manifest = JSON.parse(readFileSync(join(__dirname, 'image-targets.json'), 'utf-8'));

async function run() {
  for (const entry of manifest.images) {
    const sourcePath = join(imagesDir, entry.source);

    if (!existsSync(sourcePath)) {
      console.log(`skip (source not found): ${entry.source}`);
      continue;
    }

    for (const output of entry.outputs) {
      const outputPath = join(imagesDir, output.file);
      mkdirSync(dirname(outputPath), { recursive: true });

      await sharp(sourcePath)
        .resize(output.width, output.height, { fit: 'cover' })
        .webp({ quality: 80 })
        .toFile(outputPath);

      console.log(`wrote ${output.file} (${output.width}x${output.height})`);
    }
  }
}

run();
