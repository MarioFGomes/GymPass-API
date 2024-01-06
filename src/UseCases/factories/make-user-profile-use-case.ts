import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetUserProfileUseCase } from '../User/GetUserProfile/get-user-profile';

export function makeUserProfileUseCase(){
    const prismaUsersRepository=new PrismaUsersRepository();
    const UserProfileUseCase=new GetUserProfileUseCase(prismaUsersRepository);

    return UserProfileUseCase;
}