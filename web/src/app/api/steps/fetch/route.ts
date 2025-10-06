import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const supabase = await supabaseServer();

    const { data, error } = await supabase
      .from("user_step_status")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.error(err.message); // Error object
    } else if (typeof err === "string") {
      console.error(err); // Kalau API throw string
    } else {
      console.error("Gagal mengambil biodata."); // fallback
    }
    return NextResponse.json(
      { success: false},
      { status: 500 }
    );
  }
}
