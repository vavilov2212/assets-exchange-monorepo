import { resolveAuthRedirect } from './authRedirect';

describe('resolveAuthRedirect', () => {
  it.each([
    // pathname, hasSession, expected
    ['/', false, '/signin'],
    ['/dashboard', false, '/signin'],
    ['/', true, null],
    ['/signin', false, null],
    ['/signup', false, null],
    ['/password-recovery', false, null],
    ['/signin', true, '/'],
    ['/signup', true, '/'],
    ['/password-recovery', true, '/'],
    ['/password-recovery/confirm', false, null],
    ['/signin/', false, null],
    ['/signin/', true, '/']
  ])('%s, session=%s -> %s', (pathname, hasSession, expected) => {
    expect(resolveAuthRedirect(pathname, hasSession)).toBe(expected);
  });
});

