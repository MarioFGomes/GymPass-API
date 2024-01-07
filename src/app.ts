import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { appRoutes } from './http/routes';
import { ZodError } from 'zod';
import { env } from './env';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { resolve } from 'node:path';

export const app = fastify();

app.register(fastifyJwt,{
    secret:env.JWT_SECRET,
    
});
app.register(cors, {
    origin: true, // all URLs are allowed. other example - origin: ['http://localhost:3000']
});

app.register(fastifyStatic, {
    root: resolve('C:\\Users\\hp\\OneDrive\\cursos\\Documents\\Dev Estudos\\Rocketseat\\Ignite NodeJS\\Nova Trilha\\03-api-solid\\uploads'),
    prefix: '/uploads',
});

app.register(multipart);
app.register(appRoutes);
app.setErrorHandler((error,_,reply)=>{
    if(error instanceof ZodError){
        return reply.status(400).send({message: 'Validation error',issues:error.format()});
    }

    if(env.NODE_ENV !== 'production'){
        console.error(error);
    }else{
        // TODO: usar ferramentas de observabilidade para registro dos logs tal como DataDog / NewRelic/Sentry
    }
    return reply.status(500).send({message: 'Internal server error'});
});
