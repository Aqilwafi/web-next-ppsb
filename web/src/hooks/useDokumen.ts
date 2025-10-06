import { useState } from "react";
import { uploadMultiDokumen } from "@/services/serviceDokumen";
import { fetchBioProfile } from "@/services/serviceBiodata"; // fungsi fetch siswa_id

export function useDokumen(user: unknown) {
  const [rawKK, setRawKK] = useState<File | null>(null);
  const [rawKTP, setRawKTP] = useState<File | null>(null);
  const [rawFoto, setRawFoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputDokumen = async () => {
    if ( user || !rawKK || !rawKTP || !rawFoto) {
      throw new Error("Semua file harus diisi sebelum upload");
    }

    try {
      setLoading(true);
      setError(null);

      const siswaID = await fetchBioProfile();
      if (!siswaID) throw new Error("Gagal ambil Siswa ID");

      if (typeof user !== "string") {
        throw new Error("User ID tidak valid");
      }

      const results = await uploadMultiDokumen(user, siswaID, rawKK, rawKTP, rawFoto);
      return results;
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

  return {
    rawKK,
    rawKTP,
    rawFoto,
    setRawKK,
    setRawKTP,
    setRawFoto,
    inputDokumen,
    loading,
    setLoading,
    error,
  };
}
