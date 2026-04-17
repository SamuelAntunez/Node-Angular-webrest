import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../services';
import { envs } from '../../config';
import { BcryptHashService, JwtTokenService, MongoUserDatasource, NodeMailerService, UserRepositoryImpl } from '../../infrastructure';





export class AuthRoutes {


    static get routes(): Router {

        const router = Router();

        // Instancias de la infraestructura
        const repository = new UserRepositoryImpl(new MongoUserDatasource)
        const hashService = new BcryptHashService();
        const tokenService = new JwtTokenService();

        // Normal
        const emailService = new NodeMailerService(envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY, envs.SEND_EMAIL)
        const authService = new AuthService(emailService)


        const controller = new AuthController(authService, repository, hashService, tokenService);

        // Definir las rutas
        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);

        router.get('/validate-email/:token', controller.validateEmail);



        return router;
    }


}

