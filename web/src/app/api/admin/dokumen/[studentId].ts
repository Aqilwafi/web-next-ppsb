import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { studentId } = req.query;

  if (req.method === "PATCH") {
    const { doc, status } = req.body;
    console.log(`Update student ${studentId}: ${doc} -> ${status}`);

    // Dummy response
    return res.status(200).json({ success: true, studentId, doc, status });
  }

  res.status(405).json({ message: "Method not allowed" });
}
