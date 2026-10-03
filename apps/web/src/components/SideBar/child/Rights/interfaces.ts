import { Role } from '@otc/contracts';

// Роли — из общего пакета контрактов (единый источник правды для web и api).
// Раньше здесь был числовой enum (CLIENT = 0, EXECUTOR = 1); теперь значения строковые.
export const ERights = Role;
export type ERights = Role;
