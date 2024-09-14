import { Outcome } from "./outcome";

export interface TestDescription {
  baseVisibility: string;
  superVisibility: string;
  outcome: Outcome;
}

export function displayVisibility(value: string): string {
  if (value == "") return "<implicit-private>";
  else return value;
}
