import { VariantColorsResolver, defaultVariantColorsResolver } from '@mantine/core';

const variantColorResolver: VariantColorsResolver = (input) => {
  const { variant } = input;
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  return defaultResolvedColors;
};

export default variantColorResolver;
