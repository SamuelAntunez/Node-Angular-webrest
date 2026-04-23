import { Router } from 'express';
import { envs } from '../../config';
import { BcryptHashService, JwtTokenService, MongoUserDatasource, NodeMailerService, UserRepositoryImpl } from '../../infrastructure';
import { AuthMiddleware, RoleMiddleware } from '../middlewares';
import { PostgresUserDatasource } from '../../infrastructure/datasource/postgres/postgres-user.datasrouce';
import { AdminController } from './controller';





export class AdminRoutes {

    static get routes(): Router {

        const router = Router();

        // Instancias de la infraestructura
        const mongoRepository = new MongoUserDatasource()
        const postgresRepository = new PostgresUserDatasource()
        const repository = new UserRepositoryImpl(postgresRepository)
        const hashService = new BcryptHashService();
        const tokenService = new JwtTokenService();

        const emailService = new NodeMailerService(envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY, envs.SEND_EMAIL)

        //Middleware
        const authMiddleware = new AuthMiddleware(tokenService, repository)

        // controlador
        const controller = new AdminController(repository, hashService, tokenService);

        // Definir las rutas
        router.post('/register', [authMiddleware.validateJWT, RoleMiddleware.isAdmin], controller.registerUser);

        return router;
    }


}

