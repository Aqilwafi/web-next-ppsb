import { useEffect, useState } from "react";
import { inputBiodata, fetchBioSiswa } from "@/services/serviceBiodata";
import { BiodataSiswa, BiodataOrtu, BiodataWali, TempatTinggal, CSBProfile, UsersAkun } from "@/types/biodataType";
import { normalizeSiswa, normalizeOrtu, normalizeWali, normalizeTempat, normalizeCSB, normalizeAkun } from "@/utils/utilNormalize";
import { denormalizeCSB, denormalizeSiswa, denormalizeOrtu, denormalizeWali, denormalizeTempat } from "@/utils/utilDenormalize";

export function useBiodata(userId: string) {
  
  // ✅ Inisialisasi aman tanpa null dan tanpa error TS
      const [dataA, setDataA] = useState<UsersAkun>({
        email: "",
        username: "",
      });

      const [dataB, setDataB] = useState<CSBProfile>({
        id: "",
        lembaga: "",
        tingkatan: "",
        asal_sekolah: "",
        tahun_lulus: null,
        alamat_pendidikan_sebelumnya: "",
        npsn: "",
        created_at: "",
      });

      const [dataC, setDataC] = useState<BiodataSiswa>({
        id: "",
        profile_id: "",
        nama_lengkap: "",
        nisn: "",
        nik: "",
        no_kk: "",
        jenis_kelamin: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        agama: "",
        hobi: "",
        cita_cita: "",
        jumlah_saudara: null,
        anak_ke: null,
        golongan_darah: "",
        penyakit: "",
      });

      const [dataD, setDataD] = useState<BiodataOrtu>({
        id: "",
        siswa_id: "",
        nama_ayah: "",
        nama_ibu: "",
        pekerjaan_ayah: "",
        pekerjaan_ibu: "",
        status_ayah: "",
        status_ibu: "",
        no_telp_ayah: "",
        no_telp_ibu: "",
        nik_ayah: "",
        nik_ibu: "",
        tempat_lahir_ayah: "",
        tempat_lahir_ibu: "",
        tanggal_lahir_ayah: "",
        tanggal_lahir_ibu: "",
        penghasilan_ayah: "",
        penghasilan_ibu: "",
        pendidikan_ayah: "",
        pendidikan_ibu: "",
        alamat_ortu: "",
        created_at: "",
      });

      const [dataE, setDataE] = useState<BiodataWali | null>(null); // optional

      const [dataF, setDataF] = useState<TempatTinggal>({
        id: "",
        siswa_id: "",
        status_rumah: "",
        tinggal_bersama: "",
        alamat: "",
      });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
  try {
    setLoading(true);

    const { akun, csb, siswa, ortu, tempat, wali } = await fetchBioSiswa();
    console.log(wali);

    setDataA(normalizeAkun(akun));
    setDataB(normalizeCSB(csb));
    setDataC(normalizeSiswa(siswa));
    setDataD(normalizeOrtu(ortu));
    setDataE(normalizeWali(wali)); // boleh null
    setDataF(normalizeTempat(tempat));

    console.log(dataE);
    console.log(dataD);
    console.log(dataF);

    setError(null);
  } catch (err) {
    setError(err || "Gagal mengambil biodata.");
  } finally {
    setLoading(false);
  }
};


  const inputData = async (formDataB: CSBProfile, formDataC: BiodataSiswa, formDataD: BiodataOrtu, formDataE: BiodataWali | null, formdataF: TempatTinggal) => {
    try {
      setLoading(true);
      /*const DnB = denormalizeCSB(formDataB);
      const DnC = denormalizeSiswa(formDataC);
      const DnD = denormalizeOrtu(formDataD);*/
      const DnE = formDataE ? denormalizeWali(formDataE) : null;
      //const DnF = denormalizeTempat(formdataF);
      
      //await inputBiodata(userId, DnB, DnC, DnD, DnE, DnF);
      console.log(formDataE);
      await inputBiodata(userId, formDataB, formDataC, formDataD, DnE, formdataF);

      //await fetchData(); // Refresh data setelah input
      setError(null);
    } catch (err) {
      setError(err || "Gagal mengirim biodata.");
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
