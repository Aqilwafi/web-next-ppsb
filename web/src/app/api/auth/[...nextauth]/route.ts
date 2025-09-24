import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import pool from "@/lib/db";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const res = await pool.query(
          "SELECT * FROM users WHERE username = $1",
          [credentials.username]
        );
        const user = res.rows[0];
        if (!user) return null;
        const match = await compare(credentials.password, user.password);
        if (!match) return null;
        return { id: user.id, name: user.nama, username: user.username };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

export async function GET(req: Request) {
  return NextAuth(authOptions)(req);
}

export async function POST(req: Request) {
  return NextAuth(authOptions)(req);
}
