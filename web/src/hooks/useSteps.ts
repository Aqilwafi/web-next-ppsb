// useSteps.ts
import RegistrasiStep from "@/components/steps/registrasiStep";
import PembayaranStep from "@/components/steps/pembayaranStep";
import BiodataStep from "@/components/steps/biodataStep";
import DokumenStep from "@/components/steps/dokumenStep";
import UjianStep from "@/components/steps/ujianStep";
import PersetujuanStep from "@/components/steps/persetujuanStep";
import LastStep from "@/components/steps/lastStep";

export function useSteps(stepNumber: number) {
  switch (stepNumber) {
    case 1:
      return RegistrasiStep;
    case 2:
      return PembayaranStep;
    case 4:
      return BiodataStep;
    case 3:
      return DokumenStep;
    case 5:
      return UjianStep;
    case 6:
      return PersetujuanStep;
    case 7:
      return LastStep;
    default:
      return null;
  }
}
