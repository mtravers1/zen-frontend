import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const API_URL = process.env.API_URL;

export const { handlers, signIn, signOut, auth } = NextAuth({
	trustHost: true,
	session: { strategy: "jwt" },
	pages: {
		signIn: "/login",
		error: "/login",
	},
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				// Development test user - allows testing without backend
				if (process.env.NODE_ENV === 'development') {
					if (credentials.email === 'admin@test.com' && credentials.password === 'admin') {
						return {
							id: 'test-admin-id',
							email: 'admin@test.com',
							name: 'Test Admin',
							role: 'Admin',
							backendToken: '',
						};
					}
					   if (credentials.email === 'user@test.com' && credentials.password === 'user') {
						   return {
							   id: 'test-user-id',
							   email: 'user@test.com',
							   name: 'Test User',
							   role: 'account_manager', // Make this a staff role
							   backendToken: '',
						   };
					   }
				}

				// 1. Try backend API first
				if (API_URL) {
					try {
						const res = await fetch(`${API_URL}/api/auth/signin`, {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								email: credentials.email,
								password: credentials.password,
							}),
						});

						if (res.ok) {
							const user = await res.json();
							if (user?.token) {
								return {
									id: String(user._id ?? user.id),
									email: user.email,
									name: user.name
										? `${user.name.firstName ?? ""} ${user.name.lastName ?? ""}`.trim()
										: user.email,
									role: user.account_type ?? user.role ?? "Free",
									backendToken: user.token,
								};
							}
						}
					} catch {
						// Backend unavailable — fall through to local auth
					}
				}

				// 2. Fall back to local Prisma database
				const user = await prisma.user.findUnique({
					where: { email: String(credentials.email) },
				});

				if (!user?.password) return null;

				const valid = await bcrypt.compare(String(credentials.password), user.password);
				if (!valid) return null;

				return {
					id: user.id,
					email: user.email,
					name: user.name ?? user.email,
					role: user.role,
					backendToken: "",
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id ?? "";
				token.role = (user as { role: string }).role;
				token.backendToken = (user as { backendToken: string }).backendToken;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
				session.user.role = token.role as string;
				session.user.backendToken = token.backendToken as string;
			}
			return session;
		},
	},
});
