"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

type StepFromDB = {
  id: number; // db id
  step_number: number;
  label: string;
  content: string | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const [steps, setSteps] = useState<StepFromDB[]>([]);
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(2); // default ke 2 (registrasi sudah selesai)
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState(true);
  const [marking, setMarking] = useState(false);

  // helper ambil userId dari session (sesuaikan jika session tidak menyertakan id)
  const userId = (session as unknown)?.user?.id ?? (session as unknown)?.user?.userId ?? null;

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchData = async () => {
      try {
        setLoadingSteps(true);
    
        const res = await fetch(`/api/progres?userId=${userId}`);
        if (!res.ok) throw new Error("Gagal ambil steps");
    
        const data = await res.json();
        const stepsFromApi: StepFromDB[] = data.steps; // ✅ ambil arraynya
    
        // sort steps by step_number just in case
        const sorted = stepsFromApi.slice().sort((a, b) => a.step_number - b.step_number);
        setSteps(sorted);
    
        // cari step pertama yang belum 'completed'
        let found: number | null = null;
        for (const s of sorted) {
          if (!s.status_step || s.status_step !== "completed") {
            found = s.step_number;
            break;
          }
        }
    
        if (found === null) {
          // semua step sudah completed
          setCurrentStep(sorted.length + 1);
        } else {
          setCurrentStep(found);
        }
      } catch (err) {
        console.error("Fetch steps/progress error:", err);
        setCurrentStep(2); // fallback
      } finally {
        setLoadingSteps(false);
      }
    };
    

    fetchData();
  }, [status, userId]);

  if (status === "loading" || loadingSteps) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-700 text-lg">Memuat dashboard...</p>
      </main>
    );
  }

  if (!session) {
    return null; // useSession sudah handle redirect
  }

  const name = (session as any)?.user?.name ?? "User";

  const toggleStep = (stepNumber: number) => {
    if (stepNumber > currentStep) return;
    setOpenStep(openStep === stepNumber ? null : stepNumber);
  };

  const getStepColor = (stepNumber: number) => {
    if (stepNumber < currentStep) return "text-green-600";
    if (stepNumber === currentStep) return "text-blue-600";
    return "text-red-600";
  };

  const handleLogout = async () => {
    setLoadingLogout(true);
    await signOut({ callbackUrl: "/login" });
  };

  // tandai step aktif selesai -> panggil API /api/progress POST
  const markCurrentStepCompleted = async () => {
    if (!userId) {
      alert("User ID tidak ditemukan di session.");
      return;
    }
    // cari step DB id untuk currentStep
    const stepObj = steps.find((s) => s.step_number === currentStep);
    if (!stepObj) return;

    setMarking(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          stepId: stepObj.id,
          status: "completed",
        }),
      });
      if (!res.ok) throw new Error("Gagal update progress");
      // setelah sukses, lanjut ke next step (jika ada)
      const nextIndex = steps.findIndex((s) => s.step_number === currentStep) + 1;
      const nextStepNumber = nextIndex < steps.length ? steps[nextIndex].step_number : currentStep + 1;
      setCurrentStep(nextStepNumber);
      // otomatis buka next step
      setOpenStep(nextStepNumber <= steps.length ? nextStepNumber : null);
    } catch (err) {
      console.error("Mark complete error:", err);
      alert("Gagal menandai selesai. Coba lagi.");
    } finally {
      setMarking(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full bg-blue-600 text-white px-6 py-4 shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">{`Welcome ${name}`}</h1>

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
        <Image src="/dash.jpeg" alt="Dashboard Banner" fill className="object-cover" />
      </div>

      {/* Steps */}
      <section className="p-6 space-y-3 max-w-3xl mx-auto">
        {steps.map((step) => {
          const isLocked = step.step_number > currentStep;
          return (
            <div key={step.id} className={`bg-white rounded-lg shadow-md overflow-hidden ${isLocked ? "opacity-60" : ""}`}>
              <button
                onClick={() => toggleStep(step.step_number)}
                disabled={isLocked}
                className={`w-full flex justify-between items-center p-4 font-medium ${getStepColor(step.step_number)} ${isLocked ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <span>
                  {step.step_number}. {step.label}
                </span>
                <span>{openStep === step.step_number ? "▲" : "▼"}</span>
              </button>

              <AnimatePresence>
                {openStep === step.step_number && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-4 pb-4 text-gray-700"
                  >
                    <div>{step.content}</div>

                    {step.step_number === currentStep && step.step_number !== 1 && (
                      <button
                        onClick={markCurrentStepCompleted}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70"
                        disabled={marking}
                      >
                        {marking ? "Menyimpan..." : "Tandai Selesai"}
                      </button>
                    )}
                    {/* jika user sudah melewati semua step */}
                    {currentStep > steps.length && <p className="mt-3 text-green-600">Semua langkah telah diselesaikan 🎉</p>}
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
