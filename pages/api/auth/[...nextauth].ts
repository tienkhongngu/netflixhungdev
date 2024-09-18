import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import prismadb from '@/lib/prismadb'
import {compare} from 'bcrypt'

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default NextAuth({
    providers: [
        // thiet lap xuc thuc github
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || ''
        }),
        // thiet lap xac thuc google 
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                }
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password){
                    throw new Error('Vui lòng nhập Email và Mật khẩu');
                }
                console.log('Email input:', credentials.email);
                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                });
                console.log('User:', user);
                if (!user || !user.hashedPassword){
                    throw new Error('Email không tồn tại')
                }

                const isCorrectPassword = await compare(
                    credentials.password, 
                    user.hashedPassword);

                    if (!isCorrectPassword){
                        throw new Error('Mật khẩu không đúng')
                    }

                    return user;
            }
        })
    ],

    // xac thuc 
    pages: {
        signIn: '/auth/signin'
    },
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prismadb),
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, 
    },
    callbacks: {
        async session({ session, token }) {
          return session;
        },
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
})