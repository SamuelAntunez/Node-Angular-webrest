import type { LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import type { UserDatasource } from "../../domain/datasources/user.datasource";
import type { UserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryImpl implements UserRepository {

    constructor(
        private readonly userDatasource: UserDatasource
    ) { }
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.userDatasource.register(registerUserDto)
    }
    findByEmail(email: string): Promise<UserEntity | null> {
        return this.userDatasource.findByEmail(email)
    }

}