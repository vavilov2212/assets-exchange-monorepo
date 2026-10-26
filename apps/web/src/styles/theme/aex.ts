import { createTheme, mergeThemeOverrides } from '@mantine/core';
import { baseColors, colors, fontSizes, headings, lineHeights, radius, spacing } from '../vars';
import variantColorResolver from './variantColorResolver';

const base = createTheme({
  black: baseColors.black,
  white: baseColors.white,
  variantColorResolver,
  radius,
  colors,
  fontSizes,
  spacing,
  lineHeights,
  headings,
});

const aexTheme = mergeThemeOverrides(
  base,
);

export default aexTheme;
