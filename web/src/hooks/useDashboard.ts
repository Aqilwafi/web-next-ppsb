"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserLoginResponse } from "@/types/userType";

export function useDashboard() {
  const [user, setUser] = useState<UserLoginResponse>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); //memang aku namakan user, walaupun isinya id
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
