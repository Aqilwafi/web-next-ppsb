"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabaseClient";
import { StepContents } from "./components/componen";
import { AnimatePresence, motion } from "framer-motion";
import { fetchSteps, StepFromDB, StepUser } from "../services/fetchSteps";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = supabaseClient;

  const [user, setUser] = useState<any>(null);
  const [steps, setSteps] = useState<StepFromDB[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState(true);
  const [marking, setMarking] = useState(false);

  // Ambil session awal + listen auth changes
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      } else {
        router.push("/login");
      }
    };
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
        router.push("/login");
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, [router, supabase]);

  // Ambil steps progres user
  useEffect(() => {
    if (!user?.id) return;

    const getSteps = async () => {
      setLoadingSteps(true);

      try {
        const { allSteps, userSteps } = await fetchSteps(user.id);

        // Merge userSteps ke allSteps untuk menambahkan status_step
        const stepsWithStatus: StepFromDB[] = allSteps.map(step => {
          const userStep: StepUser | undefined = userSteps.find(s => s.step_id === step.step_id);
          return {
            ...step,
            status_step: userStep?.status_step || "pending",
          };
        });

        setSteps(stepsWithStatus);

        const firstIncomplete = stepsWithStatus.find(s => s.status_step !== "completed")?.step_number ?? stepsWithStatus.length + 1;
        setCurrentStep(firstIncomplete);
        setOpenStep(firstIncomplete <= stepsWithStatus.length ? firstIncomplete : null);

      } catch (err) {
        console.error("Fetch steps error:", err);
      } finally {
        setLoadingSteps(false);
      }
    };

    getSteps();
  }, [user?.id]);

  const markCurrentStepCompleted = async (stepNumber: number) => {
    if (!user?.id) return;

    const stepObj = steps.find(s => s.step_number === stepNumber);
    if (!stepObj) return;

    setMarking(true);
    try {
      await supabase.from("user_step_status").upsert({
        user_id: user.id,
        step_id: stepObj.step_id,
        status_step: "completed",
        updated_at: new Date().toISOString(),
      });

      // Update state lokal
      const updatedSteps = steps.map(s => 
        s.step_number === stepNumber ? { ...s, status_step: "completed" } : s
      );
      setSteps(updatedSteps);

      const nextStepNumber = updatedSteps.find(s => s.status_step !== "completed")?.step_number ?? stepNumber + 1;
      setCurrentStep(nextStepNumber);
      setOpenStep(nextStepNumber <= updatedSteps.length ? nextStepNumber : null);

    } catch (err) {
      console.error("Mark complete error:", err);
    } finally {
      setMarking(false);
    }
  };

  const handleLogout = async () => {
    setLoadingLogout(true);
    await supabase.auth.signOut();
    setLoadingLogout(false);
  };

  const toggleStep = (stepNumber: number) => {
    if (stepNumber > currentStep) return;
    setOpenStep(openStep === stepNumber ? null : stepNumber);
  };

  const getStepColor = (stepNumber: number) => {
    if (stepNumber < currentStep) return "text-green-600";
    if (stepNumber === currentStep) return "text-blue-600";
    return "text-red-600";
  };

  const name = user?.nama_lengkap || user?.email || "User";
  const completedSteps = steps.filter(s => s.status_step === "completed").map(s => s.step_number);
  const stepsContent = StepContents(user?.id, markCurrentStepCompleted);

  if (!user) return <p>Loading...</p>;

  return (
    <main className="min-h-screen bg-gray-50">
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

      <div className="relative w-full h-64 md:h-40">
        <Image src="/dash.jpeg" alt="Dashboard Banner" fill className="object-cover" />
      </div>

      <section className="p-6 space-y-3 max-w-3xl mx-auto">
        {steps.map(step => {
          const isLocked = step.step_number > currentStep;
          const contentForStep = stepsContent[step.step_number] || { complete: null, ongoing: null };

          return (
            <div
              key={step.step_id}
              className={`bg-white rounded-lg shadow-md overflow-hidden ${isLocked ? "opacity-60" : ""}`}
            >
              <button
                onClick={() => toggleStep(step.step_number)}
                disabled={isLocked}
                className={`w-full flex justify-between items-center p-4 font-medium ${getStepColor(step.step_number)} ${isLocked ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <span>{step.step_number}. {step.label}</span>
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
                    <div>
                      {completedSteps.includes(step.step_number)
                        ? contentForStep.complete
                        : contentForStep.ongoing}
                    </div>

                    {currentStep === step.step_number && step.step_number !== 1 && (
                      <button
                        onClick={() => markCurrentStepCompleted(step.step_number)}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70"
                        disabled={marking}
                      >
                        {marking ? "Menyimpan..." : "Tandai Selesai"}
                      </button>
                    )}

                    {currentStep > steps.length && (
                      <p className="mt-3 text-green-600">Semua langkah telah diselesaikan 🎉</p>
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
