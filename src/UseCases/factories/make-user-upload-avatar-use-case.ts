import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UserUploadAvatarUseCase } from '../User/UploadAvatar/upload-avatar';

export function makeUserUploadAvatarUseCase(){
    const prismaUsersRepository=new PrismaUsersRepository();
    const userUploadAvatarUseCase=new UserUploadAvatarUseCase(prismaUsersRepository);

    return userUploadAvatarUseCase;
}