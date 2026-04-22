import { RegisterUser } from "../../application/use-cases";
import { envs } from "../../config";
import type { BcryptHashService, JwtTokenService, UserRepositoryImpl } from "../../infrastructure";


export class AdminSeed {

    static async run(repository: UserRepositoryImpl, hashService: BcryptHashService, tokenService: JwtTokenService) {
        try {
            const exist = await repository.findByEmail(envs.INITIAL_SUPERADMIN_EMAIL)
            if (exist) return
            await new RegisterUser(repository, hashService, tokenService)
                .execute({
                    name: 'super Admin',
                    email: envs.INITIAL_SUPERADMIN_EMAIL,
                    password: envs.INITIAL_SUPERADMIN_PASSWORD,
                    role: ['SUPER_ADMIN_ROLE']
                })
            console.log('SuperAdmin seeded')
        } catch (error) {
            console.log(error)
        }
    }
}