import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function supabaseServer() {
  const cookieStore = await cookies() // ✅ harus pakai await

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // anon key → cukup buat login/register
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set() {
          // optional: di Next.js server cookies biasanya read-only
        },
        remove() {
          // optional
        },
      },
    }
  )
}
