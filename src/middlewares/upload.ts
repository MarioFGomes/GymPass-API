import { FastifyRequest, FastifyReply } from 'fastify';

export async function UploadValidate(request:FastifyRequest, reply:FastifyReply){
    try{

        const upload = await request.file({
            limits: {
                fileSize: 5_242_880, // 5mb
            },
        });
      
        if(!upload) {
            throw new Error('Invalid file size');
        }
        const mimeTypeRegex = /^(image)\/[a-zA-z]+/;
        const isValidFileFormat = mimeTypeRegex.test(upload.mimetype);
        if(!isValidFileFormat) {
            throw new Error('Invalid file format');
        }

        return upload;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(error:any) {
        return reply.status(400).send({message: error.message});
    }
}