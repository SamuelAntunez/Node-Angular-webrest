import { prisma } from "../../../data/postgres";
import { Role } from "../../../data/postgres/generated/prisma/enums";
import { CustomError, UserEntity, type RegisterUserDto } from "../../../domain";
import type { UserDatasource } from "../../../domain/datasources/user.datasource";

export class PostgresUserDatasource implements UserDatasource {

    async findById(id: string): Promise<UserEntity | null> {
        const user = await prisma.user.findUnique({
            where: { id }
        })
        if (!user) return null;
        return UserEntity.fromObject(user);
    }
    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await prisma.user.findUnique({
            where: { email }
        })
        if (!user) return null;
        return UserEntity.fromObject(user);
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const exist = await this.findByEmail(registerUserDto.email)
        if (exist) throw CustomError.badRequest('Email Already Exists')
        const { name, email, password, role } = registerUserDto;
        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    role: role ? (role as Role[]) : [Role.USER_ROLE]
                }

            });

            return UserEntity.fromObject(user);

        } catch (error) {
            throw error;
        }
    }

}