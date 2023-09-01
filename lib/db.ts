import {PrismaClient} from '@prisma/client'

declare global{
    var prisma :PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()


// this is a hack to prevent next js hot reload from initializing two clients 
if(process.env.NODE_ENV !== "production") globalThis.prisma = db