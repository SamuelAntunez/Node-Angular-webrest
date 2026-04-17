
export abstract class TokenService {


    abstract generateToken(
        payload: any,
        duration?: string,
    ): Promise<string | null>

    abstract validateToken<T>(token: string): Promise<T | null>
}