import { PrismaClient } from "@prisma/client";

//conect frisma

declare global{
    namespace globalThis{
        var prismadb: PrismaClient
    }
}