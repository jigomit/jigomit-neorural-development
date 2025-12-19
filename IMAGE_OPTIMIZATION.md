# Image Optimization Guide

## Logo Image Optimization Required

The logo image (`src/assets/images/logo.png`) is currently **194.4 KiB** but only displayed at **50x50px** (header) and **64x64px** (hero). The source image is **430x435px**, which is much larger than needed.

### Recommended Optimizations:

1. **Convert to WebP/AVIF format** (can reduce size by 70-80%):
   - WebP: ~20-30 KiB
   - AVIF: ~15-25 KiB

2. **Create responsive image set**:
   ```html
   <picture>
     <source srcset="logo.avif" type="image/avif" />
     <source srcset="logo.webp" type="image/webp" />
     <img src="logo.png" alt="Logo" />
   </picture>
   ```

3. **Generate multiple sizes**:
   - 50x50px for header (current usage)
   - 64x64px for hero (current usage)
   - 100x100px for footer (current usage: 56x56px)
   - Use `srcset` for responsive loading

4. **Tools to use**:
   - Sharp (already in devDependencies)
   - ImageOptim
   - Squoosh.app
   - Online converters

### Quick Fix Script (using Sharp):

```javascript
const sharp = require('sharp');
const fs = require('fs');

// Optimize logo
sharp('src/assets/images/logo.png')
  .resize(100, 100, { fit: 'contain' })
  .webp({ quality: 85 })
  .toFile('src/assets/images/logo-optimized.webp');

// Create 50x50 version
sharp('src/assets/images/logo.png')
  .resize(50, 50, { fit: 'contain' })
  .webp({ quality: 85 })
  .toFile('src/assets/images/logo-50.webp');
```

### Expected Savings:
- **Current**: 194.4 KiB
- **Optimized WebP**: ~20-30 KiB
- **Savings**: ~164-174 KiB (85-90% reduction)

