// app/api/biodata/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// Helper mapping data
function mapBiodata(body: any) {
  return [
    body.userId,
    body.tempat_lahir,
    body.tanggal_lahir || null,
    body.alamat,
    body.agama || 'Islam',
    body.anak_ke ?? 1,
    body.jumlah_saudara ?? null,
    body.golongan_darah || null,
    body.penyakit || null,
    body.nama_ayah || null,
    body.nama_ibu || null,
    body.pekerjaan_ayah || null,
    body.pekerjaan_ibu || null,
    body.no_telp_ayah || null,
    body.no_telp_ibu || null,
    body.alamat_ortu || null,
    body.asal_sekolah || null,
    body.tahun_lulus ?? null
  ];
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId wajib dikirim" }, { status: 400 });
    }

    const result = await pool.query(
      "SELECT * FROM biodata_lengkap WHERE user_id = $1 LIMIT 1",
      [userId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Biodata tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (err) {
    console.error("GET /api/biodata error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "userId, tempat_lahir, tanggal_lahir, dan alamat wajib diisi" },
        { status: 400 }
      );
    }

    const values = mapBiodata(body);

    const existing = await pool.query("SELECT id FROM biodata_lengkap WHERE user_id = $1", [userId]);

    let result;
    if (existing.rowCount > 0) {
      // UPDATE
      result = await pool.query(
        `UPDATE biodata_lengkap SET
          tempat_lahir=$2,
          tanggal_lahir=$3,
          alamat=$4,
          agama=$5,
          anak_ke=$6,
          jumlah_saudara=$7,
          golongan_darah=$8,
          penyakit=$9,
          nama_ayah=$10,
          nama_ibu=$11,
          pekerjaan_ayah=$12,
          pekerjaan_ibu=$13,
          no_telp_ayah=$14,
          no_telp_ibu=$15,
          alamat_ortu=$16,
          asal_sekolah=$17,
          tahun_lulus=$18
        WHERE user_id=$1
        RETURNING *`,
        values
      );
    } else {
      // INSERT
      result = await pool.query(
        `INSERT INTO biodata_lengkap (
          user_id, tempat_lahir, tanggal_lahir, alamat, agama, anak_ke,
          jumlah_saudara, golongan_darah, penyakit, nama_ayah, nama_ibu,
          pekerjaan_ayah, pekerjaan_ibu, no_telp_ayah, no_telp_ibu, alamat_ortu, asal_sekolah, tahun_lulus
        ) VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18
        ) RETURNING *`,
        values
      );
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (err) {
    console.error("POST /api/biodata error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
