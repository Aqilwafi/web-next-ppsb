import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const { data: profiles, error } = await supabaseAdmin
      .from("csb_profile")
      .select(`
        id,
        lembaga,
        tingkatan,
        users (id, username, email),
        biodata_siswa (nama_lengkap),
        user_step_status (
          step_number_id,
          status_step,
          registration_steps (label)
        )
      `);

    if (error) throw error;

    const mapped = profiles.map((p: any) => {
    const steps = p.user_step_status ?? [];

    // Filter hanya step yang complete
    const completed = steps.filter((s: any) => s.status_step);

    // Urutkan berdasarkan step_number_id
    completed.sort((a: any, b: any) => a.step_number_id - b.step_number_id);

    const completedSteps = completed.length;
    const completedStepLabels = completed.map((s: any) => s.registration_steps?.label ?? "-");

    return {
        id: p.users?.id,
        nama_lengkap: p.biodata_siswa?.[0]?.nama_lengkap ?? p.users?.username ?? "-",
        email: p.users?.email ?? "-",
        lembaga: p.lembaga ?? "-",
        tingkatan: p.tingkatan ?? "-",
        completedSteps,
        completedStepLabels,
    };
    });


    return NextResponse.json({ users: mapped });
  } catch (err: any) {
    console.error("ERROR /api/admin/fetch/progres:", err);
    return NextResponse.json(
      { message: err.message || "Gagal mengambil data" },
      { status: 500 }
    );
  }
}
