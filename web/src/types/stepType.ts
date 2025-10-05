export type RegistrationStep = {
  step_number_id: number;
  label: string;
};

export type UserStepStatus = {
  id: number;
  user_id: string; // UUID
  step_number_id: number;
  status_step: boolean;
  created_at?: string;
};