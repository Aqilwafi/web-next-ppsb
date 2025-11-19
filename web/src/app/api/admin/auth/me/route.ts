import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET() {
  try {
    // Pastikan async access
    const cookieStore = await cookies(); // ✅ sekarang cookies() di-await
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    return Response.json({ user });
  } catch (err) {
    console.error("Error in /api/admin/auth/me:", err);
    return new Response("Failed to fetch auth info", { status: 500 });
  }
}
