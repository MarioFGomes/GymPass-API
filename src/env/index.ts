import 'dotenv/config';
import { z } from 'zod';

const envSchema=z.object({
    NODE_ENV:z.enum(['dev','production','test']).default('dev'),
    PORT:z.coerce.number().default(3333),
    REDIS_CONNECTION_NAME:z.string().default('GymPass'),
    REDIS_PORT:z.coerce.number().default(6379),
    REDIS_PASSWORD:z.string().default('1qaz2wsx')
});

const _env=envSchema.safeParse(process.env);

if(_env.success===false){
    console.error('Invalid environment variable',_env.error.format());
    throw new Error('Invalid environment variables.');
}

export const env=_env.data;