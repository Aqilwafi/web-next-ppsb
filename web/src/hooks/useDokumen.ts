import { useState } from "react";
import { uploadMultiDokumen, uploadBukti } from "@/services/serviceDokumen";
import { fetchBioProfile } from "@/services/serviceBiodata"; // fungsi fetch siswa_id

export function useDokumen(user: string) {
  const [rawKK, setRawKK] = useState<File | null>(null);
  const [rawKTP, setRawKTP] = useState<File | null>(null);
  const [rawFoto, setRawFoto] = useState<File | null>(null);
  const [bukti, setBukti] = useState<File | null>(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 

  const inputDokumen = async () => {
    if ( !user || !rawKK || !rawKTP || !rawFoto) {
      throw new Error("Semua file harus diisi sebelum upload");
    }

    try {
      setLoading(true);
      setError(null);

      if (typeof user !== "string") {
        throw new Error("User ID tidak valid");
      }

      const results = await uploadMultiDokumen(user, rawKK, rawKTP, rawFoto);
      return results;
    } catch (err : unknown) {
      if (err instanceof Error) {
      console.error(err.message); // Error object
    } else if (typeof err === "string") {
      console.error(err); // Kalau API throw string
    } else {
      console.error("Gagal mengambil biodata."); // fallback
    }
    throw err; 
    } finally {
      setLoading(false);
    }
  };

  const inputBukti = async () => {
      if ( !user || !bukti) {
      throw new Error("File Bukti Pembayaran Harus diisi");
    }
    try {
      setLoading(true);
      setError(null);
      const result = await uploadBukti(user, bukti);
      return result;
    } catch (err) {
      console.error("Error upload:", err);
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    rawKK,
    rawKTP,
    rawFoto,
    bukti,
    setRawKK,
    setRawKTP,
    setRawFoto,
    setBukti,
    inputDokumen,
    inputBukti,
    loading,
    setLoading,
    error,
  };
}
