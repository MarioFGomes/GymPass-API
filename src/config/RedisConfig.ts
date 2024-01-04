import { Redis } from 'ioredis';
import {env} from '@/env';
import { promisify } from 'util';

const redisClient=new Redis({
    connectionName: env.REDIS_CONNECTION_NAME,
    password:env.REDIS_PASSWORD,
    port:env.REDIS_PORT
});

function getRedis(value:string){
    const syncRedisGet=promisify(redisClient.get).bind(redisClient);
    return syncRedisGet(value);
}

function setRedis(key:string,value:string){
    const syncRedisSet=promisify(redisClient.set).bind(redisClient);
    return syncRedisSet(key,value);
}

export {getRedis,setRedis};
