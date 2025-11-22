"use client";

import { useEffect, useState } from "react";
import { getDokumen } from "../services/serviceDokumen";
import { DokumenUser } from "../types/dokumenType";

export function useDokumen() {
  const [data, setData] = useState<DokumenUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const result = await getDokumen(); // ← hasilnya DokumenUser[]
      setData(result);
      setLoading(false);
    }

    load();
  }, []);

  return { data, loading, setData };
}
