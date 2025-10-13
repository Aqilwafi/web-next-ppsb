import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("siswa_token")?.value;
  const user = token ? verifyToken(token) : null;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  return Response.json({ user });
}
