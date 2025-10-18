"use client";
import { useEffect, useState, useCallback } from "react";
import { getAllPembayaran, Pembayaran } from "@/services/admin/servicePembayaran";

export function usePembayaran() {
  const [data, setData] = useState<Pembayaran[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPembayaran = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getAllPembayaran(); // ⬅️ panggil service, bukan fetch langsung
      setData(result);
      setError(null);
    } catch (err: any) {
      console.error("Error fetchPembayaran:", err);
      setError(err.message || "Gagal memuat data pembayaran");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPembayaran();
  }, [fetchPembayaran]);

  return {
    data,
    loading,
    error,
    refresh: fetchPembayaran,
  };
}
