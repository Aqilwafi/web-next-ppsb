// /services/userStepService.ts
import { supabaseClient } from "@/lib/supabaseClient";

export async function initUserStepStatus(userId: string | number) {
  try {
    // step_id = 1, status_step = 'completed' sebagai default
    const { data, error } = await supabaseClient
      .from("user_step_status")
      .insert({
        user_id: userId,
        step_id: 1,
        status_step: "completed",
      });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Gagal inisialisasi user_step_status:", err);
    return null;
  }
}
