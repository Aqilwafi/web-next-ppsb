"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { useKonten } from "@/hooks/useKonten";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import DashboardHeader from "@/components/headers/dashboardHeader";
import DashboardStep from "@/components/dashboards/stepDashboard";
import { useState } from "react";

export default function DashboardPage() {
  const { user, loading, handleLogout } = useDashboard();
  const nama = user?.username || "User";

  const {
    stepList,
    userSteps,
    currentStep,
    openStep,
    getStepColor,
    toggleStep,
    handleMarkStep
  } = useKonten(user?.id);

  // Loading & error per step
  const [loadingStep, setLoadingStep] = useState<number | null>(null);
  const [errorStep, setErrorStep] = useState<string | null>(null);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  const handleComplete = async (stepId: number) => {
    setLoadingStep(stepId);
    setErrorStep(null);

    try {
      await handleMarkStep(stepId);
    } catch (err) {
      setErrorStep("Gagal menandai step");
    } finally {
      setLoadingStep(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <DashboardHeader
        name={nama}
        handleLogout={handleLogout}
        loadingLogout={false}
      />

      <div className="relative w-full h-64 md:h-40">
        <Image
          src="/dash.jpeg"
          alt="Dashboard Banner"
          fill
          className="object-cover"
        />
      </div>

      <section className="p-6 space-y-3 max-w-3xl mx-auto">
        {stepList.map((step) => {
          const isLocked = step.step_number_id > currentStep;
          const isComplete = userSteps.some(
            (s) => s.step_number_id === step.step_number_id
          );
          const isLoading = loadingStep === step.step_number_id;

          return (
            <div
              key={step.step_number_id}
              className={`bg-white rounded-lg shadow-md overflow-hidden ${
                isLocked ? "opacity-60" : ""
              }`}
            >
              <button
                onClick={() => toggleStep(step.step_number_id)}
                disabled={isLocked}
                className={`w-full flex justify-between items-center p-4 font-medium ${getStepColor(
                  step.step_number_id
                )} ${isLocked ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <span>
                  {step.step_number_id}. {step.label}
                </span>
                <span>{openStep === step.step_number_id ? "▲" : "▼"}</span>
              </button>

              <AnimatePresence>
                {openStep === step.step_number_id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-4 pb-4 text-gray-700"
                  >
                    {errorStep && (
                      <div className="text-red-600 mb-2">{errorStep}</div>
                    )}
                

                    <DashboardStep
                      stepNumber={step.step_number_id}
                      isComplete={isComplete}
                      user={user.id}
                      onComplete={() => handleComplete(step.step_number_id)}
                      isLoading={isLoading}
                    />
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
