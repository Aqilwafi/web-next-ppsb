import { BiodataSiswa, BiodataOrtu, BiodataWali, TempatTinggal, CSBProfile, UsersAkun } from "@/types/biodataType";

// Normalisasi semua field nullable menjadi string kosong atau default value
export function normalizeSiswa(siswa: BiodataSiswa | null): BiodataSiswa | null {
  if (!siswa) return null;
  return {
    ...siswa,
    
    nisn: siswa.nisn ?? "",
    nik: siswa.nik ?? "",
    no_kk: siswa.no_kk ?? "",
    tempat_lahir: siswa.tempat_lahir ?? "",
    tanggal_lahir: siswa.tanggal_lahir ?? "",
    hobi: siswa.hobi ?? "",
    cita_cita: siswa.cita_cita ?? "",
    penyakit: siswa.penyakit ?? "",
    golongan_darah: siswa.golongan_darah ?? "",
  };
}

export function normalizeOrtu(ortu: BiodataOrtu | null): BiodataOrtu | null {
  if (!ortu) return null;
  return {
    ...ortu,
    nama_ayah: ortu.nama_ayah ?? "",
    nama_ibu: ortu.nama_ibu ?? "",
    pekerjaan_ayah: ortu.pekerjaan_ayah ?? "",
    pekerjaan_ibu: ortu.pekerjaan_ibu ?? "",
    penghasilan_ayah: ortu.penghasilan_ayah ?? "",
    penghasilan_ibu: ortu.penghasilan_ibu ?? "",
    no_telp_ayah: ortu.no_telp_ayah ?? "",
    no_telp_ibu: ortu.no_telp_ibu ?? "",
    nik_ayah: ortu.nik_ayah ?? "",
    nik_ibu: ortu.nik_ibu ?? "",
    tempat_lahir_ayah: ortu.tempat_lahir_ayah ?? "",
    tempat_lahir_ibu: ortu.tempat_lahir_ibu ?? "",
    pendidikan_ayah: ortu.pendidikan_ayah ?? "",
    pendidikan_ibu: ortu.pendidikan_ibu ?? "",
    tanggal_lahir_ayah: ortu.tanggal_lahir_ayah ?? "",
    tanggal_lahir_ibu: ortu.tanggal_lahir_ibu ?? "",
    status_ayah: ortu.status_ayah ?? "",
    status_ibu: ortu.status_ibu ?? "",
    alamat_ortu: ortu.alamat_ortu ?? "",
  };
}

export function normalizeWali(wali: BiodataWali | null): BiodataWali | null {
  console.log(wali);
  if (!wali) return null;
  return {
    ...wali,
    nama_wali: wali.nama_wali ?? "",
    nik_wali: wali.nik_wali ?? "",
    pendidikan_wali: wali.pendidikan_wali ?? "",
    no_telp_wali: wali.no_telp_wali ?? "",
    penghasilan_wali: wali.penghasilan_wali ?? "",
    pekerjaan_wali: wali.pekerjaan_wali ?? "",
  };
}

export function normalizeTempat(tempat: TempatTinggal | null): TempatTinggal | null {
  if (!tempat) return null;
  return {
    ...tempat,
    alamat: tempat.alamat ?? "",
    status_rumah: tempat.status_rumah ?? "",
    tinggal_bersama: tempat.tinggal_bersama ?? "",
    // dst
  };
}

export function normalizeCSB(csb: CSBProfile | null): CSBProfile | null {
  if (!csb) return null;
  return {
    ...csb,
    tingkatan: csb.tingkatan ?? "",
    asal_sekolah: csb.asal_sekolah ?? "",
    tahun_lulus: csb.tahun_lulus ?? null,
    alamat_pendidikan_sebelumnya: csb.alamat_pendidikan_sebelumnya ?? "",
    npsn: csb.npsn ?? "",
    // dst
  };
}

export function normalizeAkun(akun: UsersAkun | null): UsersAkun | null {
  if (!akun) return null;
  return {
    ...akun,
    email: akun.email ?? "",
    username: akun.username ?? "",
  };
}
