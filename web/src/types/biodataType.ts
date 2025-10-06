export type UsersAkun = {
  email: string;
  username: string;
};

export type CSBProfile = {
  id: string; // UUID
  lembaga: string | null;
  tingkatan?: string | null;
  asal_sekolah?: string | null;
  tahun_lulus?: string | null;
  alamat_pendidikan_sebelumnya?: string | null;
  npsn?: string | null;
  created_at?: string; // ISO date string
};

export type BiodataSiswa = {
  id?: string | null;
  profile_id: string; // UUID
  nama_lengkap: string | null;
  nisn?: string | null;
  nik?: string | null;
  no_kk?: string | null;
  jenis_kelamin: string;
  tempat_lahir?: string | null;
  tanggal_lahir?: string | null; // ISO date string
  agama?: string | null;
  hobi?: string | null;
  cita_cita?: string | null;
  jumlah_saudara?: number | null;
  anak_ke?: number | null;
  golongan_darah?: string | null;
  penyakit?: string | null;
};

export type BiodataOrtu = {
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

export type BiodataWali = {
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

export type TempatTinggal = {
  id?: string | null;
  siswa_id: string;
  status_rumah?: string | null;
  tinggal_bersama?: string | null;
  alamat?: string | null;
};