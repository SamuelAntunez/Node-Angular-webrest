import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { AdminRoutes } from './admin/routes';




export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/admin', AdminRoutes.routes);



    return router;
  }


}

