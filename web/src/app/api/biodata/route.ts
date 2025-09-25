import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db"; // pastikan sudah ada koneksi DB

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      user_id,
      nama,
      tempat_lahir,
      tanggal_lahir,
      alamat,
      agama,
      anak_ke,
      jumlah_saudara,
      golongan_darah,
      penyakit,
      nama_ayah,
      nama_ibu,
      pekerjaan_ayah,
      pekerjaan_ibu,
      no_telp_ortu,
      alamat_ortu,
      asal_sekolah,
      tahun_lulus,
    } = data;

    const query = `
      INSERT INTO biodata_lengkap (
        user_id, nama, tempat_lahir, tanggal_lahir, alamat, agama,
        anak_ke, jumlah_saudara, golongan_darah, penyakit,
        nama_ayah, nama_ibu, pekerjaan_ayah, pekerjaan_ibu,
        no_telp_ortu, alamat_ortu, asal_sekolah, tahun_lulus
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18
      )
      RETURNING *;
    `;

    const values = [
      user_id, nama, tempat_lahir, tanggal_lahir, alamat, agama,
      anak_ke, jumlah_saudara, golongan_darah, penyakit,
      nama_ayah, nama_ibu, pekerjaan_ayah, pekerjaan_ibu,
      no_telp_ortu, alamat_ortu, asal_sekolah, tahun_lulus
    ];

    const result = await pool.query(query, values);

    return NextResponse.json({ message: "Biodata lengkap berhasil disimpan", data: result.rows[0] });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Terjadi kesalahan" }, { status: 500 });
  }
}
