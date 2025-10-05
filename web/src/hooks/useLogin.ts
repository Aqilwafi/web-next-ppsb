// hooks/useLogin.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/serviceAuth";
import { initUserStepStatus } from "@/services/serviceStep";

export function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(email, password);
      if (!data.success) throw new Error(data.message);

      // simpan user sementara di localStorage
      localStorage.setItem("user", JSON.stringify({id: data.user.id, un: data.user.username}));
      if (data.success) await initUserStepStatus(data.user.id);

      // redirect ke dashboard
      console.log("Redirecting to dashboard...");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
