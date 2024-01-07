import {z} from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { randomUUID } from 'crypto';
import { promisify } from 'util';
import { pipeline } from 'node:stream';
import { extname, resolve } from 'path';
import { createWriteStream } from 'node:fs';
import { UploadValidate } from '@/middlewares/upload';
import { makeUserUploadAvatarUseCase } from '@/UseCases/factories/make-user-upload-avatar-use-case';


const pump = promisify(pipeline);

export async function UserUploadAvatar (request:FastifyRequest, reply:FastifyReply) {
    
    try{

        const requestSchema=z.object({
            id:z.string(),
        });

        const {id}=requestSchema.parse(request.params);

        const fileUpload=await UploadValidate(request,reply);
  
        const fileId = randomUUID();
        const extension = extname(fileUpload.filename);
        const fileName = fileId.concat(extension);

        const writeStream = createWriteStream(
            resolve('C:\\Users\\hp\\OneDrive\\cursos\\Documents\\Dev Estudos\\Rocketseat\\Ignite NodeJS\\Nova Trilha\\03-api-solid\\uploads', fileName),
        );

        await pump(fileUpload.file, writeStream);

        const fullUrl = request.protocol.concat('://').concat(request.hostname);
        const fileUrl = new URL(`/uploads/${fileName}`, fullUrl);

        const userUploadAvatarUseCase=makeUserUploadAvatarUseCase();
        await userUploadAvatarUseCase.execute({
            user_id:id,
            avatarUrl:fileUrl.href
        });

        return reply.status(201).send({ message: 'profile photo upload successfully' });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(error:any){
        return reply.status(400).send({ message: error.message });
    }
}