import type { Environment } from 'vitest';
import 'dotenv/config';
import { randomUUID } from 'node:crypto';
import {execSync} from 'node:child_process';
import { PrismaClient } from '@prisma/client';

const prisma=new PrismaClient();
function getnarateDatabaseURL(schema:string){

    if(!process.env.DATABASE_URL){ 
        throw new Error('You must provide a DatabaseURL environment');
    }
    const url= new URL(process.env.DATABASE_URL);

    url.searchParams.set('schema',schema);
    return url.toString();
}
// ts-prune-ignore-next
export default <Environment>{
    name:'prisma',
    transformMode: 'ssr',
    async setup(){
        const schema=randomUUID();
        const Databaseurl=getnarateDatabaseURL(schema);

        process.env.DATABASE_URL=Databaseurl;

        execSync('npx prisma migrate deploy');

        return {
            async teardown(){
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
                await prisma.$disconnect();
            }
        };
    }
};