/* =====================
   USERS & PROFILE TYPES
   ===================== */

export type UsersAkunFromDB = {
  email: string;
  username: string;
};

export type UsersAkunForm = {
  email: string;
  username: string;
};

export type UsersAkunToDB = {
  email: string;
  username: string;
};

export type CSBProfileFromDB = {
  id: string; // UUID
  lembaga: string | null;
  tingkatan?: string | null;
  asal_sekolah?: string | null;
  tahun_lulus?: string | null;
  alamat_pendidikan_sebelumnya?: string | null;
  npsn?: string | null;
  created_at?: string; // ISO date string
};

export type CSBProfileForm = {
  id: string;
  lembaga: string;
  tingkatan: string;
  asal_sekolah: string;
  tahun_lulus: string;
  alamat_pendidikan_sebelumnya: string;
  npsn: string;
  created_at: string;
};

export type CSBProfileToDB = {
  id: string;
  lembaga: string | null;
  tingkatan: string | null;
  asal_sekolah: string | null;
  tahun_lulus: string | null;
  alamat_pendidikan_sebelumnya: string | null;
  npsn: string | null;
};

/* =====================
   BIODATA SISWA
   ===================== */

export type BiodataSiswaFromDB = {
  id?: string | null;
  profile_id: string; // UUID
  nama_lengkap: string | null;
  nisn?: string | null;
  nik?: string | null;
  no_kk?: string | null;
  jenis_kelamin: string | null;
  tempat_lahir?: string | null;
  tanggal_lahir?: string | null;
  agama?: string | null;
  hobi?: string | null;
  cita_cita?: string | null;
  jumlah_saudara?: number | null;
  anak_ke?: number | null;
  golongan_darah?: string | null;
  penyakit?: string | null;
};

export type BiodataSiswaForm = {
  id: string;
  profile_id: string;
  nama_lengkap: string;
  nisn: string;
  nik: string;
  no_kk: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  agama: string;
  hobi: string;
  cita_cita: string;
  jumlah_saudara: number | null;
  anak_ke: number | null;
  golongan_darah: string;
  penyakit: string;
};

export type BiodataSiswaToDB = {
  id?: string | null;
  profile_id: string;
  nama_lengkap: string | null;
  nisn: string | null;
  nik: string | null;
  no_kk: string | null;
  jenis_kelamin: string | null;
  tempat_lahir: string | null;
  tanggal_lahir: string | null;
  agama: string | null;
  hobi: string | null;
  cita_cita: string | null;
  jumlah_saudara: number | null;
  anak_ke: number | null;
  golongan_darah: string | null;
  penyakit: string | null;
};

/* =====================
   BIODATA ORANG TUA
   ===================== */

export type BiodataOrtuFromDB = {
  id?: string | null;
  siswa_id: string;
  nama_ayah?: string | null;
  nama_ibu?: string | null;
  pekerjaan_ayah?: string | null;
  pekerjaan_ibu?: string | null;
  status_ayah?: string | null;
  status_ibu?: string | null;
  no_telp_ayah?: string | null;
  no_telp_ibu?: string | null;
  nik_ayah?: string | null;
  nik_ibu?: string | null;
  tempat_lahir_ayah?: string | null;
  tempat_lahir_ibu?: string | null;
  tanggal_lahir_ayah?: string | null;
  tanggal_lahir_ibu?: string | null;
  penghasilan_ayah?: string | null;
  penghasilan_ibu?: string | null;
  pendidikan_ayah?: string | null;
  pendidikan_ibu?: string | null;
  alamat_ortu?: string | null;
  created_at?: string;
};

export type BiodataOrtuForm = {
  id: string;
  siswa_id: string;
  nama_ayah: string;
  nama_ibu: string;
  pekerjaan_ayah: string;
  pekerjaan_ibu: string;
  status_ayah: string;
  status_ibu: string;
  no_telp_ayah: string;
  no_telp_ibu: string;
  nik_ayah: string;
  nik_ibu: string;
  tempat_lahir_ayah: string;
  tempat_lahir_ibu: string;
  tanggal_lahir_ayah: string;
  tanggal_lahir_ibu: string;
  penghasilan_ayah: string;
  penghasilan_ibu: string;
  pendidikan_ayah: string;
  pendidikan_ibu: string;
  alamat_ortu: string;
  created_at: string;
};

export type BiodataOrtuToDB = {
  id?: string | null;
  siswa_id: string;
  nama_ayah: string | null;
  nama_ibu: string | null;
  pekerjaan_ayah: string | null;
  pekerjaan_ibu: string | null;
  status_ayah: string | null;
  status_ibu: string | null;
  no_telp_ayah: string | null;
  no_telp_ibu: string | null;
  nik_ayah: string | null;
  nik_ibu: string | null;
  tempat_lahir_ayah: string | null;
  tempat_lahir_ibu: string | null;
  tanggal_lahir_ayah: string | null;
  tanggal_lahir_ibu: string | null;
  penghasilan_ayah: string | null;
  penghasilan_ibu: string | null;
  pendidikan_ayah: string | null;
  pendidikan_ibu: string | null;
  alamat_ortu: string | null;
};

/* =====================
   BIODATA WALI
   ===================== */

export type BiodataWaliFromDB = {
  id?: string | null;
  siswa_id?: string | null;
  nama_wali?: string | null;
  nik_wali?: string | null;
  tempat_lahir_wali?: string | null;
  tanggal_lahir_wali?: string | null;
  pendidikan_wali?: string | null;
  pekerjaan_wali?: string | null;
  penghasilan_wali?: string | null;
  no_telp_wali?: string | null;
  created_at?: string;
};

export type BiodataWaliForm = {
  id: string;
  siswa_id: string;
  nama_wali: string;
  nik_wali: string;
  tempat_lahir_wali: string;
  tanggal_lahir_wali: string;
  pendidikan_wali: string;
  pekerjaan_wali: string;
  penghasilan_wali: string;
  no_telp_wali: string;
  created_at?: string;
};

export type BiodataWaliToDB = {
  id?: string | null;
  siswa_id: string;
  nama_wali: string | null;
  nik_wali: string | null;
  tempat_lahir_wali: string | null;
  tanggal_lahir_wali: string | null;
  pendidikan_wali: string | null;
  pekerjaan_wali: string | null;
  penghasilan_wali: string | null;
  no_telp_wali: string | null;
};

/* =====================
   TEMPAT TINGGAL
   ===================== */

export type TempatTinggalFromDB = {
  id?: string | null;
  siswa_id: string;
  status_rumah?: string | null;
  tinggal_bersama?: string | null;
  alamat?: string | null;
};

export type TempatTinggalForm = {
  id: string;
  siswa_id: string;
  status_rumah: string;
  tinggal_bersama: string;
  alamat: string;
};

export type TempatTinggalToDB = {
  id?: string | null;
  siswa_id: string;
  status_rumah: string | null;
  tinggal_bersama: string | null;
  alamat: string | null;
};
