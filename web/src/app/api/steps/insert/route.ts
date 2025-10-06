import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: NextRequest) {
  try {
    const { userId, step } = await req.json();
    const supabase = await supabaseServer();

    const { data, error } = await supabase
      .from("user_step_status")
      .upsert(
        { user_id: userId, step_number_id: step, status_step: true },
        { onConflict: "user_id,step_number_id" }
      )
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error("insertUserStepStatus error:", err);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
