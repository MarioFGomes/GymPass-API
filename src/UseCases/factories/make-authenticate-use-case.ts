import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateUseCase } from '../Authenticate/authenticate';

export function makeAuthenticateUseCase(){
    const prismaUsersRepository=new PrismaUsersRepository();
    const authenticateUseCase=new AuthenticateUseCase(prismaUsersRepository);

    return authenticateUseCase;
}