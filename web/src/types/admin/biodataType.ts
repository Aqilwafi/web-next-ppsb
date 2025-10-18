export interface BiodataSiswa {
  id: number;
  nama_lengkap: string;
  nisn?: string;
  nik?: string;
  no_kk?: string;
  jenis_kelamin: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  agama?: string;
  hobi?: string;
  cita_cita?: string;
  jumlah_saudara?: number;
  anak_ke?: number;
  golongan_darah?: string;
  penyakit?: string;
}

export interface BiodataOrtu {
  nama_ayah?: string;
  nama_ibu?: string;
  pekerjaan_ayah?: string;
  pekerjaan_ibu?: string;
  status_ayah?: string;
  status_ibu?: string;
  no_telp_ayah?: string;
  no_telp_ibu?: string;
  nik_ayah?: string;
  nik_ibu?: string;
  tempat_lahir_ayah?: string;
  tempat_lahir_ibu?: string;
  tanggal_lahir_ayah?: string;
  tanggal_lahir_ibu?: string;
  penghasilan_ayah?: string;
  penghasilan_ibu?: string;
  pendidikan_ayah?: string;
  pendidikan_ibu?: string;
  alamat_ortu?: string;
}

export interface BiodataWali {
  nama_wali?: string;
  nik_wali?: string;
  tempat_lahir_wali?: string;
  tanggal_lahir_wali?: string;
  pendidikan_wali?: string;
  pekerjaan_wali?: string;
  penghasilan_wali?: string;
  no_telp_wali?: string;
}

export interface TempatTinggal {
  status_rumah?: string;
  tinggal_bersama?: string;
  alamat?: string;
}

export interface Biodata {
  id: number;
  nama_lengkap: string;
  nisn?: string;
  nik?: string;
  no_kk?: string;
  jenis_kelamin: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  agama?: string;
  hobi?: string;
  cita_cita?: string;
  jumlah_saudara?: number;
  anak_ke?: number;
  golongan_darah?: string;
  penyakit?: string;
  lembaga?: string;
  tingkatan?: string;
  asal_sekolah?: string;
  tahun_lulus?: number;
  alamat_pendidikan_sebelumnya?: string;
  npsn?: string;
  orang_tua?: BiodataOrtu;
  wali?: BiodataWali;
  tempat_tinggal?: TempatTinggal;
}
