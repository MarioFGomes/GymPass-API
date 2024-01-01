import { Redis } from 'ioredis';

export const redisClient=new Redis({
    connectionName: 'GymPass',
    password:'1qaz2wsx'
});
