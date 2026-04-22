import type { NextFunction, Request, Response } from "express";
import { TokenService } from "../../domain";
import type { UserRepository } from "../../domain/repositories/user.repository";


export class AuthMiddleware {

    constructor(
        private readonly tokenService: TokenService,
        private readonly repository: UserRepository,
    ) { }

    validateJWT = async (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.header('Authorization')

        if (!authorization) return res.status(401).json({ error: 'No token provided' })
        if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer Token' })

        const token = authorization.split(' ').at(1) || ''

        try {
            const payload = await this.tokenService.validateToken<{ id: string }>(token)
            if (!payload) return res.status(401).json({ error: 'Invalid Token' })

            const user = await this.repository.findById(payload.id)
            if (!user) return res.status(401).json({ error: 'Invalid token - user' })

            req.body.user = user
            next()

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }

    }

}