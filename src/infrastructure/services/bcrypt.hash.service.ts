
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import type { HashService } from "../../domain/services/hash.service";

export class BcryptHashService implements HashService {
    hash(password: string): string {
        const salt = genSaltSync();
        return hashSync(password, salt)
    }
    compare(password: string, hashed: string): boolean {
        return compareSync(password, hashed)
    }
}