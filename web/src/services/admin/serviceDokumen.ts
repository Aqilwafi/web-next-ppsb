// services/admin/documentService.ts
export type DocumentStatus = "pending" | "approved" | "rejected";

export type StudentDocumentStatus = {
  kk: DocumentStatus;
  ktp: DocumentStatus;
  akte: DocumentStatus;
};

export type Student = {
  id: number;
  email: string;
  nama: string;
  nisn: string;
  nik: string;
  no_kk: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  agama: string;
  jenis_kelamin: string;
  jumlah_saudara: number;
  anak_ke: number;
  golongan_darah: string;
  ortu: {
    nama_ayah: string;
    nama_ibu: string;
    nik_ayah: string;
    nik_ibu: string;
    tempat_lahir_ayah: string;
    tempat_lahir_ibu: string;
    tanggal_lahir_ayah: string;
    tanggal_lahir_ibu: string;
    pekerjaan_ayah: string;
    pekerjaan_ibu: string;
    alamat: string;
    no_telp_ayah: string;
    no_telp_ibu: string;
  };
  wali?: {
    nama: string;
    nik: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    pekerjaan: string;
    no_telp: string;
    alamat: string;
  };
  dokumen: {
    kk?: string;   // URL file / base64 / file identifier
    ktp?: string;
    akte?: string;
  };
  statusDokumen: StudentDocumentStatus;
};

// 🔹 Fetch semua siswa + biodata lengkap + dokumen
export async function fetchStudents(): Promise<Student[]> {
  const res = await fetch("/api/admin/dokumen", { credentials: "include" });
  if (!res.ok) throw new Error("Gagal mengambil data siswa");
  const data = await res.json();
  return data.students;
}

// 🔹 Update / upsert status dokumen
export async function upsertDocumentStatus(
  studentId: number,
  doc: keyof StudentDocumentStatus,
  status: DocumentStatus
) {
  const res = await fetch(`/api/admin/documents/${studentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ doc, status }),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Gagal mengupdate status dokumen");
  const data = await res.json();
  return data;
}

// 🔹 Fetch dokumen individual jika perlu preview
export async function fetchDocumentFile(studentId: number, doc: keyof Student["dokumen"]) {
  const res = await fetch(`/api/admin/documents/${studentId}/file?doc=${doc}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Gagal mengambil file dokumen");
  const blob = await res.blob();
  return URL.createObjectURL(blob); // buat bisa preview di browser
}
