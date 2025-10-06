import { BiodataSiswa, BiodataOrtu, BiodataWali, TempatTinggal, CSBProfile, UsersAkun } from "@/types/biodataType";

function emptyToNull<T>(value: T): T | null {
  if (typeof value === "string") return value.trim() === "" ? null : (value as unknown);
  return value ?? null;
}

export function denormalizeSiswa(siswa: BiodataSiswa): BiodataSiswa {
  return {
    ...siswa,
    nisn: emptyToNull(siswa.nisn),
    nik: emptyToNull(siswa.nik),
    no_kk: emptyToNull(siswa.no_kk),
    tempat_lahir: emptyToNull(siswa.tempat_lahir),
    tanggal_lahir: emptyToNull(siswa.tanggal_lahir),
    hobi: emptyToNull(siswa.hobi),
    cita_cita: emptyToNull(siswa.cita_cita),
    penyakit: emptyToNull(siswa.penyakit),
    golongan_darah: emptyToNull(siswa.golongan_darah),
    jumlah_saudara: siswa.jumlah_saudara ?? null,
    anak_ke: siswa.anak_ke ?? null,
  };
}

export function denormalizeOrtu(ortu: BiodataOrtu): BiodataOrtu {
  return {
    ...ortu,
    nama_ayah: emptyToNull(ortu.nama_ayah),
    nama_ibu: emptyToNull(ortu.nama_ibu),
    pekerjaan_ayah: emptyToNull(ortu.pekerjaan_ayah),
    pekerjaan_ibu: emptyToNull(ortu.pekerjaan_ibu),
    penghasilan_ayah: emptyToNull(ortu.penghasilan_ayah),
    penghasilan_ibu: emptyToNull(ortu.penghasilan_ibu),
    no_telp_ayah: emptyToNull(ortu.no_telp_ayah),
    no_telp_ibu: emptyToNull(ortu.no_telp_ibu),
    nik_ayah: emptyToNull(ortu.nik_ayah),
    nik_ibu: emptyToNull(ortu.nik_ibu),
    tempat_lahir_ayah: emptyToNull(ortu.tempat_lahir_ayah),
    tempat_lahir_ibu: emptyToNull(ortu.tempat_lahir_ibu),
    tanggal_lahir_ayah: emptyToNull(ortu.tanggal_lahir_ayah),
    tanggal_lahir_ibu: emptyToNull(ortu.tanggal_lahir_ibu),
    pendidikan_ayah: emptyToNull(ortu.pendidikan_ayah),
    pendidikan_ibu: emptyToNull(ortu.pendidikan_ibu),
    status_ayah: emptyToNull(ortu.status_ayah),
    status_ibu: emptyToNull(ortu.status_ibu),
    alamat_ortu: emptyToNull(ortu.alamat_ortu),
  };
}

export function denormalizeWali(wali: BiodataWali): BiodataWali {
  return {
    ...wali,
    id: "",
    nama_wali: emptyToNull(wali.nama_wali),
    nik_wali: emptyToNull(wali.nik_wali),
    tempat_lahir_wali: emptyToNull(wali.tempat_lahir_wali),
    tanggal_lahir_wali: emptyToNull(wali.tanggal_lahir_wali),
    pendidikan_wali: emptyToNull(wali.pendidikan_wali),
    pekerjaan_wali: emptyToNull(wali.pekerjaan_wali),
    penghasilan_wali: emptyToNull(wali.penghasilan_wali),
    no_telp_wali: emptyToNull(wali.no_telp_wali),
  };
}

export function denormalizeTempat(tempat: TempatTinggal): TempatTinggal {
  return {
    ...tempat,
    status_rumah: emptyToNull(tempat.status_rumah),
    tinggal_bersama: emptyToNull(tempat.tinggal_bersama),
    alamat: emptyToNull(tempat.alamat),
  };
}

export function denormalizeCSB(csb: CSBProfile): CSBProfile {
  return {
    ...csb,
    lembaga: emptyToNull(csb.lembaga),
    tingkatan: emptyToNull(csb.tingkatan),
    asal_sekolah: emptyToNull(csb.asal_sekolah),
    tahun_lulus: csb.tahun_lulus ? Number(csb.tahun_lulus) : null,
    alamat_pendidikan_sebelumnya: emptyToNull(csb.alamat_pendidikan_sebelumnya),
    npsn: emptyToNull(csb.npsn),
  };
}

export function denormalizeAkun(akun: UsersAkun): UsersAkun {
  return {
    ...akun,
    email: emptyToNull(akun.email),
    username: emptyToNull(akun.username),
  };
}
