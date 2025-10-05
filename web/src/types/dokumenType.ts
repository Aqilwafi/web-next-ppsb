// bentuk tabel dokumen
export type Dokumen = {
  id: number;
  siswa_id: number; // memang menggunakan siswa_id (int) saja
  nama_file: string;
  tipe_file: string;
  url: string; //url dari storage
  uploaded_at?: string;
};

// untuk ke storage
export type StorageDoks = {
  asli: File,
  nama_file: string;
  tipe_file: string;
  ext: string;
};

export type StorageDoks2 = {
  nama_file: string;
  tipe_file: string;
  ext: string;
};