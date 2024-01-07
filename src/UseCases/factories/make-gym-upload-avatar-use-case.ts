import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { GymUploadAvatarUseCase } from '../Gym/UploadAvatar/upload-avatar';

export function makeGymUploadAvatarUseCase(){
    const prismaGymsRepository=new PrismaGymsRepository();
    const gymUploadAvatarUseCase=new GymUploadAvatarUseCase(prismaGymsRepository);

    return gymUploadAvatarUseCase;
}