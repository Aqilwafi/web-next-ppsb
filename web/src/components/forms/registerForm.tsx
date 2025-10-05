"use client";
import React from "react";
import { useState, FormEvent } from "react";
import { useRegister } from "@/hooks/useRegister";
import { UserRegister } from "@/types/userType";

export default function RegisterForm() {
    const { loading, error, handleRegister } = useRegister();
    const [selectedA, setSelectedA] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formDataA, setFormDataA] = useState<UserRegister>({
        lembaga: "",
        tingkatan: "",
        nama_lengkap: "",
        jenis_kelamin: "",
        email : "",
        username: "",
        password: "",
    });
    const confirmSubmit = async () => {
        setShowConfirm(false);
        await handleRegister(formDataA);
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setShowConfirm(true);
    };

    return (
        <>
        <section className="p-6 max-w-3xl mx-auto">
             <div className={loading ? "pointer-events-none opacity-50" : ""}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Lembaga dan Tingkatan */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full md:w-1/2">
                    <label className="mb-1 font-medium text-gray-700">Lembaga</label>
                    <select 
                        value={formDataA.lembaga}
                        required
                        onChange={(e) => {
                            setSelectedA(e.target.value);
                            setFormDataA({ ...formDataA, lembaga: e.target.value });
                        }} 
                        className="border rounded-lg px-3 py-2 bg-white text-gray-500 cursor-pointer"
                    >
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
                        value={formDataA.tingkatan}
                        disabled={selectedA !== "MI"}
                        onChange={(e) => setFormDataA({ ...formDataA, tingkatan: e.target.value })}
                        className={`border rounded-lg px-3 py-2 bg-white text-gray-500 cursor-pointer ${
                        selectedA !== "MI" ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}>
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

            {/* Nama Calon Siswa dan Jenis Kelamin */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full md:w-3/4">
                    <label className="mb-1 font-medium text-gray-700">Nama Calon Siswa</label>
                    <input
                        type="text"
                        value={formDataA.nama_lengkap}
                        required
                        onChange={(e) => setFormDataA({ ...formDataA, nama_lengkap: e.target.value })}
                        placeholder="Nama"
                        className="border rounded-lg px-3 py-2 text-gray-500"
                    />
                </div>
                <div className="flex flex-col w-full md:w-1/4">
                    <label className="mb-1 font-medium text-gray-700">Jenis Kelamin</label>
                    <select
                        value={formDataA.jenis_kelamin}
                        required
                        onChange={(e) => setFormDataA({ ...formDataA, jenis_kelamin: e.target.value })}
                        className="border rounded-lg px-3 py-2 bg-white text-gray-500 cursor-pointer">
                        <option value="">Pilih</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                </div>
            </div>

            {/* Email */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full md:w">
                    <label className="mb-1 font-medium text-gray-700">Email Aktif</label>
                    <input
                        type="email"
                        required
                        value={formDataA.email}
                        onChange={(e) => setFormDataA({ ...formDataA, email: e.target.value })}
                        className="border rounded-lg px-3 py-2 text-gray-500"/>
                </div>
            </div>

            {/* Password */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full md:w-1/2">
                    <label className="mb-1 font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        required
                        value={formDataA.username}
                        onChange={(e) => setFormDataA({ ...formDataA, username: e.target.value })}
                        className="border rounded-lg px-3 py-2 text-gray-500"/>
                </div>
                <div className="flex flex-col w-full md:w-1/2 relative">  
                    <label className="mb-1 font-medium text-gray-700">Password</label> 
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={formDataA.password}
                            onChange={(e) =>
                                setFormDataA({ ...formDataA, password: e.target.value })
                            }
                            className="border rounded-lg px-3 py-2 pr-10 text-gray-500"
                            autoComplete="new-password"
                            required
                            />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-2 top-10 text-sm text-gray-300 cursor-pointer"
                            >
                        {showPassword ? "Hide" : "Show"}
                        </button>             
                </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
                {loading && (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                )}
                {loading ? "Mendaftarkan..." : "Daftar"}
            </button>
        </form>
        <div>
        {showConfirm && (
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white p-6 rounded-lg shadow-lg border pointer-events-auto">
                <h2 className="text-lg font-bold text-black">Konfirmasi</h2>
                <p className="mt-2 text-black">Apakah Anda yakin data sudah benar?</p>
                <div className="flex gap-4 mt-4">
                    <button
                    onClick={confirmSubmit}
                    className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
                    >
                    Ya, Submit
                    </button>
                    <button
                    onClick={() => setShowConfirm(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer"
                    >
                    Batal
                    </button>
                </div>
                </div>
            </div>
            )}
      </div>
      </div>
      </section>
      </>
    );
}