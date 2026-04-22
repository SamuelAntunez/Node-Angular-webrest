// src/infrastructure/services/bcrypt.hash.service.ts
import { BcryptAdapter } from "../../config";
import type { HashService } from "../../domain/services/hash.service";

export class BcryptHashService implements HashService {
    hash(password: string): string {
        return BcryptAdapter.hash(password);
    }
    compare(password: string, hashed: string): boolean {
        return BcryptAdapter.compare(password, hashed);
    }
}
