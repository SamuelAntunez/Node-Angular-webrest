import { CustomError, HashService, TokenService, UserRepository, type RegisterUserDto } from "../../../domain";


export class RegisterUser {

    constructor(
        private readonly repository: UserRepository,
        private readonly hashService: HashService,
        private readonly tokenService: TokenService,
    ) { }

    public async execute(registerUserDto: RegisterUserDto) {
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