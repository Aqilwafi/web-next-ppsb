"use client";

import RegisterHeader  from "../../components/headers/registerHeader";
import RegisterForm from "../../components/forms/registerForm";

export default function RegisterPage() {

    return (
        <main className="flex flex-col items-center justify-start min-h-screen gap-8 bg-gray-50">
            <RegisterHeader />
            <div className="bg-white p-6 rounded-2xl shadow w-full max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                    Registrasi
                </h2>
                
                <RegisterForm />
                
            </div>
        </main>
    );
}
