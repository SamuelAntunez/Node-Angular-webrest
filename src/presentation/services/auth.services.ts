import { bcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, EmailService, LoginUserDto, UserEntity, type RegisterUserDto, type SendMailOptions } from "../../domain";



export class AuthService {

    constructor(
        private readonly emailService: EmailService
    ) { }

    public async loginUser(loginUserDto: LoginUserDto) {
        // Findone para verificar si el usuario existe
        const user = await UserModel.findOne({ email: loginUserDto.email })
        if (!user) throw CustomError.badRequest('Invalid Email');
        // isMatch... bcrypt compare
        if (!bcryptAdapter.compare(loginUserDto.password, user.password)) throw CustomError.badRequest('Password is wrong')


        const { password, ...userEntity } = UserEntity.fromObject(user)
        const token = await JwtAdapter.generateToken({ id: user.id })
        if (!token) throw CustomError.internalServer('Error while creating JWT')
        return {
            user: userEntity,
            token: token,
        }
    }

    private sendEmailValidationLink = async (email: string) => {
        const token = await JwtAdapter.generateToken({ email })
        if (!token) throw CustomError.internalServer('Error while creating JWT')
        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
        const html = `
        <h1>Validate your email</h1>
        <p>Click on the following link to validate your email</p>
        <a href="${link}"> Validate your email: ${email}</a>
        `;
        const options: SendMailOptions = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html
        }
        const isSet = await this.emailService.sendEmail(options)
        if (!isSet) throw CustomError.internalServer('Error sending email')
        return true
    }

    public validateEmail = async (token: string) => {
        const payload = await JwtAdapter.validateToken(token);
        if (!payload) throw CustomError.badRequest('Invalid Token');

        const { email } = payload as { email: string }
        if (!email) throw CustomError.internalServer('Email not in token')

        const user = await UserModel.findOne({ email });
        if (!user) throw CustomError.internalServer('Email not exists')

        user.emailValidated = true;
        await user.save();

        return true
    }

}