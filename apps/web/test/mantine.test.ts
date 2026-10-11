import { MantineProvider, Button } from '@mantine/core';
import { render, screen } from '@testing-library/react';

it('renders Mantine with mocks', () => {
  render(<MantineProvider><Button>Go</Button></MantineProvider>);
  expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
});