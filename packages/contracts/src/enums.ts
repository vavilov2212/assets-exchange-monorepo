import { z } from 'zod';

// Паттерн: zod-схема -> тип (z.infer) -> объект значений (.enum).
// Role.CLIENT === 'CLIENT' — строка, а не 0/1, поэтому безопасно для JSON, БД и логов.

export const RoleSchema = z.enum(['CLIENT', 'EXECUTOR']);
export type Role = z.infer<typeof RoleSchema>;
export const Role = RoleSchema.enum;

export const AssetSchema = z.enum(['USDT', 'BTC', 'ETH', 'USD', 'EUR', 'RUB']);
export type Asset = z.infer<typeof AssetSchema>;
export const Asset = AssetSchema.enum;

export const RequestSideSchema = z.enum(['BUY', 'SELL']);
export type RequestSide = z.infer<typeof RequestSideSchema>;
export const RequestSide = RequestSideSchema.enum;

export const RequestStatusSchema = z.enum([
  'SEARCHING_EXECUTOR', // «поиск исполнителя»
  'IN_PROGRESS', //        исполнитель выбран, сделка идёт
  'COMPLETED', //          архив
  'CANCELLED', //          архив
]);
export type RequestStatus = z.infer<typeof RequestStatusSchema>;
export const RequestStatus = RequestStatusSchema.enum;

export const OfferStatusSchema = z.enum(['PENDING', 'ACCEPTED', 'REJECTED']);
export type OfferStatus = z.infer<typeof OfferStatusSchema>;
export const OfferStatus = OfferStatusSchema.enum;
