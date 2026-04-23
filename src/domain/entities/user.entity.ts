import { CustomError } from "../errors/custom.errors";


export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailValidate: boolean,
        public password: string,
        public role: string[],
        public img?: string,
    ) { }

    static fromObject(object: { [key: string]: any }) {
        const { id, _id, name, email, emailValidated = false, password, role, img } = object;

        if (!_id && !id) throw CustomError.badRequest('Falta el id')
        if (!name) throw CustomError.badRequest('Falta el nombre')
        if (!email) throw CustomError.badRequest('Falta el correo electrónico')
        // if (emailValidated === undefined) throw CustomError.badRequest('Falta la validación del correo')
        if (!password) throw CustomError.badRequest('Falta la contraseña')
        if (!role) throw CustomError.badRequest('Falta el rol')


        return new UserEntity(_id || id, name, email, emailValidated, password, role, img)


    }

}