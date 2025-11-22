

export function mapFromDBToForm<T extends Record<string, any>>(data: T): any {
  if (!data) return {};
  const result: Record<string, any> = {};

  for (const key in data) {
    const val = data[key];
    if (val === null || val === undefined) result[key] = "";
    else result[key] = val;
  }

  return result;
}

export function mapFormToDB<T extends Record<string, any>>(form: T): any {
  const result: Record<string, any> = {};

  for (const key in form) {
    const val = form[key];
    if (val === "") result[key] = null;
    else result[key] = val;
  }

  return result;
}

import { DokumenUser } from "@/admins/types/dokumenType";
type DokumenTipe = "kk" | "ktp" | "akte";

export function groupDokumenByUser(rows: any[]): DokumenUser[] {
  const grouped: Record<string, DokumenUser> = {};
 
  rows.forEach((doc) => {
      if (!grouped[doc.user_id]) {
      grouped[doc.user_id] = {
        user_id: doc.user_id,
        nama_lengkap: doc.csb_profile?.biodata_siswa?.nama_lengkap ?? null,
        dokumen_status: doc.dokumen_status ?? null,
        uploaded_at: doc.uploaded_at ?? null,
        dokumen: { kk: null, ktp: null, akte: null },
      };
    }
   
    

    // Pastikan tipe_file valid
    if (["kk", "ktp", "akte"].includes(doc.tipe_file)) {
      grouped[doc.user_id].dokumen[doc.tipe_file as DokumenTipe] = doc.url;
    }
  });

  return Object.values(grouped);
}

