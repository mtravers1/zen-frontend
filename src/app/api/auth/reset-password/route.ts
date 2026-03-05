import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function POST(req: NextRequest) {
	const { token, password } = await req.json();

	if (!token || !password) {
		return NextResponse.json({ error: "Token and password are required." }, { status: 400 });
	}

	if (password.length < 8) {
		return NextResponse.json(
			{ error: "Password must be at least 8 characters." },
			{ status: 400 }
		);
	}

	const res = await fetch(`${API_URL}/api/auth/recoverypassword`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ token, password }),
	});

	const data = await res.json().catch(() => ({}));

	if (!res.ok) {
		const message = data?.message ?? data?.error ?? "Invalid or expired reset link.";
		return NextResponse.json({ error: message }, { status: 400 });
	}

	return NextResponse.json({ success: true });
}
