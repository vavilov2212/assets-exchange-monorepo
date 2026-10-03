import { z } from 'zod';
import { AssetSchema, RequestSideSchema, RequestStatusSchema } from './enums';

// Контракты — это формат данных «по проводу» (HTTP JSON), а не доменные сущности.
// Поэтому даты здесь — ISO-строки, а в домене api — Date.

/** Тело POST /requests */
export const CreateRequestBodySchema = z.object({
  side: RequestSideSchema,
  asset: AssetSchema,
  quoteAsset: AssetSchema,
  amount: z.number().positive(),
});
export type CreateRequestBody = z.infer<typeof CreateRequestBodySchema>;

/** Заявка в ответах API */
export const OtcRequestDtoSchema = CreateRequestBodySchema.extend({
  id: z.string(),
  clientId: z.string(),
  status: RequestStatusSchema,
  createdAt: z.string().datetime(),
});
export type OtcRequestDto = z.infer<typeof OtcRequestDtoSchema>;
