import { Router } from 'express';
import { CategoryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';




export class CategoryRoutes {


    static get routes(): Router {

        const router = Router();
        const controller = new CategoryController()

        // Definir las rutas
        // router.use('/api/todos', /*TodoRoutes.routes */ );

        router.get('/', controller.getCategory)
        router.post('/', AuthMiddleware.validateJWT, controller.createCategory)



        return router;
    }


}

