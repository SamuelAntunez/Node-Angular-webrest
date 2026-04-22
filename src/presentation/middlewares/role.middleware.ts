import type { NextFunction, Request, Response } from "express";

export class RoleMiddleware {
    private static checkAdminRole = (roles: string[]) => {
        return (req: Request, res: Response, next: NextFunction) => {

            const user = req.body.user;

            if (!user) {
                return res.status(500).json({ error: 'Se requiere validar el token primero' });
            }

            const hasRole = user.role.some((role: string) => roles.includes(role));
            if (!hasRole) {
                return res.status(403).json({ error: `User with role ${user.role} is not authorized` })
            }
            next()
        }
    }

    static isAdmin = this.checkAdminRole(['ADMIN_ROLE', 'SUPER_ADMIN_ROLE'])
    static isSuperAdmin = this.checkAdminRole(['SUPER_ADMIN_ROLE'])

}