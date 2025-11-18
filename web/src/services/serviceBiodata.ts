import { BiodataSiswaToDB, BiodataOrtuToDB, BiodataWaliToDB, CSBProfileToDB, TempatTinggalToDB } from "@/types/biodataType";

export async function inputBiodata(
  userID: string,
  formDataB: CSBProfileToDB,
  formDataC: BiodataSiswaToDB,
  formDataD: BiodataOrtuToDB,
  formDataE: BiodataWaliToDB | null,
  formDataF: TempatTinggalToDB
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

