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
      if (err instanceof Error) {
      console.error(err.message); // Error object
    } else if (typeof err === "string") {
      console.error(err); // Kalau API throw string
    } else {
      console.error("Gagal mengambil biodata."); // fallback
    }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleRegister };
}
