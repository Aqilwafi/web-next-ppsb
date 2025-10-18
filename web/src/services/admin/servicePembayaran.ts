import { Pembayaran } from "@/types/admin/pembayaranType";
/**
 * Ambil semua data pembayaran siswa
 */
export async function getAllPembayaran(): Promise<Pembayaran[]> {
  try {
    const res = await fetch("/api/admin/pembayaran", {
      method: "GET",
      credentials: "include", // kirim cookie admin_token
    });

    if (!res.ok) {
      throw new Error("Gagal memuat data pembayaran");
    }

    const data = await res.json();
    return data.pembayaran as Pembayaran[];
  } catch (error) {
    console.error("Error getAllPembayaran:", error);
    throw error;
  }
}
