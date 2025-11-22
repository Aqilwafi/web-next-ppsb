"use client";

import { useEffect, useState } from "react";
import { getPembayaran } from "../services/servicePembayaran";

export function usePembayaran() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const result = await getPembayaran();
      setData(result.data);
      setLoading(false);
    }

    load();
  }, []);

  return { data, loading, setData };
}
