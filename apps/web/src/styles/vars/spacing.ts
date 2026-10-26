import { rem } from '@mantine/core';

export enum ESpacing {
  XS = 'xs',
  S = 's',
  SM = 'sm',
  M = 'm',
  L = 'l',
  LB = 'lb',
  XL = 'xl',
  '2XL' = '2xl',
  '3XL' = '3xl',
  '3XLL' = '3xll',
  '4XL' = '4xl',
  '4XXL' = '4xxl',
  '5XL' = '5xl',
  '6XL' = '6xl',
}

export const spacing = {
  [ESpacing.XS]: rem(2),
  [ESpacing.S]: rem(4),
  [ESpacing.SM]: rem(6),
  [ESpacing.M]: rem(8),
  [ESpacing.L]: rem(12),
  [ESpacing.LB]: rem(14),
  [ESpacing.XL]: rem(16),
  [ESpacing['2XL']]: rem(20),
  [ESpacing['3XL']]: rem(24),
  [ESpacing['3XLL']]: rem(28),
  [ESpacing['4XL']]: rem(32),
  [ESpacing['4XXL']]: rem(36),
  [ESpacing['5XL']]: rem(40),
  [ESpacing['6XL']]: rem(48),
};
