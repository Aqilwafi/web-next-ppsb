import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const supabase = await supabaseServer();

    const { data, error } = await supabase
      .from("registration_steps")
      .select("*");

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err : unknown) {
    console.error("fetchAllSteps error:", err);
    return NextResponse.json(
      { success: false},
      { status: 500 }
    );
  }
}
