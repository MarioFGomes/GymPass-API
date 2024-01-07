import { Prisma, User } from '@prisma/client';
import { UsersRepository } from '../users-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryUsersRepository implements UsersRepository{

    public items: User[] = [];

    async create(data: Prisma.UserCreateInput) {
        const user={
            id:randomUUID(),
            name:data.name,
            email:data.email,
            avatarUrl:data.avatarUrl?? null,
            password_hash:data.password_hash,
            created_at:new Date(),
        };

        this.items.push(user);

        return user;
    }
    async findByEmail(email: string){
        const user=this.items.find(item => item.email === email);
        if (!user) {
            return null;
        }
        return user;
    }

    async findById(Id: string){
        const user=this.items.find(item => item.id === Id);
        if (!user) {
            return null;
        }
        return user;
    }

    async save(Id: string, data:User ) {
        const UserIndex = this.items.findIndex(user => user.id ===data.id);
        if(UserIndex >= 0){
            return this.items[UserIndex]=data;
        }
        return data;
    }

}