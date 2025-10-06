import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRegister } from "@/types/userType";
import { registerUser } from "@/services/serviceAuth";

export function useRegister() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (formData: UserRegister) => {
    setLoading(true);
    setError(null);
    try {
      await registerUser(formData);
      router.push("/login");
    } catch (err : unknown) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleRegister };
}
