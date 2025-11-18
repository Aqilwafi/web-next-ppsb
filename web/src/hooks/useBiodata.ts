import { useEffect, useState } from "react";
import { inputBiodata, fetchBioSiswa } from "@/services/serviceBiodata";
import { UsersAkunFromDB, UsersAkunForm, UsersAkunToDB, BiodataSiswaFromDB, BiodataSiswaForm, BiodataSiswaToDB, BiodataOrtuFromDB, BiodataOrtuForm, BiodataOrtuToDB, BiodataWaliFromDB, BiodataWaliForm, BiodataWaliToDB, TempatTinggalFromDB, TempatTinggalForm, TempatTinggalToDB, CSBProfileForm, CSBProfileToDB } from "@/types/biodataType";
import { mapFromDBToForm, mapFormToDB } from "@/utils/mapper";


export function useBiodata(userId: string) {
  
  // ✅ Inisialisasi aman tanpa null dan tanpa error TS
       const [dataA, setDataA] = useState<UsersAkunForm>({
          email: "",
          username: "",
        });

        const [dataB, setDataB] = useState<CSBProfileForm>({
          id: "",
          lembaga: "",
          tingkatan: "",
          asal_sekolah: "",
          tahun_lulus: "",
          alamat_pendidikan_sebelumnya: "",
          npsn: "",
          created_at: "",
        });

        const [dataC, setDataC] = useState<BiodataSiswaForm>({
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

        const [dataD, setDataD] = useState<BiodataOrtuForm>({
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

        const [dataE, setDataE] = useState<BiodataWaliForm>({
          id: "",
          siswa_id: "",
          nama_wali: "",
          nik_wali: "",
          tempat_lahir_wali: "",
          tanggal_lahir_wali: "",
          pendidikan_wali: "",
          pekerjaan_wali: "",
          penghasilan_wali: "",
          no_telp_wali: "",
          created_at: "",
        });

        const [dataF, setDataF] = useState<TempatTinggalForm>({
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
     // map tiap bagian ke bentuk Form
      setDataA(mapFromDBToForm(akun));
      setDataB(mapFromDBToForm(csb));
      setDataC(mapFromDBToForm(siswa));
      setDataD(mapFromDBToForm(ortu));
      setDataE(mapFromDBToForm(wali));
      setDataF(mapFromDBToForm(tempat));

    setError(null);
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


  const inputData = async (
    formDataB: CSBProfileForm,
    formDataC: BiodataSiswaForm,
    formDataD: BiodataOrtuForm,
    formDataE: BiodataWaliForm | null,
    formDataF: TempatTinggalForm
  ) => {
    try {
      setLoading(true);

      // 🔹 map semua form jadi format ToDB
      const toDB_B = mapFormToDB(formDataB) as CSBProfileToDB;
      const toDB_C = mapFormToDB(formDataC) as BiodataSiswaToDB;
      const toDB_D = mapFormToDB(formDataD) as BiodataOrtuToDB;
      const toDB_E = formDataE ? (mapFormToDB(formDataE) as BiodataWaliToDB) : null;
      const toDB_F = mapFormToDB(formDataF) as TempatTinggalToDB;

      await inputBiodata(userId, toDB_B, toDB_C, toDB_D, toDB_E, toDB_F);

      setError(null);
      // optionally refresh data
      // await fetchData();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else if (typeof err === "string") {
        console.error(err);
      } else {
        console.error("Gagal mengambil biodata.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId == userId) fetchData();
  }, [userId]);

  return { dataA, dataB, setDataB, dataC, setDataC, dataD, setDataD, dataE, setDataE, dataF, setDataF, loading, error, fetchData, inputData };
}
