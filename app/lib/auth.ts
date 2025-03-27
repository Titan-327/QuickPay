import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./prisma";
import bcrypt from "bcryptjs";

// Extend the Session type to include the 'id' property
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

export const authOptions: AuthOptions = {
    //  adapter: PrismaAdapter(db),  
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "you@example.com" },
                password: { label: "Password", type: "password", placeholder: "••••••••" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                const existingUser = await db.user.findUnique({
                    where: { email: credentials.email }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password as string);
                    if (passwordValidation) {
                        return { id: existingUser.id, name: existingUser.name, email: existingUser.email };
                    }
                    throw new Error("Invalid credentials");
                }

                // If user does not exist, create a new user
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const newUser = await db.user.create({
                    data: {
                        email: credentials.email,
                        password: hashedPassword,
                        name: credentials.email.split("@")[0],
                        Balance: { create: { amount: 0 } } 
                    }
                });

                return { id: newUser.id, name: newUser.name, email: newUser.email };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const existingUser = await db.user.findUnique({
                    where: { email: user.email! },
                    include: { accounts: true }, // Ensure we get the linked accounts
                });
        
                if (existingUser) {
                    // Check if user already has a Google account linked
                    const hasGoogleAccount = existingUser.accounts.some((acc: { provider: string }) => acc.provider === "google");
        
                    if (!hasGoogleAccount) {
                        // Link Google account to existing user
                        await db.account.create({
                            data: {
                                userId: existingUser.id,
                                provider: "google",
                                providerAccountId: account.providerAccountId,
                                type:"googleId"
                            }
                        });
                    }
                    return true;
                } else {
                    // If user doesn't exist, create a new one and link Google
                    await db.user.create({
                        data: {
                            email: user.email!,
                            name: user.name || user.email!.split("@")[0],
                            Balance: { create: { amount: 0 } },
                            accounts: {
                                create: {
                                    provider: "google",
                                    providerAccountId: account.providerAccountId,
                                    type:"googleId"
                                }
                            }
                        }
                    });
                }
            }
            return true;
        },
        
        async session({ session, token }) {
            if (session&&session?.user) {
                session.user.id = token.id as string;
            }
            return session;
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },

    pages: {
        signIn: "/signin",
        error: "/signin", // Redirect errors to the signin page
    },
};
