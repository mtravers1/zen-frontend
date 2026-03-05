import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function POST(req: NextRequest) {
	const { email } = await req.json();

	if (!email) {
		return NextResponse.json({ error: "Email is required." }, { status: 400 });
	}

	// Fire-and-forget to avoid email enumeration — always return success
	fetch(`${API_URL}/api/auth/resetPassword`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email }),
	}).catch(() => {});

	return NextResponse.json({ success: true });
}
