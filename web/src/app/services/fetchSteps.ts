// /services/fetchSteps.ts
import { supabaseClient } from "@/lib/supabaseClient";

export type StepFromDB = {
  step_id: number;
  step_number: number;
  label: string;
};

export type StepUser = {
  step_id: number;
  status_step: "completed" | "pending";
};

export const fetchSteps = async (userId: string): Promise<{ allSteps: StepFromDB[]; userSteps: StepUser[] }> => {
  try {
    // Ambil semua step dari registration_steps
    const { data: allSteps, error: stepsError } = await supabaseClient
      .from("registration_steps")
      .select("id, step_number, label");
    if (stepsError) throw stepsError;

    // Ambil status step user dari user_step_status
    const { data: userSteps, error: statusError } = await supabaseClient
      .from("user_step_status")
      .select("step_id, status_step")
      .eq("user_id", userId);
    if (statusError) throw statusError;

    // Sort allSteps berdasarkan step_number
    const sortedSteps = (allSteps || []).sort((a: any, b: any) => a.step_number - b.step_number);

    return {
      allSteps: sortedSteps.map((step: any) => ({
        step_id: step.id,
        step_number: step.step_number,
        label: step.label,
      })),
      userSteps: (userSteps || []).map((s: any) => ({
        step_id: s.step_id,
        status_step: s.status_step === "completed" ? "completed" : "pending",
      })),
    };
  } catch (err) {
    console.error("fetchSteps error:", err);
    return { allSteps: [], userSteps: [] };
  }
};
