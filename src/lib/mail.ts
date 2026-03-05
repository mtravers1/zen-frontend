import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT) || 587,
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

export async function sendPasswordResetEmail(email: string, token: string) {
	const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
	const resetUrl = `${baseUrl}/reset-password?token=${token}`;

	await transporter.sendMail({
		from: process.env.SMTP_FROM ?? "noreply@zentavos.com",
		to: email,
		subject: "Reset your Zentavos password",
		html: `
			<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
				<h2>Password Reset Request</h2>
				<p>Click the button below to reset your password. This link expires in 1 hour.</p>
				<a href="${resetUrl}" style="
					display: inline-block;
					padding: 12px 24px;
					background-color: #1976d2;
					color: white;
					text-decoration: none;
					border-radius: 4px;
					margin: 16px 0;
				">Reset Password</a>
				<p style="color: #666; font-size: 12px;">
					If you did not request a password reset, you can safely ignore this email.
				</p>
			</div>
		`,
	});
}
