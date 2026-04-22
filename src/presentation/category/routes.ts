import { Router } from 'express';
import { CategoryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { JwtTokenService, MongoUserDatasource, UserRepositoryImpl } from '../../infrastructure';




export class CategoryRoutes {


    static get routes(): Router {

        const router = Router();
        //! DI 
        const tokenService = new JwtTokenService();
        const repository = new UserRepositoryImpl(new MongoUserDatasource())
        const authMiddleware = new AuthMiddleware(tokenService, repository)

        // controller
        const controller = new CategoryController()

        // Definir las rutas
        // router.use('/api/todos', /*TodoRoutes.routes */ );

        router.get('/', controller.getCategory)
        router.post('/', authMiddleware.validateJWT, controller.createCategory)



        return router;
    }


}

