import { expect } from "chai";
import { Outcome } from "./outcome";
import {
  virtualSameFileTests,
  virtualSeparateFileNoneOverrideTests,
  virtualSeparateFileTests,
} from "./virtualResults";
import { displayVisibility, Visibility } from "./visibility";
import {
  abstractSameFileTests,
  abstractSeparateFileNoneOverrideTests,
  abstractSeparateFileTests,
} from "./abstractResults";

enum BaseModifier {
  NONE,
  VIRTUAL,
  ABSTRACT,
}

enum SuperModifier {
  NONE,
  OVERRIDE,
}

function simulate(
  sameFile: boolean,
  baseVisibility: Visibility,
  baseModifier: BaseModifier,
  superVisibility: Visibility,
  superModifier: SuperModifier
): Outcome {
  const isPrivate =
    baseVisibility == Visibility.IMPLICIT_PRIVATE ||
    baseVisibility == Visibility.EXPLICIT_PRIVATE;

  if (!isPrivate) {
    if (baseModifier == BaseModifier.NONE) return Outcome.CANNOT_BE_OVERRIDDEN;

    if (
      baseModifier == BaseModifier.ABSTRACT &&
      superModifier == SuperModifier.NONE
    )
      return Outcome.OVERRIDE_REQUIRED;
  }

  if (isVisibilityReduced(baseVisibility, superVisibility))
    return Outcome.CANNOT_REDUCE_VISIBILITY;

  if (
    isPrivate &&
    baseModifier != BaseModifier.NONE &&
    superModifier == SuperModifier.OVERRIDE &&
    !sameFile
  )
    return Outcome.OVERRIDE_ON_NON_OVERRIDING;

  if (baseVisibility == Visibility.EXPLICIT_PRIVATE) {
    if (baseModifier == BaseModifier.ABSTRACT) return Outcome.OMGACK;
    else return Outcome.SUPER_OVERRIDE_IGNORED;
  } else {
    return Outcome.SUPER_OVERRIDES;
  }
}

function isVisibilityReduced(
  baseVisibility: Visibility,
  superVisibility: Visibility
): boolean {
  switch (baseVisibility) {
    case Visibility.IMPLICIT_PRIVATE:
    case Visibility.EXPLICIT_PRIVATE:
      return false;
    case Visibility.PROTECTED:
      return (
        superVisibility == Visibility.IMPLICIT_PRIVATE ||
        superVisibility == Visibility.EXPLICIT_PRIVATE
      );
    case Visibility.PUBLIC:
    case Visibility.GLOBAL:
      return (
        superVisibility != Visibility.PUBLIC &&
        superVisibility != Visibility.GLOBAL
      );
  }
  return false;
}

describe("Simulate Tests", async () => {
  virtualSeparateFileTests.forEach((testDetails) => {
    const baseVisibilityDisplay = displayVisibility(testDetails.baseVisibility);
    const superVisibilityDisplay = displayVisibility(
      testDetails.superVisibility
    );

    it(`Virtual Separate files - Override ${baseVisibilityDisplay} virtual with ${superVisibilityDisplay} override is ${
      Outcome[testDetails.outcome]
    }`, async () => {
      expect(
        simulate(
          false,
          testDetails.baseVisibility,
          BaseModifier.VIRTUAL,
          testDetails.superVisibility,
          SuperModifier.OVERRIDE
        )
      ).to.be.equal(testDetails.outcome);
    });
  });

  virtualSeparateFileNoneOverrideTests.forEach((testDetails) => {
    const baseVisibilityDisplay = displayVisibility(testDetails.baseVisibility);
    const superVisibilityDisplay = displayVisibility(
      testDetails.superVisibility
    );

    it(`Virtual Separate files without override/virtual - Override ${baseVisibilityDisplay} virtual with ${superVisibilityDisplay} override is ${
      Outcome[testDetails.outcome]
    }`, async () => {
      expect(
        simulate(
          false,
          testDetails.baseVisibility,
          BaseModifier.NONE,
          testDetails.superVisibility,
          SuperModifier.NONE
        )
      ).to.be.equal(testDetails.outcome);
    });
  });

  virtualSameFileTests.forEach((testDetails) => {
    const baseVisibilityDisplay = displayVisibility(testDetails.baseVisibility);
    const superVisibilityDisplay = displayVisibility(
      testDetails.superVisibility
    );

    it(`Virtual Same files - Override ${baseVisibilityDisplay} virtual with ${superVisibilityDisplay} override is ${
      Outcome[testDetails.outcome]
    }`, async () => {
      expect(
        simulate(
          true,
          testDetails.baseVisibility,
          BaseModifier.VIRTUAL,
          testDetails.superVisibility,
          SuperModifier.OVERRIDE
        )
      ).to.be.equal(testDetails.outcome);
    });
  });

  abstractSeparateFileTests.forEach((testDetails) => {
    const baseVisibilityDisplay = displayVisibility(testDetails.baseVisibility);
    const superVisibilityDisplay = displayVisibility(
      testDetails.superVisibility
    );

    it(`Abstract Separate files - Override ${baseVisibilityDisplay} abstract with ${superVisibilityDisplay} override is ${
      Outcome[testDetails.outcome]
    }`, async () => {
      expect(
        simulate(
          false,
          testDetails.baseVisibility,
          BaseModifier.ABSTRACT,
          testDetails.superVisibility,
          SuperModifier.OVERRIDE
        )
      ).to.be.equal(testDetails.outcome);
    });
  });

  abstractSeparateFileNoneOverrideTests.forEach((testDetails) => {
    const baseVisibilityDisplay = displayVisibility(testDetails.baseVisibility);
    const superVisibilityDisplay = displayVisibility(
      testDetails.superVisibility
    );

    it(`Abstract Separate files without override - Override ${baseVisibilityDisplay} abstract with ${superVisibilityDisplay} is ${
      Outcome[testDetails.outcome]
    }`, async () => {
      expect(
        simulate(
          false,
          testDetails.baseVisibility,
          BaseModifier.ABSTRACT,
          testDetails.superVisibility,
          SuperModifier.NONE
        )
      ).to.be.equal(testDetails.outcome);
    });
  });

  abstractSameFileTests.forEach((testDetails) => {
    const baseVisibilityDisplay = displayVisibility(testDetails.baseVisibility);
    const superVisibilityDisplay = displayVisibility(
      testDetails.superVisibility
    );

    it(`Same files - Override ${baseVisibilityDisplay} abstract with ${superVisibilityDisplay} override is ${
      Outcome[testDetails.outcome]
    }`, async () => {
      expect(
        simulate(
          true,
          testDetails.baseVisibility,
          BaseModifier.ABSTRACT,
          testDetails.superVisibility,
          SuperModifier.OVERRIDE
        )
      ).to.be.equal(testDetails.outcome);
    });
  });
});
