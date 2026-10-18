/** @jest-environment @edge-runtime/jest-environment */
import { NextRequest } from 'next/server';
import middleware from '@/middleware';

/**
 * Это условный BASE_URL, т.к. сервер не поднимается и сеть не используется
 */
const ORIGIN = 'http://localhost:3000/';

const makeReq = (path: string, cookie?: string) =>
  new NextRequest(new URL(path, ORIGIN), {
    headers: cookie ? { cookie } : {},
  });

const expectPassThrough = (res: Response) => {
  expect(res.status).toBe(200);
  expect(res.headers.get('location')).toBeNull();
};

/**
 * --- Test cases ---
 * 
 * Серверное окружение в unit тестах не поднимается.
 * Мы создаём NextRequest прямо в памяти и вызываем функцию middleware(...) как обычную.
 */
describe('redirects', () => {

  it('redirects to /signin when there is no session', () => {
    const res = middleware(makeReq('/')) as Response;
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe(`${ORIGIN}signin`);
  });

  it('redirects to / when session exists on /signin', () => {
    const res = middleware(makeReq('/signin', "SESSION_ID=abc")) as Response;
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe(ORIGIN);
  });

  it('lets /password-recovery through without session', () => {
    expectPassThrough(middleware(makeReq('/password-recovery')));
  });

  it('lets / through when session exists', () => {
    expectPassThrough(middleware(makeReq('/', 'SESSION_ID=abc')));
  });
  
});