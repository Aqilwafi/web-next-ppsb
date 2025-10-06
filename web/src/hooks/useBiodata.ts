import { useEffect, useState } from "react";
import { inputBiodata, fetchBioSiswa } from "@/services/serviceBiodata";
import { BiodataSiswa, BiodataOrtu, BiodataWali, TempatTinggal, CSBProfile, UsersAkun } from "@/types/biodataType";
import { normalizeSiswa, normalizeOrtu, normalizeWali, normalizeTempat, normalizeCSB, normalizeAkun } from "@/utils/utilNormalize";
import { denormalizeCSB, denormalizeSiswa, denormalizeOrtu, denormalizeWali, denormalizeTempat } from "@/utils/utilDenormalize";

export function useBiodata(userId: string) {
  const [dataA, setDataA] = useState<UsersAkun | null>("");
  const [dataB, setDataB] = useState<CSBProfile | null>("");
  const [dataC, setDataC] = useState<BiodataSiswa | null>("");
  const [dataD, setDataD] = useState<BiodataOrtu | null>("");
  const [dataE, setDataE] = useState<BiodataWali | null>("");
  const [dataF, setDataF] = useState<TempatTinggal | null>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      const { akun, csb, siswa, ortu, tempat, wali } = await fetchBioSiswa();
      console.log(wali);
      
      setDataA(normalizeAkun(akun ?? null));
      setDataB(normalizeCSB(csb ?? null));
      setDataC(normalizeSiswa(siswa ?? null));
      setDataD(normalizeOrtu(ortu ?? null));
      setDataE(normalizeWali(wali ?? null));
      setDataF(normalizeTempat(tempat ?? null));
      console.log(dataE);
      console.log(dataD);
      console.log(dataF);

      setError(null);
    } catch (err: any) {
      setError(err.message || "Gagal mengambil biodata.");
    } finally {
      setLoading(false);
    }
  };

  const inputData = async (formDataB: CSBProfile, formDataC: BiodataSiswa, formDataD: BiodataOrtu, formDataE: BiodataWali, formdataF: TempatTinggal) => {
    try {
      setLoading(true);
      /*const DnB = denormalizeCSB(formDataB);
      const DnC = denormalizeSiswa(formDataC);
      const DnD = denormalizeOrtu(formDataD);*/
      const DnE = denormalizeWali(formDataE);
      //const DnF = denormalizeTempat(formdataF);
      
      //await inputBiodata(userId, DnB, DnC, DnD, DnE, DnF);
      console.log(formDataE);
      await inputBiodata(userId, formDataB, formDataC, formDataD, DnE, formdataF);

      //await fetchData(); // Refresh data setelah input
      setError(null);
    } catch (err: any) {
      setError(err.message || "Gagal mengirim biodata.");
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId == userId) fetchData();
  }, [userId]);

  return { dataA, dataB, setDataB, dataC, setDataC, dataD, setDataD, dataE, setDataE, dataF, setDataF, loading, error, mutate: fetchData, inputData };
}
