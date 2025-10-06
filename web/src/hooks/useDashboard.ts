"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// tipe user sederhana, sesuai isi localStorage
type LocalUser = {
  id: number;
  un: string; // disimpan sebagai 'un' di localStorage
};

export function useDashboard() {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return { user, loading, handleLogout };
}
