import type { RegisterUserDto } from "../dtos/auth/register-user.dto";
import type { UserEntity } from "../entities/user.entity";
import { LoginUserDto } from '../dtos/auth/login-user.dto';




export abstract class UserDatasource {
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
    //todo: paginacion
    abstract findByEmail(email: string): Promise<UserEntity | null>;

    abstract findById(id: string): Promise<UserEntity | null>;

}