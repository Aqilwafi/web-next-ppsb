import { groupDokumenByUser } from "@/utils/mapper"

export async function getDokumen() {
  try {
    const res = await fetch("/api/admin/fetch/dokumen", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Gagal memuat data pembayaran");
    }

    const json = await res.json(); // ← ini wajib

    // memastikan bentuk data
    const grouped = groupDokumenByUser(json.data);
    return grouped;
  } catch (error) {
    console.error("[ERROR FETCH PEMBAYARAN]", error);
    return [];
  }
}
