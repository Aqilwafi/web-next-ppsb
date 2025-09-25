import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import pool from "@/lib/db";

export const authOptions = {
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

        // ini object yang dikirim ke JWT
        return { id: user.id, name: user.nama, username: user.username };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // simpan id dari user ke token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // masukkan id ke session.user
      if (token && session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
