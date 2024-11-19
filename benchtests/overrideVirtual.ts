import {
  TransactionTestTemplate,
  TransactionProcess,
} from "@apexdevtools/benchmarker";
import { deploy } from "./deploy";
import { Outcome } from "./outcome";
import { displayVisibility } from "./testDescription";
import { runApex } from "./runApex";
import {
  virtualSameFileTests,
  virtualSeparateFileNoneOverrideTests,
  virtualSeparateFileTests,
} from "./virtualResults";

describe("Override Tests", async () => {
  let test: TransactionTestTemplate;

  before(async function () {
    test = await TransactionProcess.build("Something");
  });

  virtualSeparateFileTests.forEach((testDetails) => {
    const baseVisibilityDisplay = displayVisibility(testDetails.baseVisibility);
    const superVisibilityDisplay = displayVisibility(
      testDetails.superVisibility
    );

    it(`Separate files - Override ${baseVisibilityDisplay} virtual with ${superVisibilityDisplay} override is ${
      Outcome[testDetails.outcome]
    }`, async () => {
      try {
        await deploy(
          test.connection,
          new Map([
            [
              "OverrideBase",
              `global virtual class OverrideBase {public void entry() {myMethod();} ${testDetails.baseVisibility} virtual void myMethod() {throw new TypeException();}}`,
            ],
            [
              "OverrideSuper",
              `global class OverrideSuper extends OverrideBase {${testDetails.superVisibility} override void myMethod() { }}`,
            ],
          ])
        );
      } catch (ex) {
        if (ex instanceof Error) {
          if (
            testDetails.outcome == Outcome.OVERRIDE_ON_NON_OVERRIDING &&
            ex.message.includes("@Override specified for non-overriding method")
          ) {
            return;
          } else if (
            testDetails.outcome == Outcome.CANNOT_REDUCE_VISIBILITY &&
            ex.message.includes("Cannot reduce the visibility of method")
          ) {
            return;
          } else {
            throw ex;
          }
        }
      }

      runApex(test, testDetails, "/apex-scripts/separateFile.apex");
    });
  });

  virtualSeparateFileNoneOverrideTests.forEach((testDetails) => {
    const baseVisibilityDisplay = displayVisibility(testDetails.baseVisibility);
    const superVisibilityDisplay = displayVisibility(
      testDetails.superVisibility
    );

    it(`Separate files without override/virtual - Override ${baseVisibilityDisplay} virtual with ${superVisibilityDisplay} override is ${
      Outcome[testDetails.outcome]
    }`, async () => {
      const throwBase =
        testDetails.outcome == Outcome.SUPER_OVERRIDES
          ? "throw new TypeException();"
          : "";
      const throwSuper =
        testDetails.outcome == Outcome.SUPER_OVERRIDE_IGNORED
          ? "throw new TypeException();"
          : "";

      try {
        await deploy(
          test.connection,
          new Map([
            [
              "OverrideBase",
              `global virtual class OverrideBase {public void entry() {myMethod();} ${testDetails.baseVisibility} void myMethod() { ${throwBase}}}`,
            ],
            [
              "OverrideSuper",
              `global virtual class OverrideSuper extends OverrideBase {${testDetails.superVisibility} void myMethod() { ${throwSuper} }}`,
            ],
          ])
        );
      } catch (ex) {
        if (ex instanceof Error) {
          if (
            testDetails.outcome == Outcome.OVERRIDE_ON_NON_OVERRIDING &&
            ex.message.includes("@Override specified for non-overriding method")
          ) {
            return;
          } else if (
            testDetails.outcome == Outcome.CANNOT_REDUCE_VISIBILITY &&
            ex.message.includes("Cannot reduce the visibility of method")
          ) {
            return;
          } else if (
            testDetails.outcome == Outcome.CANNOT_BE_OVERRIDDEN &&
            ex.message.includes(
              "Non-virtual, non-abstract methods cannot be overridden"
            )
          ) {
            return;
          } else {
            throw ex;
          }
        }
      }

      runApex(test, testDetails, "/apex-scripts/separateFile.apex");
    });
  });

  virtualSameFileTests.forEach((testDetails) => {
    const baseVisibilityDisplay = displayVisibility(testDetails.baseVisibility);
    const superVisibilityDisplay = displayVisibility(
      testDetails.superVisibility
    );

    it(`Same files - Override ${baseVisibilityDisplay} virtual with ${superVisibilityDisplay} override is ${
      Outcome[testDetails.outcome]
    }`, async () => {
      const throwBase =
        testDetails.outcome == Outcome.SUPER_OVERRIDES
          ? "throw new TypeException();"
          : "";
      const throwSuper =
        testDetails.outcome == Outcome.SUPER_OVERRIDE_IGNORED
          ? "throw new TypeException();"
          : "";

      try {
        await deploy(
          test.connection,
          new Map([
            [
              "OverrideTest",
              `global class OverrideTest {
                global virtual class OverrideBase {public void entry() {myMethod();} ${testDetails.baseVisibility} virtual void myMethod() { ${throwBase} }} 
                global class OverrideSuper extends OverrideBase {${testDetails.superVisibility} override void myMethod() { ${throwSuper} }}
              }`,
            ],
          ])
        );
      } catch (ex) {
        if (ex instanceof Error) {
          if (
            testDetails.outcome == Outcome.OVERRIDE_ON_NON_OVERRIDING &&
            ex.message.includes("@Override specified for non-overriding method")
          ) {
            return;
          } else if (
            testDetails.outcome == Outcome.CANNOT_REDUCE_VISIBILITY &&
            ex.message.includes("Cannot reduce the visibility of method")
          ) {
            return;
          } else {
            throw ex;
          }
        }
      }

      runApex(test, testDetails, "/apex-scripts/sameFile.apex");
    });
  });

  virtualSameFileTests.forEach((testDetails) => {
    const baseVisibilityDisplay = displayVisibility(testDetails.baseVisibility);
    const superVisibilityDisplay = displayVisibility(
      testDetails.superVisibility
    );

    it(`Same files extend Outer - Override ${baseVisibilityDisplay} virtual with ${superVisibilityDisplay} override is ${
      Outcome[testDetails.outcome]
    }`, async () => {
      const throwBase =
        testDetails.outcome == Outcome.SUPER_OVERRIDES
          ? "throw new TypeException();"
          : "";
      const throwSuper =
        testDetails.outcome == Outcome.SUPER_OVERRIDE_IGNORED
          ? "throw new TypeException();"
          : "";

      try {
        await deploy(
          test.connection,
          new Map([
            [
              "OverrideTest",
              `global virtual class OverrideTest {
                public void entry() {myMethod();} ${testDetails.baseVisibility} virtual void myMethod() { ${throwBase} } 
                global class OverrideSuper extends OverrideTest {${testDetails.superVisibility} override void myMethod() { ${throwSuper} }}
              }`,
            ],
          ])
        );
      } catch (ex) {
        if (ex instanceof Error) {
          if (
            testDetails.outcome == Outcome.OVERRIDE_ON_NON_OVERRIDING &&
            ex.message.includes("@Override specified for non-overriding method")
          ) {
            return;
          } else if (
            testDetails.outcome == Outcome.CANNOT_REDUCE_VISIBILITY &&
            ex.message.includes("Cannot reduce the visibility of method")
          ) {
            return;
          } else {
            throw ex;
          }
        }
      }

      runApex(test, testDetails, "/apex-scripts/sameFileExtendOuter.apex");
    });
  });

  virtualSameFileTests.forEach((testDetails) => {
    const baseVisibilityDisplay = displayVisibility(testDetails.baseVisibility);
    const superVisibilityDisplay = displayVisibility(
      testDetails.superVisibility
    );

    it(`Same files extend Inner - Override ${baseVisibilityDisplay} virtual with ${superVisibilityDisplay} override is ${
      Outcome[testDetails.outcome]
    }`, async () => {
      const throwBase =
        testDetails.outcome == Outcome.SUPER_OVERRIDES
          ? "throw new TypeException();"
          : "";
      const throwSuper =
        testDetails.outcome == Outcome.SUPER_OVERRIDE_IGNORED
          ? "throw new TypeException();"
          : "";

      try {
        await deploy(
          test.connection,
          new Map([
            [
              "OverrideTest",
              `global class OverrideTest extends OverrideBase {
                global virtual class OverrideBase {public void entry() {myMethod();} ${testDetails.baseVisibility} virtual void myMethod() { ${throwBase} }} 
                ${testDetails.superVisibility} override void myMethod() { ${throwSuper} }
              }`,
            ],
          ])
        );
      } catch (ex) {
        if (ex instanceof Error) {
          if (
            testDetails.outcome == Outcome.OVERRIDE_ON_NON_OVERRIDING &&
            ex.message.includes("@Override specified for non-overriding method")
          ) {
            return;
          } else if (
            testDetails.outcome == Outcome.CANNOT_REDUCE_VISIBILITY &&
            ex.message.includes("Cannot reduce the visibility of method")
          ) {
            return;
          } else {
            throw ex;
          }
        }
      }

      runApex(test, testDetails, "/apex-scripts/sameFileExtendInner.apex");
    });
  });
});
