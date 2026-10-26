import { rem } from '@mantine/core';

export enum ERadius {
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
  XXL = 'xxl',
  MAX = 'max',
}

export const radius = {
  [ERadius.S]: rem(4),
  [ERadius.M]: rem(8),
  [ERadius.L]: rem(12),
  [ERadius.XL]: rem(16),
  [ERadius.XXL]: rem(32),
  [ERadius.MAX]: rem(1000),
};
