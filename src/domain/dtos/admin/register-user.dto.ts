import { regularExps } from "../../../config";


export class RegisterUserDto {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role?: string[],
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {

        const { name, email, password, role } = object;
        if (!name) return ['Falta el nombre',];
        if (typeof name !== 'string') return ['El nombre debe ser una cadena'];
        if (!email) return ['Falta el correo electrónico',];
        if (typeof email !== 'string') return ['El correo electrónico debe ser una cadena'];
        if (!regularExps.email.test(email)) return ['El correo electrónico no es válido',]
        if (!password) return ['Falta la contraseña',];
        if (typeof password !== 'string') return ['La contraseña debe ser una cadena'];
        if (password.length < 6) return ['La contraseña es demasiado corta',];
        if (role && !Array.isArray(role)) return ['El rol debe ser un arreglo de cadenas'];

        return [, new RegisterUserDto(name, email, password, role)]

    }
}