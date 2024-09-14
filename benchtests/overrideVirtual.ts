import {
  TransactionTestTemplate,
  TransactionProcess,
} from "@apexdevtools/benchmarker";
import { deploy } from "./deploy";
import { Outcome } from "./outcome";
import { displayVisibility, TestDescription } from "./testDescription";
import { runApex } from "./runApex";

const separateFileTests: TestDescription[] = [
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

const separateFileNoneOverrideTests: TestDescription[] = [
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

const sameFileTests: TestDescription[] = [
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

describe("Override Tests", async () => {
  let test: TransactionTestTemplate;

  before(async function () {
    test = await TransactionProcess.build("Something");
  });

  separateFileTests.forEach((testDetails) => {
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

  separateFileNoneOverrideTests.forEach((testDetails) => {
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

  sameFileTests.forEach((testDetails) => {
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

  sameFileTests.forEach((testDetails) => {
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

  sameFileTests.forEach((testDetails) => {
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
