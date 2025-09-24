"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // bisa tambahkan validasi / API call di sini
        console.log({ username, password });
        router.push("/"); // redirect ke home setelah login
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            {/* Logo */}
            <div className="flex flex-col items-center gap-4 max-w-md w-full">
                <Image
                    src="/logo_lpi.jpg"   // ← langsung path, tanpa import
                    alt="Logo LPI"
                    width={120}
                    height={120}
                    priority
                    className="rounded-full -mt-10"
                />  
                <div className="flex flex-col gap-8 w-full max-w-xs">
                    <h1 className="text-2xl font-bold text-gray-900 text-center">
                        BAITUN NA'IM
                    </h1>
                </div>
            
                {/* Form */}
                <div className="bg-white p-6 rounded-2xl shadow w-full max-w-6xl mx-auto" >
                    <form
                        onSubmit={handleLogin}
                        className=" border flex flex-col gap-4 w-full max-w-md mt-4 text-gray-500"
                    >
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full text-gray-500"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full text-gray-500"
                            required
                        />
                        {/* Tombol Kembali + Login */}
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
            </div>
        </main>
        
    );
}
