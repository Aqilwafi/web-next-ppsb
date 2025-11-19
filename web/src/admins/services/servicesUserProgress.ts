// services/admin/serviceUserProgress.ts
import { UserProgress } from "@/admins/types/userProgressType";

export async function getAllUserProgress(): Promise<UserProgress[]> {
  try {
    const res = await fetch("/api/admin/fetch/progres", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Gagal mengambil data: ${res.statusText}`);
    }

    const data: { users: UserProgress[] } = await res.json();
    return data.users;
  } catch (err) {
    console.error("Error in serviceUserProgress:", err);
    throw err;
  }
}
