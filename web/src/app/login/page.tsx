"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ username, password });
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center gap-4 max-w-md w-full mx-auto mt-10 p-4">
      <Image
        src="/logo_lpi.jpg"
        alt="Logo LPI"
        width={120}
        height={120}
        priority
        className="rounded-full -mt-10"
      />

      <h1 className="text-2xl font-bold text-gray-900 text-center">
        BAITUN NA&apos;IM
      </h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-md mt-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
          required
        />

        <div className="flex gap-4 mt-2">
          <Link href="/">
            <button
              type="button"
              className="flex-1 px-4 py-3 rounded-2xl bg-gray-200 text-gray-800 shadow hover:bg-gray-300 transition"
            >
              Kembali
            </button>
          </Link>

          <button
            type="submit"
            className="flex-1 px-4 py-3 rounded-2xl bg-blue-500 text-white shadow hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
