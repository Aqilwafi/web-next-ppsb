import { useState, useEffect } from "react";
import { fetchBiodata } from "@/admins/services/serviceBiodataSiswa";
import { Biodata } from "@/admins/types/biodataType";

export function useBiodata() {
  const [data, setData] = useState<Biodata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBiodata = async () => {
      setLoading(true);
      setError(null);
      try {
        const students = await fetchBiodata();
        setData(students);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    getBiodata();
  }, []);

  return { data, loading, error };
}
