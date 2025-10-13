// types/student.ts

export type StudentDocumentStatus = "pending" | "approved" | "rejected";

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
    kk?: string;   // URL / base64 / identifier file
    ktp?: string;
    akte?: string;
  };
  statusDokumen: StudentDocumentStatusMap;
};

// status per dokumen
export type StudentDocumentStatusMap = {
  kk: StudentDocumentStatus;
  ktp: StudentDocumentStatus;
  akte: StudentDocumentStatus;
};
