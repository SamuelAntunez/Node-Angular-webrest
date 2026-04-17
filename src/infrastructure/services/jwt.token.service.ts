import { envs } from "../../config";
import type { TokenService } from "../../domain/services/token.service";
import jwt, { type SignOptions } from 'jsonwebtoken';


const JWT_SEED = envs.JWT_SEED

export class JwtTokenService implements TokenService {


    async generateToken(payload: any, duration: string = '2h'): Promise<string | null> {

        return new Promise((resolve) => {
            const options: SignOptions = {
                expiresIn: duration as any
            }
            jwt.sign(payload, JWT_SEED, options, (err, token) => {
                if (err) return resolve(null);
                resolve(token || null)
            })

        })
    }
    validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);

                resolve(decoded as T)
            })
        })
    }

}