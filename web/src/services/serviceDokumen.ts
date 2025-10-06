export async function uploadMultiDokumen(
  userID: string,
  siswaID: string,
  FileKK: File,
  FileKTP: File,
  FileFoto: File
) {
  try {
    const formData = new FormData();
    formData.append("user_id", userID);
    formData.append("siswa_id", siswaID);
    formData.append("fileA", FileKK);
    formData.append("fileB", FileKTP);
    formData.append("fileC", FileFoto);
    console.log(userID, siswaID, FileKK, FileKTP, FileFoto);

    const res = await fetch("/api/dokumen/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || "Upload gagal");

    return data.results; // array { jenis, url, path }
  } catch (err) {
    console.error("Service uploadMultiDokumen error:", err);
    throw err;
  }
}
