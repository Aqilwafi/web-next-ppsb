import { BiodataSiswa, BiodataOrtu, BiodataWali, TempatTinggal, CSBProfile, UsersAkun } from "@/types/biodataType";

/// ----------------------- Normalisasi -----------------------
export function normalizeAkun(akun: UsersAkun | null): UsersAkun {
  return {
    email: akun?.email ?? "",
    username: akun?.username ?? "",
  };
}

export function normalizeCSB(csb: CSBProfile | null): CSBProfile {
  return {
    id: csb?.id ?? "",
    lembaga: csb?.lembaga ?? "",
    tingkatan: csb?.tingkatan ?? "",
    asal_sekolah: csb?.asal_sekolah ?? "",
    tahun_lulus: csb?.tahun_lulus ?? null,
    alamat_pendidikan_sebelumnya: csb?.alamat_pendidikan_sebelumnya ?? "",
    npsn: csb?.npsn ?? "",
    created_at: csb?.created_at ?? "",
  };
}

export function normalizeSiswa(siswa: BiodataSiswa | null): BiodataSiswa {
  return {
    id: siswa?.id ?? "",
    profile_id: siswa?.profile_id ?? "",
    nama_lengkap: siswa?.nama_lengkap ?? "",
    nisn: siswa?.nisn ?? "",
    nik: siswa?.nik ?? "",
    no_kk: siswa?.no_kk ?? "",
    jenis_kelamin: siswa?.jenis_kelamin ?? "",
    tempat_lahir: siswa?.tempat_lahir ?? "",
    tanggal_lahir: siswa?.tanggal_lahir ?? "",
    agama: siswa?.agama ?? "",
    hobi: siswa?.hobi ?? "",
    cita_cita: siswa?.cita_cita ?? "",
    jumlah_saudara: siswa?.jumlah_saudara ?? null,
    anak_ke: siswa?.anak_ke ?? null,
    golongan_darah: siswa?.golongan_darah ?? "",
    penyakit: siswa?.penyakit ?? "",
  };
}

export function normalizeOrtu(ortu: BiodataOrtu | null): BiodataOrtu {
  return {
    id: ortu?.id ?? "",
    siswa_id: ortu?.siswa_id ?? "",
    nama_ayah: ortu?.nama_ayah ?? "",
    nama_ibu: ortu?.nama_ibu ?? "",
    pekerjaan_ayah: ortu?.pekerjaan_ayah ?? "",
    pekerjaan_ibu: ortu?.pekerjaan_ibu ?? "",
    status_ayah: ortu?.status_ayah ?? "",
    status_ibu: ortu?.status_ibu ?? "",
    no_telp_ayah: ortu?.no_telp_ayah ?? "",
    no_telp_ibu: ortu?.no_telp_ibu ?? "",
    nik_ayah: ortu?.nik_ayah ?? "",
    nik_ibu: ortu?.nik_ibu ?? "",
    tempat_lahir_ayah: ortu?.tempat_lahir_ayah ?? "",
    tempat_lahir_ibu: ortu?.tempat_lahir_ibu ?? "",
    tanggal_lahir_ayah: ortu?.tanggal_lahir_ayah ?? "",
    tanggal_lahir_ibu: ortu?.tanggal_lahir_ibu ?? "",
    penghasilan_ayah: ortu?.penghasilan_ayah ?? "",
    penghasilan_ibu: ortu?.penghasilan_ibu ?? "",
    pendidikan_ayah: ortu?.pendidikan_ayah ?? "",
    pendidikan_ibu: ortu?.pendidikan_ibu ?? "",
    alamat_ortu: ortu?.alamat_ortu ?? "",
  };
}

export function normalizeWali(wali: BiodataWali | null): BiodataWali | null {
  if (!wali) return null; // boleh null karena opsional
  return {
    nama_wali: wali.nama_wali ?? "",
    nik_wali: wali.nik_wali ?? "",
    pendidikan_wali: wali.pendidikan_wali ?? "",
    no_telp_wali: wali.no_telp_wali ?? "",
    penghasilan_wali: wali.penghasilan_wali ?? "",
    pekerjaan_wali: wali.pekerjaan_wali ?? "",
  };
}

export function normalizeTempat(tempat: TempatTinggal | null): TempatTinggal {
  return {
    id: tempat?.id ?? "",
    siswa_id: tempat?.siswa_id ?? "",
    alamat: tempat?.alamat ?? "",
    status_rumah: tempat?.status_rumah ?? "",
    tinggal_bersama: tempat?.tinggal_bersama ?? "",
  };
}


