import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  try {
    const supabase = await supabaseServer();

    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }
    const userId = decoded.id as string;

    const { data, error } = await supabase
      .from("biodata_siswa")
      .select("id")
      .eq("profile_id", userId)
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error("fetchProfile API error:", err);
    return NextResponse.json({ success: false}, { status: 500 });
  }
}
