// /services/serviceStep.ts
import { UserStepStatus, RegistrationStep } from "@/types/stepType";
import { supabaseClient } from "@/lib/supabaseClient";

// =======================
// User-specific (via /api)
// =======================
export async function initUserStepStatus(userId: string): Promise<UserStepStatus[] | null> {
  try {
    const res = await fetch("/api/steps/init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message);
    return data.data as UserStepStatus[];
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.error(err.message); // Error object
    } else if (typeof err === "string") {
      console.error(err); // Kalau API throw string
    } else {
      console.error("Gagal mengambil biodata."); // fallback
    }
    return null;
  }
}

export async function insertUserStepStatus(userId: string, step: number): Promise<UserStepStatus | null> {
  try {
    const res = await fetch("/api/steps/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, step }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message);
    return data.data as UserStepStatus;
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.error(err.message); // Error object
    } else if (typeof err === "string") {
      console.error(err); // Kalau API throw string
    } else {
      console.error("Gagal mengambil biodata."); // fallback
    }
    return null;
  }
}

export async function fetchUserSteps(userId: string): Promise<UserStepStatus[]> {
  try {
    const res = await fetch("/api/steps/fetch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message);
    return data.data as UserStepStatus[];
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.error(err.message); // Error object
    } else if (typeof err === "string") {
      console.error(err); // Kalau API throw string
    } else {
      console.error("Gagal mengambil biodata."); // fallback
    }
    return [];
  }
}

// =======================
// Public / read-only
// =======================
export async function fetchAllSteps(): Promise<RegistrationStep[]> {
  try {
    const { data, error } = await supabaseClient
      .from("registration_steps")
      .select("*")
      .order("step_number_id", { ascending: true });

    if (error) throw error;
    return data as RegistrationStep[];
  } catch (err : unknown) {
    if (err instanceof Error) {
      console.error(err.message); // Error object
    } else if (typeof err === "string") {
      console.error(err); // Kalau API throw string
    } else {
      console.error("Gagal mengambil biodata."); // fallback
    }
    return [];
  }
}
