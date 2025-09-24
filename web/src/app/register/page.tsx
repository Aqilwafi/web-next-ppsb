"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [selectedA, setSelectedA] = useState("");
    const [formData, setFormData] = useState({ email: "", password: "" });
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault(); // mencegah reload
        console.log(formData); // bisa kirim ke API/fetch
        router.push("/"); // redirect ke home
      };

    return (
        <main className="flex flex-col items-center justify-start min-h-screen gap-8 bg-gray-50">
            <header className="w-full bg-blue-600 text-white px-6 py-4 shadow flex justify-between items-center">
                <h1 className="text-xl font-bold">Baitun Na’im</h1>
                <nav>
                    <Link
                        href="/"
                        className="text-white hover:underline font-medium transition"
                    >
                        Kembali
                    </Link>
                </nav>
            </header>
            <div className="bg-white p-6 rounded-2xl shadow w-full max-w-6xl mx-auto" >
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Registrasi</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col w-full md:w-1/2">
                            <label className="mb-1 font-medium text-gray-700">Lembaga A</label>
                            <select value={selectedA}
                                    onChange={(e) => setSelectedA(e.target.value)}
                                    className="border rounded-lg px-3 py-2 bg-white text-gray-500">
                                <option value="">Pilih Lembaga</option>
                                <option value="MI">MI</option>
                                <option value="TK">TK</option>
                                <option value="KB">KB</option>
                                <option value="TPA">TPA</option>
                            </select>
                        </div>
                        <div className="flex flex-col w-full md:w-1/2">
                            <label className="mb-1 font-medium text-gray-700">Tingkatan</label>
                            <select
                                disabled={selectedA !== "MI"} // hanya aktif jika MI
                                className={`border rounded-lg px-3 py-2 bg-white text-gray-500 ${
                                selectedA !== "MI" ? "bg-gray-100 cursor-not-allowed" : ""}`}>
                                {selectedA === "MI" ? (
                                <>
                                    <option value="">Pilih Tingkatan</option>
                                    <option value="1">Kelas 1</option>
                                    <option value="2">Kelas 2</option>
                                    <option value="3">Kelas 3</option>
                                    <option value="4">Kelas 4</option>
                                    <option value="5">Kelas 5</option>
                                    <option value="6">Kelas 6</option>
                                </>
                                ) : (
                                <option value="">Tidak perlu diisi</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col w-full md:w-3/4">
                            <label className="mb-1 font-medium text-gray-700">Nama Calon Siswa</label>
                            <input
                                type="text"
                                placeholder="Nama"
                                className="border rounded-lg px-3 py-2 text-gray-500"
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-1/4">
                            <label className="mb-1 font-medium text-gray-700">Jenis Kelamin</label>
                            <select 
                                    className="border rounded-lg px-3 py-2 bg-white text-gray-500">
                                <option value="">Pilih</option>
                                <option value="MI">Laki-laki</option>
                                <option value="TK">Perempuan</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col w-full md:w">
                            <label className="mb-1 font-medium text-gray-700">Email Aktif</label>
                            <input
                                type="email"
                                className="border rounded-lg px-3 py-2 text-gray-500"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col w-full md:w">
                            <label className="mb-1 font-medium text-gray-700">Nomor Telepon Aktif</label>
                            <input
                                type="tel"
                                className="border rounded-lg px-3 py-2 text-gray-500"
                                pattern="[0-9]{8,15}"
                            />
                            <label className="mb-1 font-medium text-yellow-600">*Nomor Telepon harus berupa angka antara 8 dan 15 digit.</label>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col w-full md:w">
                            <label className="mb-1 font-medium text-gray-700">Nomor Telepon Ibu</label>
                            <input
                                type="tel"
                                className="border rounded-lg px-3 py-2 text-gray-500"
                                pattern="[0-9]{8,15}"
                            />
                            <label className="mb-1 font-medium text-yellow-600">*Nomor Telepon harus berupa angka antara 8 dan 15 digit.</label>
                        </div>
                    </div> 
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col w-full md:w">
                            <label className="mb-1 font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 text-gray-500"
                            />
                            <label className="mb-1 font-medium text-yellow-600">*Mohon untuk dicatat dan disimpan username dan password akun pendaftaran masing-masing.</label>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col w-full md:w">
                            <label className="mb-1 font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                className="border rounded-lg px-3 py-2 text-gray-500"
                            />
                        </div>
                    </div> 
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                        Submit
                    </button> 
                </form>
            </div>
        </main>
    );
}
