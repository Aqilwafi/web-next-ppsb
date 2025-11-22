export interface DokumenUser {
  user_id: string;
  nama_lengkap: string | null;
  dokumen_status: string | null;
  uploaded_at: string | null;
  dokumen: {
    kk: string | null;
    ktp: string | null;
    akte: string | null;
  };
}
