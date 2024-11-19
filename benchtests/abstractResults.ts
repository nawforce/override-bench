import { Outcome } from "./outcome";
import { TestDescription } from "./testDescription";

export const abstractSeparateFileTests: TestDescription[] = [
  // super = implicit private
  {
    baseVisibility: "",
    superVisibility: "",
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: "private",
    superVisibility: "",
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: "protected",
    superVisibility: "",
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: "public",
    superVisibility: "",
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: "global",
    superVisibility: "",
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  // super = private
  {
    baseVisibility: "",
    superVisibility: "private",
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: "private",
    superVisibility: "private",
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: "protected",
    superVisibility: "private",
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: "public",
    superVisibility: "private",
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: "global",
    superVisibility: "private",
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  // super = protected
  {
    baseVisibility: "",
    superVisibility: "protected",
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: "private",
    superVisibility: "protected",
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: "protected",
    superVisibility: "protected",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "public",
    superVisibility: "protected",
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: "global",
    superVisibility: "protected",
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  // super = public
  {
    baseVisibility: "",
    superVisibility: "public",
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: "private",
    superVisibility: "public",
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: "protected",
    superVisibility: "public",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "public",
    superVisibility: "public",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "global",
    superVisibility: "public",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  // super = global
  {
    baseVisibility: "",
    superVisibility: "global",
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: "private",
    superVisibility: "global",
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: "protected",
    superVisibility: "global",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "public",
    superVisibility: "global",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "global",
    superVisibility: "global",
    outcome: Outcome.SUPER_OVERRIDES,
  },
];

export const abstractSeparateFileNoneOverrideTests: TestDescription[] = [
  // super = implicit private
  {
    baseVisibility: "",
    superVisibility: "",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "private",
    superVisibility: "",
    outcome: Outcome.OMGACK,
  },
  {
    baseVisibility: "protected",
    superVisibility: "",
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: "public",
    superVisibility: "",
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: "global",
    superVisibility: "",
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  // super = private
  {
    baseVisibility: "",
    superVisibility: "private",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "private",
    superVisibility: "private",
    outcome: Outcome.OMGACK,
  },
  {
    baseVisibility: "protected",
    superVisibility: "private",
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: "public",
    superVisibility: "private",
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: "global",
    superVisibility: "private",
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  // super = protected
  {
    baseVisibility: "",
    superVisibility: "protected",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "private",
    superVisibility: "protected",
    outcome: Outcome.OMGACK,
  },
  {
    baseVisibility: "protected",
    superVisibility: "protected",
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: "public",
    superVisibility: "protected",
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: "global",
    superVisibility: "protected",
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  // super = public
  {
    baseVisibility: "",
    superVisibility: "public",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "private",
    superVisibility: "public",
    outcome: Outcome.OMGACK,
  },
  {
    baseVisibility: "protected",
    superVisibility: "public",
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: "public",
    superVisibility: "public",
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: "global",
    superVisibility: "public",
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  // super = global
  {
    baseVisibility: "",
    superVisibility: "global",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "private",
    superVisibility: "global",
    outcome: Outcome.OMGACK,
  },
  {
    baseVisibility: "protected",
    superVisibility: "global",
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: "public",
    superVisibility: "global",
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: "global",
    superVisibility: "global",
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
];

export const abstractSameFileTests: TestDescription[] = [
  // super = implicit private
  {
    baseVisibility: "",
    superVisibility: "",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "private",
    superVisibility: "",
    outcome: Outcome.OMGACK,
  },
  {
    baseVisibility: "protected",
    superVisibility: "",
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: "public",
    superVisibility: "",
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: "global",
    superVisibility: "",
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  // super = private
  {
    baseVisibility: "",
    superVisibility: "private",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "private",
    superVisibility: "private",
    outcome: Outcome.OMGACK,
  },
  {
    baseVisibility: "protected",
    superVisibility: "private",
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: "public",
    superVisibility: "private",
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: "global",
    superVisibility: "private",
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  // super = protected
  {
    baseVisibility: "",
    superVisibility: "protected",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "private",
    superVisibility: "protected",
    outcome: Outcome.OMGACK,
  },
  {
    baseVisibility: "protected",
    superVisibility: "protected",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "public",
    superVisibility: "protected",
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: "global",
    superVisibility: "protected",
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  // super = public
  {
    baseVisibility: "",
    superVisibility: "public",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "private",
    superVisibility: "public",
    outcome: Outcome.OMGACK,
  },
  {
    baseVisibility: "protected",
    superVisibility: "public",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "public",
    superVisibility: "public",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "global",
    superVisibility: "public",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  // super = global
  {
    baseVisibility: "",
    superVisibility: "global",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "private",
    superVisibility: "global",
    outcome: Outcome.OMGACK,
  },
  {
    baseVisibility: "protected",
    superVisibility: "global",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "public",
    superVisibility: "global",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "global",
    superVisibility: "global",
    outcome: Outcome.SUPER_OVERRIDES,
  },
];
