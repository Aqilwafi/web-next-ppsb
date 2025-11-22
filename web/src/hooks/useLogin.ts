// hooks/useLogin.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/serviceAuth";
import { initUserStepStatus } from "@/services/serviceStep";
import type { UserLoginResponse } from "@/types/userType"; // kalau punya type terpisah

export function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data: UserLoginResponse = await loginUser(email, password);

      if (!data.success) throw new Error(data.message || "Login gagal");

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify({ id: data.user.id, un: data.user.username })
        );

        try {
          await initUserStepStatus(data.user.id);
        } catch (e) {
          console.warn("Gagal init step:", e);
        }
      }

      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
