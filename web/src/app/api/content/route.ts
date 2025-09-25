import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db"; // pastikan pool DB sudah siap

type ContentFromDB = {
  id: number;
  registration_steps_id: number;
  label: string;
  content: string;
};

// GET -> fetch semua content step
export async function GET(req: NextRequest) {
  try {
    // opsional: filter berdasarkan step tertentu
    const stepId = req.nextUrl.searchParams.get("stepId");

    let query = "SELECT * FROM all_content";
    const params: any[] = [];

    if (stepId) {
      query += " WHERE registration_steps_id = $1";
      params.push(stepId);
    }

    query += " ORDER BY registration_steps_id ASC, id ASC";

    const { rows } = await pool.query(query, params);

    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/all_content error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
