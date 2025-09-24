"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

type Step = {
  id: number;
  label: string;
  content: string;
};

const steps: Step[] = [
  { id: 1, label: "Registrasi User", content: "Form registrasi user di sini." },
  { id: 2, label: "Bayar Formulir", content: "Informasi pembayaran formulir." },
  { id: 3, label: "Isi Biodata", content: "Form biodata lengkap siswa." },
  { id: 4, label: "Ujian Masuk", content: "Tes a, b, c, d." },
  { id: 5, label: "Surat Persetujuan", content: "Silahkan setuju" },
  { id: 6, label: "Validasi", content: "Apakah valid" },
  { id: 7, label: "Info Pengumuman", content: "Pengumuman penerimaan periode." },
];

export default function DashboardPage() {
  const router = useRouter();
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(2); // step yang sedang aktif
  const [loadingLogout, setLoadingLogout] = useState(false);

  const toggleStep = (id: number) => {
    if (id > currentStep) return; // jangan buka kalau step masih locked
    setOpenStep(openStep === id ? null : id);
  };

  const getStepColor = (id: number) => {
    if (id < currentStep) return "text-green-600"; // sudah selesai
    if (id === currentStep) return "text-blue-600"; // step aktif
    return "text-red-600"; // belum bisa
  };

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  if (status === "loading") {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-700 text-lg">Memeriksa session...</p>
      </main>
    );
  }

  const name = session?.user?.name;

  const handleLogout = async () => {
    setLoadingLogout(true);
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full bg-blue-600 text-white px-6 py-4 shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">{name ? `Welcome ${name}...` : "Dashboard"}</h1>

        <button
          className="cursor-pointer bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 flex items-center justify-center"
          onClick={handleLogout}
          disabled={loadingLogout}
        >
          {loadingLogout ? "Logging out..." : "Logout"}
        </button>
      </header>

      {/* Banner */}
      <div className="relative w-full h-64 md:h-40">
        <Image
          src="/dash.jpeg"
          alt="Dashboard Banner"
          fill
          className="object-cover"
        />
      </div>

      {/* Accordion Steps */}
      <section className="p-6 space-y-3">
        {steps.map((step) => {
          const isLocked = step.id > currentStep;

          return (
            <div
              key={step.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden ${
                isLocked ? "opacity-60" : ""
              }`}
            >
              {/* Step Header */}
              <button
                onClick={() => toggleStep(step.id)}
                disabled={isLocked}
                className={`w-full flex justify-between items-center p-4 font-medium ${getStepColor(
                  step.id
                )} ${isLocked ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <span>
                  {step.id}. {step.label}
                </span>
                <span>{openStep === step.id ? "▲" : "▼"}</span>
              </button>

              {/* Step Content */}
              <AnimatePresence>
                {openStep === step.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4 text-gray-700"
                  >
                    {step.content}

                    {step.id === currentStep && (
                      <button
                        onClick={() => setCurrentStep(currentStep + 1)}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Tandai Selesai
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </section>
    </main>
  );
}
