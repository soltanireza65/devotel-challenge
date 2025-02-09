import { z } from 'zod';

export const envSchema = z.object({
  COMPOSE_FILE: z.string(),
  
  ENV: z.enum(['development', 'production']),
  HTTP_PORT: z.coerce.number().optional().default(3000),
  JOB_OFFER_CRON_SCHEDULE: z.string(),

  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
  REDIS_PASSWORD: z.string(),

  DATABASE_URL: z.string(),
});

export type Env = z.infer<typeof envSchema>;
