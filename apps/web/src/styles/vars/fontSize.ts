import { rem } from '@mantine/core';

export enum EFontSizes {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  LGL = 'lgl',
  XL = 'xl',
  '2XL' = '2xl',
  '3XL' = '3xl',
  '4XL' = '4xl',
}

export const fontSizes = {
  [EFontSizes.XS]: rem(12),
  [EFontSizes.SM]: rem(14),
  [EFontSizes.MD]: rem(16),
  [EFontSizes.LG]: rem(18),
  [EFontSizes.LGL]: rem(20),
  [EFontSizes.XL]: rem(24),
  [EFontSizes['2XL']]: rem(30),
  [EFontSizes['3XL']]: rem(36),
  [EFontSizes['4XL']]: rem(48),
};
