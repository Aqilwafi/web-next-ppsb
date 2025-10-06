import { useEffect, useState } from "react";
import { fetchAllSteps, fetchUserSteps, insertUserStepStatus } from "@/services/serviceStep";
import { inputBiodata } from "@/services/serviceBiodata";
import { RegistrationStep, UserStepStatus } from "@/types/stepType";

export function useKonten(userId: string) {
  const [stepList, setStepList] = useState<RegistrationStep[]>([]);
  const [userSteps, setUserSteps] = useState<UserStepStatus[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Ambil semua step (public / read-only)
      const steps = await fetchAllSteps();
      setStepList(steps.sort((a, b) => a.step_number_id - b.step_number_id));

      // Ambil step user
      const uSteps = await fetchUserSteps(userId);
      setUserSteps(uSteps);

      // Tentukan step selanjutnya
      const lastCompletedStep = uSteps.length > 0
        ? Math.max(...uSteps.map(s => s.step_number_id))
        : 0;
      setCurrentStep(lastCompletedStep + 1);

    } catch (err : unknown) {
      if (err instanceof Error) {
      console.error(err.message); // Error object
    } else if (typeof err === "string") {
      console.error(err); // Kalau API throw string
    } else {
      console.error("Gagal mengambil biodata."); // fallback
    }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchData();
  }, [userId]);

  useEffect(() => {
    getStepColor(currentStep);
  }, [currentStep]);

  const handleMarkStep = async (stepId: number) => {
    if (stepId === 3) {
      try {
        // Biarkan user menandai ulang step yang sudah dilewati
        await insertUserStepStatus(userId, stepId);
      } catch (err : unknown) {
        if (err instanceof Error) {
      console.error(err.message); // Error object
    } else if (typeof err === "string") {
      console.error(err); // Kalau API throw string
    } else {
      console.error("Gagal mengambil biodata."); // fallback
    }
      } 
    }

    if (stepId !== currentStep) return; 

    try {
      await insertUserStepStatus(userId, stepId);

      // ✅ Update lokal langsung biar warna berubah instan
      // if (stepId < currentStep) return; // kita gunakan ini?
      setUserSteps((prev) => [...prev, { step_number_id: stepId } as UserStepStatus]);
      setCurrentStep(stepId + 1);
      getStepColor(stepId);
      getStepColor(currentStep);

      // (opsional) sync ulang dari server biar lebih valid
      // await fetchData();
    } catch (err : unknown) {
      if (err instanceof Error) {
      console.error(err.message); // Error object
    } else if (typeof err === "string") {
      console.error(err); // Kalau API throw string
    } else {
      console.error("Gagal mengambil biodata."); // fallback
    }
    }
  };

  const toggleStep = (stepId: number) => {
    setOpenStep(openStep === stepId ? null : stepId);
  };

  const getStepColor = (stepId: number) => {
    if (userSteps.some(s => s.step_number_id === stepId)) return "bg-green-100 text-green-700";
    if (stepId === currentStep) return "bg-blue-100 text-blue-700";
    return "bg-red-100 text-red-700";
  };

  return {
    stepList,
    userSteps,
    currentStep,
    openStep,
    loading,
    error,
    toggleStep,
    getStepColor,
    handleMarkStep,
  };
}
