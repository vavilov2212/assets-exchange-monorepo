/** @jest-environment @edge-runtime/jest-environment */
import { NextRequest } from 'next/server';
import middleware from '@/middleware';

const makeReq = (path: string, cookie?: string) =>
  new NextRequest(new URL(path, 'http://localhost:3000'), {
    headers: cookie ? { cookie } : {},
  });

describe('redirects', () => {

  it('redirects to /signin when there is no session', () => {
    const res = middleware(makeReq('/')) as Response;
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe('http://localhost:3000/signin');
  });

  it('redirects to / when session exists on /signin', () => {
    const res = middleware(makeReq('/signin', "SESSION_ID=abc")) as Response;
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe('http://localhost:3000/');
  });

  it('lets to /password-recovery when there\'s no session', () => {
    const res = middleware(makeReq('/password-recovery')) as Response;
    expect(res.status).toBe(200);
    expect(res.headers.get('location')).toBeNull();
    expect(res.headers.get('x-middleware-rewrite')).toBeNull();
  });

  
});
