import { FastifyRequest, FastifyReply } from 'fastify';


export async function refresh (request:FastifyRequest, reply:FastifyReply) 
{
        
    await request.jwtVerify({onlyCookie: true});

    const token=await reply.jwtSign(
        {
            name:request.user.name,
            role:request.user.role,
            avatarUrl:request.user.avatarUrl 
        },
        {
            sign:{
                sub: request.user.sub,
            }
        });

    const refreshToken=await reply.jwtSign(
        {
            name:request.user.name,
            avatarUrl:request.user.avatarUrl 
        },
        {
            sign:{
                sub: request.user.sub,
                expiresIn: '7d'
            }
        });

    return reply
        .setCookie('refreshToken',refreshToken,{
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true
        })
        .status(200)
        .send({token});


}