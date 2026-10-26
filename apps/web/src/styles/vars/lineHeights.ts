import { rem } from '@mantine/core';

export enum ElineHeights {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  '4XL' = '4xl',
}

export const lineHeights = {
  [ElineHeights.XS]: rem(16),
  [ElineHeights.SM]: rem(20),
  [ElineHeights.MD]: rem(24),
  [ElineHeights.LG]: rem(28),
  [ElineHeights.XL]: rem(32),
  [ElineHeights['4XL']]: rem(48),
};
