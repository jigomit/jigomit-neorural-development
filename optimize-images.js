import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputLogo = join(__dirname, 'src', 'assets', 'images', 'logo.png');
const outputDir = join(__dirname, 'src', 'assets', 'images', 'logo-optimized');

// Create output directory if it doesn't exist
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Sizes needed: header (50x50), hero (64x64), footer (124x95), and 2x versions for retina
const sizes = [
  { name: 'header', width: 50, height: 50 },
  { name: 'header-2x', width: 100, height: 100 },
  { name: 'hero', width: 64, height: 64 },
  { name: 'hero-2x', width: 128, height: 128 },
  { name: 'footer', width: 124, height: 95 },
  { name: 'footer-2x', width: 248, height: 190 },
];

async function optimizeLogo() {
  console.log('Optimizing logo images...\n');

  for (const size of sizes) {
    // Generate WebP version
    await sharp(inputLogo)
      .resize(size.width, size.height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .webp({ quality: 85, effort: 6 })
      .toFile(join(outputDir, `logo-${size.name}.webp`));

    console.log(`✓ Created logo-${size.name}.webp (${size.width}x${size.height})`);

    // Generate AVIF version (better compression)
    await sharp(inputLogo)
      .resize(size.width, size.height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .avif({ quality: 80, effort: 4 })
      .toFile(join(outputDir, `logo-${size.name}.avif`));

    console.log(`✓ Created logo-${size.name}.avif (${size.width}x${size.height})`);
  }

  // Also create a fallback PNG at the largest size (for older browsers)
  await sharp(inputLogo)
    .resize(248, 190, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(join(outputDir, 'logo-fallback.png'));

  console.log(`✓ Created logo-fallback.png (248x190)\n`);
  console.log('Logo optimization complete!');
}

optimizeLogo().catch(console.error);

