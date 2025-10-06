
"use client";

import RegistrasiStep from "@/components/steps/registrasiStep";
import PembayaranStep from "@/components/steps/pembayaranStep";
import BiodataStep from "@/components/steps/biodataStep";
import DokumenStep from "@/components/steps/dokumenStep";
import UjianStep from "@/components/steps/ujianStep";
import PersetujuanStep from "@/components/steps/persetujuanStep";
import LastStep from "@/components/steps/lastStep";
import  {DashboardStepProps}  from "@/types/propsType";

const stepComponents: Record<number, React.ComponentType<DashboardStepProps>> = {
  1: RegistrasiStep,
  2: PembayaranStep,
  3: BiodataStep,
  4: DokumenStep,
  5: UjianStep,
  6: PersetujuanStep,
  7: LastStep,
};


export default function DashboardStep({
  stepNumber,
  isComplete,
  user,
  onComplete,
  isLoading = false, // default false
}: DashboardStepProps) {
  const StepComponent = stepComponents[stepNumber];
  if (!StepComponent) return <p>Konten belum tersedia</p>;

  return (
    <div className="mt-6 mb-3">
    <StepComponent
      user={user}
      isComplete={isComplete}
      onComplete={onComplete}
      isLoading={isLoading} // teruskan ke komponen step
    />
    </div>
  );
}
