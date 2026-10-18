import { resolveAuthRedirect } from './authRedirect';

describe('resolveAuthRedirect', () => {
  it.each([
    /**
     * NO SESSION | PUBLIC PATH
     */
    ['/signin', false, null],
    ['/signin/', false, null],
    ['/signup', false, null],
    ['/signup/', false, null],
    ['/password-recovery', false, null],
    ['/password-recovery/', false, null],

    /**
     * HAS SESSION | PUBLIC PATH
     */
    ['/signin', true, '/'],
    ['/signin/', true, '/'],
    ['/signup', true, '/'],
    ['/signup/', true, '/'],
    ['/password-recovery', true, '/'],
    ['/password-recovery/', true, '/'],

    /**
     * NO SESSION | PRIVATE PATH
     */
    ['/', false, '/signin'],
    ['/dashboard', false, '/signin'],
    ['/sign', false, '/signin'],
    ['/s', false, '/signin'],
    ['/recovery', false, '/signin'],
    ['/signinfoo', false, '/signin'],
    ['/dashboard/settings', false, '/signin'],
    ['/password-recovery/confirm', false, null],

    /**
     * HAS SESSION | PRIVATE PATH
     */
    ['/', true, null],
    
  ])('%s, session=%s -> %s', (pathname, hasSession, expected) =>
    expect(resolveAuthRedirect(pathname, hasSession)).toBe(expected)
  );
});

