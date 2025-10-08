export async function uploadMultiDokumen(
  userID: string,
  FileKK: File,
  FileKTP: File,
  FileFoto: File
) {
  try {
    const formData = new FormData();
    formData.append("user_id", userID);
    formData.append("fileA", FileKK);
    formData.append("fileB", FileKTP);
    formData.append("fileC", FileFoto);

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

export async function uploadBukti(userID: string, file: File) {
  const formData = new FormData();
  formData.append("user_id", userID);
  formData.append("file", file);
  formData.append("jenis", "Bukti");

  const res = await fetch("/api/dokumen/bukti", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Upload gagal");
  }

  return data.data; // { user_id, tipe_file, url }
}