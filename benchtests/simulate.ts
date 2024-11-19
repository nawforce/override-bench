import { expect } from "chai";
import { Outcome } from "./outcome";
import { virtualSeparateFileTests } from "./virtualResults";
import { displayVisibility, Visibility } from "./visibility";

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
  return Outcome.CANNOT_BE_OVERRIDDEN;
}

describe("Simulate Tests", async () => {
  virtualSeparateFileTests.forEach((testDetails) => {
    const baseVisibilityDisplay = displayVisibility(testDetails.baseVisibility);
    const superVisibilityDisplay = displayVisibility(
      testDetails.superVisibility
    );

    it(`Separate files - Override ${baseVisibilityDisplay} virtual with ${superVisibilityDisplay} override is ${
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
});
