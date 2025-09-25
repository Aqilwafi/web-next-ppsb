import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
  
    if (!userId) {
      return NextResponse.json({ error: "UserId diperlukan" }, { status: 400 });
    }
  
    try {
      const result = await pool.query(
        `
        SELECT rs.id, rs.step_number, rs.label, rs.content, uss.status_step
        FROM registration_steps rs
        LEFT JOIN user_step_status uss
          ON rs.id = uss.step_id AND uss.user_id = $1
        ORDER BY rs.step_number
        `,
        [userId]
      );
  
      return NextResponse.json({ steps: result.rows });
    } catch (error) {
      console.error("GET progress error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }
  