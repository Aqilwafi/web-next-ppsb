export async function fetchBiodata() {
  try {
    const res = await fetch("/api/admin/fetch/biodata");
    if (!res.ok) throw new Error("Gagal mengambil data biodata");
    const json = await res.json();

    return json.students ?? [];
  } catch (err: any) {
    throw new Error(err.message || "Terjadi kesalahan saat fetch biodata");
  }
}
