import { Outcome } from "./outcome";
import { Visibility } from "./visibility";

export interface TestDescription {
  baseVisibility: Visibility;
  superVisibility: Visibility;
  outcome: Outcome;
}
