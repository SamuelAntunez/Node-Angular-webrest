import { CustomError, HashService, TokenService, UserRepository, type LoginUserDto } from "../../../domain";
export class LoginUser {

    constructor(
        private readonly repository: UserRepository,
        private readonly hashService: HashService,
        private readonly tokenService: TokenService,
    ) { }


    public async execute(loginUserDto: LoginUserDto) {
        // Findone para verificar si el usuario existe
        const user = await this.repository.findByEmail(loginUserDto.email)
        if (!user) throw CustomError.badRequest('Invalid Email');
        // isMatch... bcrypt compare
        const isMatch = this.hashService.compare(loginUserDto.password, user.password)
        if (!isMatch) throw CustomError.badRequest('Password is wrong')

        const { password: _, ...userEntity } = user
        const token = await this.tokenService.generateToken({ id: user.id })
        if (!token) throw CustomError.internalServer('Error while creating JWT')
        return {
            user: userEntity,
            token: token,
        }
    }
}