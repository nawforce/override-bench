import { Outcome } from "./outcome";
import { TestDescription } from "./testDescription";

export const virtualSeparateFileTests: TestDescription[] = [
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

export const virtualSeparateFileNoneOverrideTests: TestDescription[] = [
  // super = implicit private
  {
    baseVisibility: "",
    superVisibility: "",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "private",
    superVisibility: "",
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: "protected",
    superVisibility: "",
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: "public",
    superVisibility: "",
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: "global",
    superVisibility: "",
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
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
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: "protected",
    superVisibility: "private",
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: "public",
    superVisibility: "private",
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: "global",
    superVisibility: "private",
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
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
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: "protected",
    superVisibility: "protected",
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: "public",
    superVisibility: "protected",
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: "global",
    superVisibility: "protected",
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
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
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: "protected",
    superVisibility: "public",
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: "public",
    superVisibility: "public",
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: "global",
    superVisibility: "public",
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
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
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: "protected",
    superVisibility: "global",
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: "public",
    superVisibility: "global",
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: "global",
    superVisibility: "global",
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
];

export const virtualSameFileTests: TestDescription[] = [
  // super = implicit private
  {
    baseVisibility: "",
    superVisibility: "",
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: "private",
    superVisibility: "",
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
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
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
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
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
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
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
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
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
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
