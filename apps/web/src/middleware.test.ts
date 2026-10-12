/** @jest-environment @edge-runtime/jest-environment */
import { NextRequest } from 'next/server';
import middleware from '@/middleware';

const makeReq = (path: string, cookie?: string) =>
  new NextRequest(new URL(path, 'http://localhost:3000'), {
    headers: cookie ? { cookie } : {},
  });

describe('', () => {
  it('redirects to /signin when there is no session', () => {
    const res = middleware(makeReq('/')) as Response;
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe('http://localhost:3000/signin');
  });
});
