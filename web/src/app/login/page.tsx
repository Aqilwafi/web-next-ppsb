"use client";

import Image from "next/image";
import LoginForm from "@/components/forms/loginForm";


export default function LoginPage() {
  

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gray-50">
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
        <h2 className="text-xl font-bold text-gray-900 text-center">LOGIN</h2>

        <LoginForm />
      </div>
    </main>
  );
}
