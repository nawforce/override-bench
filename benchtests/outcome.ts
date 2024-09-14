export enum Outcome {
  SUPER_OVERRIDES, // Deploys and call super method
  SUPER_OVERRIDE_IGNORED, // Deploys and calls base method
  OMGACK, // Apex GACK
  OVERRIDE_ON_NON_OVERRIDING, // @Override specified for non-overriding method
  CANNOT_REDUCE_VISIBILITY, // Cannot reduce the visibility of method
  CANNOT_BE_OVERRIDDEN, // Non-virtual, non-abstract methods cannot be overridden
  OVERRIDE_REQUIRED, // Method must use the override keyword
}
