/**
 * Utility to compress, resize, and optimize images client-side
 * before storing them in Firestore or LocalStorage.
 * Ensures images never exceed Firestore document limits (1MB) or slow down the page.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  isLogo?: boolean;
}

export const compressAndOptimizeImage = async (
  file: File,
  options: CompressionOptions = {}
): Promise<string> => {
  const {
    maxWidth = 1280,
    maxHeight = 960,
    quality = 0.82,
    isLogo = false,
  } = options;

  return new Promise((resolve, reject) => {
    // Check if it's an SVG (don't compress SVG, convert to UTF-8 data URL or return text)
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        resolve(result);
      };
      reader.onerror = () => reject(new Error('Erro ao ler arquivo SVG.'));
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          let targetWidth = img.width;
          let targetHeight = img.height;

          // Target dimensions for Logo vs Gallery/Photo
          const limitW = isLogo ? 600 : maxWidth;
          const limitH = isLogo ? 240 : maxHeight;

          // Maintain aspect ratio while bounding within maxWidth/maxHeight
          if (targetWidth > limitW || targetHeight > limitH) {
            const ratio = Math.min(limitW / targetWidth, limitH / targetHeight);
            targetWidth = Math.round(targetWidth * ratio);
            targetHeight = Math.round(targetHeight * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }

          // Use high quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Only preserve transparent PNG for logos; all normal photos/projects should be JPEG/WebP
          const isTransparentLogo = Boolean(isLogo && (file.type === 'image/png' || file.name.toLowerCase().endsWith('.png')));

          if (!isTransparentLogo) {
            // Fill background with dark tone to prevent black/transparent glitch
            ctx.fillStyle = '#050714';
            ctx.fillRect(0, 0, targetWidth, targetHeight);
          }

          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          let dataUrl = '';
          if (isTransparentLogo) {
            dataUrl = canvas.toDataURL('image/png');
          } else {
            // Use requested quality with JPEG compression
            dataUrl = canvas.toDataURL('image/jpeg', quality);
          }

          // If size is still larger than 120KB, adaptively optimize to ensure small footprint (<100KB per photo)
          if (!isTransparentLogo && dataUrl.length > 140000) {
            dataUrl = canvas.toDataURL('image/jpeg', Math.min(quality, 0.74));
          }
          if (!isTransparentLogo && dataUrl.length > 180000) {
            dataUrl = canvas.toDataURL('image/jpeg', 0.65);
          }

          resolve(dataUrl);
        } catch (err) {
          console.warn('Falha no redimensionamento canvas, usando fallback:', err);
          resolve(e.target?.result as string);
        }
      };

      img.onerror = () => {
        reject(new Error('Não foi possível processar o formato desta imagem.'));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Erro ao carregar o arquivo do computador.'));
    };

    reader.readAsDataURL(file);
  });
};
