// hooks/admin/useUserProgress.ts
"use client";

import { useState, useEffect } from "react";
import { getAllUserProgress } from "@/admins/services/servicesUserProgress";
import { UserProgress } from "@/admins/types/userProgressType";

export function useUserProgress() {
  const [data, setData] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const users = await getAllUserProgress();
        if (isMounted) setData(users);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Gagal mengambil data");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}
