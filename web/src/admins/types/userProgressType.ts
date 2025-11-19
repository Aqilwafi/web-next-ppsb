export type UserProgress = {
  id: string;
  nama_lengkap: string;
  lembaga: string;
  tingkatan: string;
  email: string;
  completedSteps: number;
  completedStepLabels: string; // 0-6
};