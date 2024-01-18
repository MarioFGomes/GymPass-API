import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import {userRoutes } from './http/controllers/users/routes';
import { ZodError } from 'zod';
import { env } from './env';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { resolve} from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { gymRoutes } from './http/controllers/gym/routes';
import { checkInsRoutes } from './http/controllers/check-ins/routes';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const app = fastify();

app.register(fastifyJwt,{
    secret:env.JWT_SECRET,
    
});
app.register(cors, {
    origin: true, // all URLs are allowed. other example - origin: ['http://localhost:3000']
});

app.register(fastifyStatic, {
    root: resolve(__dirname,'../uploads'),
    prefix: '/uploads',
});

app.register(multipart);
app.register(userRoutes);
app.register(gymRoutes);
app.register(checkInsRoutes);

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
