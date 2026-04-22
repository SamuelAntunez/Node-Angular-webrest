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
        if (!name) return ['Missing name',];
        if (typeof name !== 'string') return ['Name must be a string'];
        
        if (!email) return ['Missing email',];
        if (typeof email !== 'string') return ['Email must be a string'];
        if (!regularExps.email.test(email)) return ['Email is not valid',]
        
        if (!password) return ['Missing Password',];
        if (typeof password !== 'string') return ['Password must be a string'];
        if (password.length < 6) return ['password too short',];
        if (role && !Array.isArray(role)) return ['Role must be an array of strings'];

        return [, new RegisterUserDto(name, email, password, role)]

    }
}