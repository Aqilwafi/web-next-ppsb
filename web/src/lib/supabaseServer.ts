// lib/supabaseServer.ts
import { createClient } from "@supabase/supabase-js";

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, // masih bisa pakai var ini
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ JANGAN expose ke browser
);
