import { JwtAdapter } from "../../config";
import type { TokenService } from "../../domain/services/token.service";


export class JwtTokenService implements TokenService {


    async generateToken(payload: any, duration: string = '2h'): Promise<string | null> {
        return JwtAdapter.generateToken(payload, duration)
    }

    async validateToken<T>(token: string): Promise<T | null> {
        return JwtAdapter.validateToken<T>(token)
    }

}