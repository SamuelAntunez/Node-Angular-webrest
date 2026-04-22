import { regularExps } from "../../../config";




export class LoginUserDto {
    constructor(
        public readonly email: string,
        public readonly password: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, LoginUserDto?] {

        const { email, password } = object;
        if (!email) return ['Missing email',];
        if (typeof email !== 'string') return ['Email must be a string'];
        if (!regularExps.email.test(email)) return ['Email is not valid',]
        
        if (!password) return ['Missing Password',];
        if (typeof password !== 'string') return ['Password must be a string'];


        return [, new LoginUserDto(email, password)]

    }
}