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
  } catch (err: any) {
    console.error("fetchUserSteps error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
