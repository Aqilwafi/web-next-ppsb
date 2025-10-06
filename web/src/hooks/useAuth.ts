import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser, getCurrentUser} from "@/services/serviceAuth";

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // cek session saat mount
    const fetchSession = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error("error");
      } finally {
        setLoading(false);
      }
    };
    fetchSession();

    // listener logout Supabase
    const unsubscribe = onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const login = async (email: string, password: string) => {
    setLoadingLogin(true);
    setError(null);
    try {
      const loggedInUser = await loginUser(email, password);
      if (!loggedInUser) throw new Error("Email atau password salah");
      setUser(loggedInUser);
      router.push("/dashboard");
    } catch (err) {
      setError("Login gagal");
    } finally {
      setLoadingLogin(false);
    }
  };

  const logout = async () => {
    setLoadingLogout(true);
    try {
      //await logoutUser();
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLogout(false);
    }
  };

  return { user, loading, login, logout, loadingLogin, loadingLogout, error };
}
