export const PREDICTION = {
  STAKE_MIN: 10,
  STAKE_MAX: 200,
  STAKE_STEP: 10,
} as const;

export type PredictionChoice = "VIRAL" | "NOT_VIRAL";
