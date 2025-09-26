"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabaseClient";
import { StepContents } from "./components/componen";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type StepFromDB = {
  id: number;
  step_number: number;
  label: string;
  content: string | null;
  status_step?: string | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const supabase = supabaseClient;

  const [user, setUser] = useState<any>(null);
  const [steps, setSteps] = useState<StepFromDB[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(2);
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

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router, supabase]);

  // Ambil steps progres user
  useEffect(() => {
    if (!user?.id) return;

    const fetchSteps = async () => {
      try {
        setLoadingSteps(true);

        const { data, error } = await supabase
          .from("user_step_status")
          .select(`
            step_id,
            status_step,
            updated_at,
            registration_step (
              step_number,
              label,
              content
            )
          `)
          .eq("user_id", user.id)
          .order("registration_step.step_number");

        if (error) throw error;

        const sorted = (data || []).map((d: any) => ({
          step_id: d.step_id,
          step_number: d.registration_step.step_number,
          step_label: d.registration_step.label,
          status_step: d.status_step,
          updated_at: d.updated_at,
        })).sort((a, b) => a.step_number - b.step_number);

        setSteps(sorted);

        const firstIncomplete =
          sorted.find((s) => s.status_step !== "completed")?.step_number ?? sorted.length + 1;

        setCurrentStep(firstIncomplete);
        setOpenStep(firstIncomplete <= sorted.length ? firstIncomplete : null);
      } catch (err) {
        console.error("Fetch steps/progress error:", err);
        setCurrentStep(2);
      } finally {
        setLoadingSteps(false);
      }
    };

    fetchSteps();
  }, [user?.id]);

  const markCurrentStepCompleted = async (stepNumber: number) => {
    if (!user?.id) return;

    const stepObj = steps.find((s) => s.step_number === stepNumber);
    if (!stepObj) return;

    setMarking(true);
    try {
      const { data, error } = await supabase
        .from("user_step_status")
        .upsert({
          user_id: user.id,
          step_id: stepObj.id,
          status_step: "completed",
          updated_at: new Date().toISOString(),
        })
        .select(`
          step_id,
          status_step,
          updated_at,
          registration_step (
            step_number,
            label,
            content
          )
        `);

      if (error) throw error;

      const updatedSteps = (data || []).map((d: any) => ({
        step_id: d.step_id,
        step_number: d.registration_step.step_number,
        step_label: d.registration_step.label,
        status_step: d.status_step,
        updated_at: d.updated_at,
      })).sort((a, b) => a.step_number - b.step_number);

      setSteps(updatedSteps);

      const nextIndex = updatedSteps.findIndex((s) => s.step_number === stepNumber) + 1;
      const nextStepNumber =
        nextIndex < updatedSteps.length ? updatedSteps[nextIndex].step_number : stepNumber + 1;

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
        {steps.map((step) => {
          const isLocked = step.step_number > currentStep;
          return (
            <div
              key={step.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden ${
                isLocked ? "opacity-60" : ""
              }`}
            >
              <button
                onClick={() => toggleStep(step.step_number)}
                disabled={isLocked}
                className={`w-full flex justify-between items-center p-4 font-medium ${getStepColor(
                  step.step_number
                )} ${isLocked ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <span>
                  {step.step_number}. {step.step_label}
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
                    <div>
                      {completedSteps.includes(step.step_number)
                        ? stepsContent[step.step_number].complete
                        : stepsContent[step.step_number].ongoing}
                    </div>

                    {currentStep > steps.length && (
                      <p className="mt-3 text-green-600">
                        Semua langkah telah diselesaikan 🎉
                      </p>
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
