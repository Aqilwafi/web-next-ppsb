export async function getPembayaran() {
  try {
    const res = await fetch("/api/admin/fetch/pembayaran", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // biar selalu fresh
    });

    if (!res.ok) {
      throw new Error("Gagal memuat data pembayaran");
    }

    return await res.json();
  } catch (error) {
    console.error("[ERROR FETCH PEMBAYARAN]", error);
    return [];
  }
}
