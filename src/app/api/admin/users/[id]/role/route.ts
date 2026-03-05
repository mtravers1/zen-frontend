import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const API_URL = process.env.API_URL;

export async function PATCH(
	_req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const session = await auth();

	if (!session?.user?.backendToken || session.user?.role !== "Admin" && session.user?.role !== "Super Admin") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const { id } = await params;

	const res = await fetch(`${API_URL}/api/role/users/${id}/role`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${session.user.backendToken}`,
		},
	});

	const data = await res.json().catch(() => ({}));

	if (!res.ok) {
		const message = data?.message ?? data?.error ?? "Failed to update role.";
		return NextResponse.json({ error: message }, { status: res.status });
	}

	return NextResponse.json(data);
}
