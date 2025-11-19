export type Pembayaran = {
  id: string;
  nama_lengkap: string;
  lembaga: string;
  kelas: string;
  status: "Lunas" | "Belum Lunas";
  bukti?: string | null;
};
