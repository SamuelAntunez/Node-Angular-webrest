import { CustomError, UserEntity, type LoginUserDto } from "../../../domain";
import type { BcryptHashService, JwtTokenService, UserRepositoryImpl } from "../../../infrastructure";

export class LoginUser {

    constructor(
        private readonly repository: UserRepositoryImpl,
        private readonly hashService: BcryptHashService,
        private readonly tokenService: JwtTokenService,
    ) { }


    async execute(loginUserDto: LoginUserDto) {
        // Findone para verificar si el usuario existe
        const user = await this.repository.findByEmail(loginUserDto.email)
        if (!user) throw CustomError.badRequest('Invalid Email');
        // isMatch... bcrypt compare
        const isMatch = this.hashService.compare(loginUserDto.password, user.password)
        if (!isMatch) throw CustomError.badRequest('Password is wrong')

        const { password, ...userEntity } = UserEntity.fromObject(user)
        const token = await this.tokenService.generateToken({ id: user.id })
        if (!token) throw CustomError.internalServer('Error while creating JWT')
        return {
            user: userEntity,
            token: token,
        }
    }
}