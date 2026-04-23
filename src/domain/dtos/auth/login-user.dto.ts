import { regularExps } from "../../../config";




export class LoginUserDto {
    constructor(
        public readonly email: string,
        public readonly password: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, LoginUserDto?] {

        const { email, password } = object;
        if (!email) return ['Falta el correo electrónico',];
        if (typeof email !== 'string') return ['El correo electrónico debe ser una cadena'];
        if (!regularExps.email.test(email)) return ['El correo electrónico no es válido',]
        if (!password) return ['Falta la contraseña',];
        if (typeof password !== 'string') return ['La contraseña debe ser una cadena'];


        return [, new LoginUserDto(email, password)]

    }
}