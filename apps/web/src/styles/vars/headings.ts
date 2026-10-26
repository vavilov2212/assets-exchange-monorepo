import { EFontSizes, fontSizes } from './fontSize';
import { ElineHeights, lineHeights } from './lineHeights';

export const headings = {
  fontWeight: '600',
  sizes: {
    h1: {
      fontSize: fontSizes[EFontSizes['4XL']],
    },
    h2: {
      fontSize: fontSizes[EFontSizes['3XL']],
      lineHeight: lineHeights[ElineHeights['4XL']],
    },
    h3: {
      fontSize: fontSizes[EFontSizes['2XL']],
    },
    h4: {
      fontSize: fontSizes[EFontSizes.XL],
      lineHeight: lineHeights[ElineHeights.XL],
    },
    h5: {
      fontSize: fontSizes[EFontSizes.LGL],
      lineHeight: lineHeights[ElineHeights.MD],
    },
  },
};
