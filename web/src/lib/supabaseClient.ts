"use client";

import { createBrowserClient } from "@supabase/ssr";

// Client-side Supabase instance (pakai anon key)
export const supabaseClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,   // ✅ aman dipakai di browser
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
