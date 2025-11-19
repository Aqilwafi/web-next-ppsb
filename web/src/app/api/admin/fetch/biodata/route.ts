import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { Biodata, BiodataOrtu, BiodataWali, TempatTinggal } from "@/admins/types/biodataType";

export async function GET() {
  try {
    const { data: siswa, error } = await supabaseAdmin
      .from("biodata_siswa")
      .select(`
        *,
        csb_profile (
          lembaga,
          tingkatan,
          asal_sekolah,
          tahun_lulus,
          alamat_pendidikan_sebelumnya,
          npsn,
          users(id, username, email)
        ),
        biodata_ortu (
          nama_ayah,
          nama_ibu,
          pekerjaan_ayah,
          pekerjaan_ibu,
          status_ayah,
          status_ibu,
          no_telp_ayah,
          no_telp_ibu,
          nik_ayah,
          nik_ibu,
          tempat_lahir_ayah,
          tempat_lahir_ibu,
          tanggal_lahir_ayah,
          tanggal_lahir_ibu,
          penghasilan_ayah,
          penghasilan_ibu,
          pendidikan_ayah,
          pendidikan_ibu,
          alamat_ortu
        ),
        biodata_wali (
          nama_wali,
          nik_wali,
          tempat_lahir_wali,
          tanggal_lahir_wali,
          pendidikan_wali,
          pekerjaan_wali,
          penghasilan_wali,
          no_telp_wali
        ),
        tempat_tinggal (
          status_rumah,
          tinggal_bersama,
          alamat
        )
      `);

    if (error) throw error;
    //console.log("DEBUG - Raw siswa data:", JSON.stringify(siswa, null, 2));

    // Mapping agar lebih mudah dipakai di UI
    const students: Biodata[] = siswa.map((s: any) => {
    const profile = s.csb_profile ?? {};
    const ortu: BiodataOrtu = s.biodata_ortu ?? {};
    const wali: BiodataWali = s.biodata_wali ?? {};
    const tempat: TempatTinggal = s.tempat_tinggal ?? {};

      return {
        id: s.id,
        nama_lengkap: s.nama_lengkap ?? profile.users?.username ?? "-",
        nisn: s.nisn ?? "-",
        nik: s.nik ?? "-",
        no_kk: s.no_kk ?? "-",
        jenis_kelamin: s.jenis_kelamin ?? "-",
        tempat_lahir: s.tempat_lahir ?? "-",
        tanggal_lahir: s.tanggal_lahir ?? "-",
        agama: s.agama ?? "-",
        hobi: s.hobi ?? "-",
        cita_cita: s.cita_cita ?? "-",
        jumlah_saudara: s.jumlah_saudara ?? 0,
        anak_ke: s.anak_ke ?? 1,
        golongan_darah: s.golongan_darah ?? "-",
        penyakit: s.penyakit ?? "-",
        lembaga: profile.lembaga ?? "-",
        tingkatan: profile.tingkatan ?? "-",
        asal_sekolah: profile.asal_sekolah ?? "-",
        tahun_lulus: profile.tahun_lulus ?? 0,
        alamat_pendidikan_sebelumnya: profile.alamat_pendidikan_sebelumnya ?? "-",
        npsn: profile.npsn ?? "-",
        orang_tua: ortu,
        wali: wali,
        tempat_tinggal: tempat,
      };
    });
    //console.log("DEBUG - Mapped students:", JSON.stringify(students, null, 2));
    return NextResponse.json({ students }, { status: 200 });
  } catch (err: any) {
    console.error("ERROR /api/admin/fetch/biodata:", err);
    return NextResponse.json(
      { message: err.message || "Gagal mengambil data" },
      { status: 500 }
    );
  }
}
