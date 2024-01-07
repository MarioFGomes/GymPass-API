import { Prisma, User } from '@prisma/client';


export interface UsersRepository{
    create(data:Prisma.UserCreateInput):Promise<User>;
    findByEmail(email:string):Promise<User | null>;
    findById(Id:string):Promise<User | null>;
    save(Id:string,data:User):Promise<User>
}