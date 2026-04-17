import { CustomError, type RegisterUserDto } from "../../../domain";
import type { BcryptHashService, JwtTokenService, UserRepositoryImpl } from "../../../infrastructure";


export class RegisterUser {

    constructor(
        private readonly repository: UserRepositoryImpl,
        private readonly hashService: BcryptHashService,
        private readonly tokenService: JwtTokenService
    ) { }

    async execute(registerUserDto: RegisterUserDto) {
        // Encriptar contraseña
        const hashPassword = this.hashService.hash(registerUserDto.password)
        // Guardar pw encriptada
        const user = await this.repository.register({ ...registerUserDto, password: hashPassword })

        // Generar token
        const token = await this.tokenService.generateToken({ id: user.id })
        if (!token) throw CustomError.internalServer('Error generating token');

        return {
            user,
            token
        }
    }

}