// src/config/bcrypt.adapter.ts
import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export class BcryptAdapter { // Clase con Mayúscula inicial
    static hash(password: string): string {
        return hashSync(password, genSaltSync());
    }
    static compare(password: string, hashed: string): boolean {
        return compareSync(password, hashed);
    }
}
