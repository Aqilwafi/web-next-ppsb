import { NextResponse } from "next/server";
import pool from "@/lib/db";

/**
 * POST -> Update progress user
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, stepId, status } = body;

    if (!userId || !stepId || !status) {
      return NextResponse.json(
        { error: "userId, stepId, dan status wajib diisi" },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO user_step_status (user_id, step_id, status_step)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, step_id)
      DO UPDATE SET status_step = EXCLUDED.status_step, updated_at = NOW()
      RETURNING *
    `;

    const result = await pool.query(query, [userId, stepId, status]);

    return NextResponse.json({
      message: "Progress diperbarui",
      progress: result.rows[0],
    });
  } catch (error) {
    console.error("POST /progress error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
