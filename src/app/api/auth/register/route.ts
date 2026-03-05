import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { name, email, password } = body;

	if (!email || !password || !name) {
		return NextResponse.json({ error: "All fields are required." }, { status: 400 });
	}

	if (password.length < 8) {
		return NextResponse.json(
			{ error: "Password must be at least 8 characters." },
			{ status: 400 }
		);
	}

	const res = await fetch(`${API_URL}/api/auth/signup`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ name, email, password }),
	});

	const data = await res.json().catch(() => ({}));

	if (!res.ok) {
		const message = data?.message ?? data?.error ?? "Registration failed.";
		const status = res.status === 409 ? 409 : 400;
		return NextResponse.json({ error: message }, { status });
	}

	return NextResponse.json({ success: true }, { status: 201 });
}
