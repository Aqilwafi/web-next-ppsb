export type DashboardStepProps = {
  user: string;
  stepNumber: number;
  isComplete: boolean;
  onComplete: () => void;
  isLoading?: boolean; // 🔹 tambahkan
};

export type DashboardHeaderProps = {
  name: string;
  handleLogout: () => void;
  loadingLogout: boolean;
};