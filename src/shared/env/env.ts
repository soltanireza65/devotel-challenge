import { z } from 'zod';

export const envSchema = z.object({
  ENV: z.enum(['development', 'production']),
  HTTP_PORT: z.coerce.number().optional().default(3000),
  JOB_OFFER_CRON_SCHEDULE: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
  REDIS_PASSWORD: z.string(),

  DATABASE_URL: z.string(),
  
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_NAME: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
});

export type Env = z.infer<typeof envSchema>;
