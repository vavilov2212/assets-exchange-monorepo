import { LoginBody } from "@assets-exchange-monorepo/contracts";

export type SignInResult =
  | { ok: true }
  | { ok: false; reason: 'INVALID_CREDENTIALS' | 'NETWORK' };

/** Порт: что фиче нужно от внешнего мира для входа. Реализация живёт в api/ или в _app. */
export interface AuthGateway {
  signIn(body: LoginBody): Promise<SignInResult>;
}