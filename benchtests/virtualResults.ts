import { Outcome } from "./outcome";
import { TestDescription } from "./testDescription";
import { Visibility } from "./visibility";

export const virtualSeparateFileTests: TestDescription[] = [
  // super = implicit private
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  // super = private
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  // super = protected
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  // super = public
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  // super = global
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.OVERRIDE_ON_NON_OVERRIDING,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.SUPER_OVERRIDES,
  },
];

export const virtualSeparateFileNoModifiersTests: TestDescription[] = [
  // super = implicit private
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  // super = private
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  // super = protected
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  // super = public
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  // super = global
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.CANNOT_BE_OVERRIDDEN,
  },
];

export const virtualSeparateFileVirtualOnlyModifiersTests: TestDescription[] = [
  // super = implicit private
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  // super = private
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  // super = protected
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  // super = public
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  // super = global
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.OVERRIDE_REQUIRED,
  },
];

export const virtualSameFileTests: TestDescription[] = [
  // super = implicit private
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.IMPLICIT_PRIVATE,
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  // super = private
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.EXPLICIT_PRIVATE,
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  // super = protected
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.PROTECTED,
    outcome: Outcome.CANNOT_REDUCE_VISIBILITY,
  },
  // super = public
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.PUBLIC,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  // super = global
  {
    baseVisibility: Visibility.IMPLICIT_PRIVATE,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.EXPLICIT_PRIVATE,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.SUPER_OVERRIDE_IGNORED,
  },
  {
    baseVisibility: Visibility.PROTECTED,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.PUBLIC,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.SUPER_OVERRIDES,
  },
  {
    baseVisibility: Visibility.GLOBAL,
    superVisibility: Visibility.GLOBAL,
    outcome: Outcome.SUPER_OVERRIDES,
  },
];
