import type { Request, Response } from "express";
import { CustomError, HashService, LoginUserDto, RegisterUserDto, TokenService, UserRepository } from "../../domain";
import { LoginUser, RegisterUser } from "../../application/use-cases";




export class AuthController {

    constructor(
        private readonly repository: UserRepository,
        private readonly hashService: HashService,
        private readonly tokenService: TokenService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        console.log(`${error}`)
        return res.status(500).json({ error: 'Internal Server error' })
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)
        if (error) return res.status(400).json({ error })
        new RegisterUser(this.repository, this.hashService, this.tokenService)
            .execute(registerUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body)
        if (error) return res.status(400).json({ error })
        new LoginUser(this.repository, this.hashService, this.tokenService)
            .execute(loginUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

}