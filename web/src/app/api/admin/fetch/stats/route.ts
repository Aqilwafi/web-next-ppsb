import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { DashboardStats } from "@/types/admin/allStatsType";

export async function GET() {
  try {
    const { count: totalUsers, error: userError } = await supabaseAdmin
      .from("users")
      .select("*", { count: "exact", head: true });

    if (userError) throw userError;

    const { data: stepData, error: stepError } = await supabaseAdmin
      .from("user_step_status")
      .select("user_id, step_number_id, status_step");

    if (stepError) throw stepError;

    // --- Pastikan stepData selalu array ---
    const steps = stepData || [];

    // Gunakan kolom yang benar (status_step)
    const totalPaid = steps.filter(
      (s) => s.step_number_id === 2 && s.status_step === true
    ).length;

    const totalApprovePaid = totalPaid;
    const totalBiodata = steps.filter(
      (s) => s.step_number_id === 3 && s.status_step === true
    ).length;

    const totalDocs = steps.filter(
      (s) => s.step_number_id === 4 && s.status_step === true
    ).length;

    const totalDocsValid = totalDocs;
    const totalDocsReject = 0;

    const totalWaiting = steps.filter(
      (s) => s.step_number_id === 5 && s.status_step === true
    ).length;

    const totalAccepted = steps.filter(
      (s) => s.step_number_id === 6 && s.status_step === true
    ).length;

    const totalRejectedReg = totalAccepted;

    const stats: DashboardStats = {
      totalUsers: totalUsers ?? 0,
      totalPaid,
      totalApprovePaid,
      totalBiodata,
      totalDocs,
      totalDocsValid,
      totalDocsReject,
      totalWaiting,
      totalAccepted,
      totalRejectedReg,
    };

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
