import { BiodataSiswa, BiodataOrtu, BiodataWali, CSBProfile, TempatTinggal } from "@/types/biodataType";

export async function inputBiodata(
  userID: string,
  formDataB: CSBProfile,
  formDataC: BiodataSiswa,
  formDataD: BiodataOrtu,
  formDataE: BiodataWali | null,
  formDataF: TempatTinggal
) {
  const res = await fetch("/api/biodata/input", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userID,
      csb: formDataB,
      siswa: formDataC,
      ortu: formDataD,
      wali: formDataE,
      tempat: formDataF,
    }),
  });
  console.log(formDataD, formDataE);

  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
}

export async function fetchBioSiswa() {
  const res = await fetch("/api/biodata/fetch");
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
}

export async function fetchBioProfile() {
  const res = await fetch("/api/biodata/profile");
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
}
