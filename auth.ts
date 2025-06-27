import NextAuth from "next-auth";
import { v4 as uuidv4 } from "uuid";
import { PrismaAdapter } from "@auth/prisma-adapter";

import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "./prisma/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Credentials({
            authorize: async ({ email, password }) => {
                if (typeof email !== "string" || typeof password !== "string") {
                    throw new Error("Invalid credentials");
                }
                const user = await db.user.findUnique({
                    where: { email },
                    select: {
                        id: true,
                        password: true,
                        name: true,
                        email: true,
                        role: true,
                    },
                });

                if (!user || !user.password) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(password, user?.password);

                if (!passwordMatch) {
                    throw new Error("Invalid credentials");
                }
                /*  if (user && passwordMatch) {
                } */

                if (user) {
                    await db.session.create({
                        data: {
                            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                            sessionToken: uuidv4(),
                            userId: user?.id,
                            email: email,
                        },
                    });
                }

                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.role = token.role as string[];
            }
            return session;
        },
    },
});
