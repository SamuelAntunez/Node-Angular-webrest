import { UserModel } from "../../../data";
import { CustomError, UserEntity, type LoginUserDto, type RegisterUserDto } from "../../../domain";
import type { UserDatasource } from "../../../domain/datasources/user.datasource";

export class MongoUserDatasource implements UserDatasource {

    async findById(id: string): Promise<UserEntity | null> {
        const user = await UserModel.findById(id);
        if (!user) return null;
        return UserEntity.fromObject(user);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await UserModel.findOne({ email });
        if (!user) return null;
        return UserEntity.fromObject(user);
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const exist = await this.findByEmail(registerUserDto.email)
        if (exist) throw CustomError.badRequest('Email Already Exists')
        try {
            const user = new UserModel(registerUserDto)
            await user.save()
            return UserEntity.fromObject(user)
        } catch (error) {
            console.log({ error })
            throw CustomError.internalServer('Error saving user to database')
        }
    }

}