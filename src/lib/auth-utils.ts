import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export function generateResetToken(): string {
	return crypto.randomBytes(32).toString("hex");
}

export function hashToken(token: string): string {
	return crypto.createHash("sha256").update(token).digest("hex");
}

export async function getPasswordResetTokenByEmail(email: string) {
	return prisma.passwordResetToken.findFirst({ where: { email } });
}

export async function getPasswordResetTokenByToken(token: string) {
	const hashed = hashToken(token);
	return prisma.passwordResetToken.findUnique({ where: { token: hashed } });
}

export async function createPasswordResetToken(email: string) {
	// Delete any existing token for this email
	await prisma.passwordResetToken.deleteMany({ where: { email } });

	const token = generateResetToken();
	const hashed = hashToken(token);
	const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

	await prisma.passwordResetToken.create({
		data: { email, token: hashed, expiresAt },
	});

	return token; // Return raw token (sent in email link)
}
