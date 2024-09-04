import {
  TransactionTestTemplate,
  TransactionProcess,
  createApexExecutionTestStepFlow,
} from "@apexdevtools/benchmarker";
import { deploy } from "./deploy";

enum Outcome {
  SUPER_OVERRIDES, // Deploys and call super method
  SUPER_OVERRIDE_IGNORED, // Deploys and calls base method
  OMGACK,
  OVERRIDE_ON_NON_OVERRIDING, // @Override specified for non-overriding method
  CANNOT_REDUCE_VISIBILITY, // Cannot reduce the visibility of method
  CANNOT_BE_OVERRIDDEN, // Non-virtual, non-abstract methods cannot be overridden
  OVERRIDE_REQUIRED, // Method must use the override keyword
}

interface TestDetails {
  baseVisibility: string;
  superVisibility: string;
  outcome: Outcome;
}

function displayVisibility(value: string): string {
  if (value == "") return "<implicit-private>";
  else return value;
}

/*
const separateFileTests: TestDetails[] = [
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
*/

const separateFileNoneOverrideTests: TestDetails[] = [
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

/*
const sameFileTests: TestDetails[] = [
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
*/

describe("Override Abstract Tests", async () => {
  let test: TransactionTestTemplate;

  before(async function () {
    test = await TransactionProcess.build("Something");
  });

  /*
  separateFileTests.forEach((testDetails) => {
    const baseVisibilityDisplay = displayVisibility(testDetails.baseVisibility);
    const superVisibilityDisplay = displayVisibility(
      testDetails.superVisibility
    );
    const baseClassVisibility =
      testDetails.baseVisibility == "global" ? "global" : "public";

    it(`Separate files - Override ${baseVisibilityDisplay} abstract with ${superVisibilityDisplay} override is ${
      Outcome[testDetails.outcome]
    }`, async () => {
      try {
        await deploy(
          test.connection,
          new Map([
            [
              "OverrideBase",
              `${baseClassVisibility} abstract class OverrideBase {public void entry() {myMethod();} ${testDetails.baseVisibility} abstract void myMethod();}`,
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

      if (
        testDetails.outcome != Outcome.SUPER_OVERRIDES &&
        testDetails.outcome != Outcome.SUPER_OVERRIDE_IGNORED
      )
        throw new Error("Expecting an exception");

      await TransactionProcess.executeTestStep(
        test,
        await createApexExecutionTestStepFlow(
          test.connection,
          __dirname + "/apex-scripts/separateFile.apex",
          {
            flowName: "Separate Classes",
            action: `${baseVisibilityDisplay} ${superVisibilityDisplay} ${
              Outcome[testDetails.outcome]
            }`,
          }
        )
      );
    });
  });
  */

  separateFileNoneOverrideTests.forEach((testDetails) => {
    const baseVisibilityDisplay = displayVisibility(testDetails.baseVisibility);
    const superVisibilityDisplay = displayVisibility(
      testDetails.superVisibility
    );
    const baseClassVisibility =
      testDetails.baseVisibility == "global" ? "global" : "public";

    it(`Separate files without override - Override ${baseVisibilityDisplay} abstract with ${superVisibilityDisplay} is ${
      Outcome[testDetails.outcome]
    }`, async () => {
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
              `${baseClassVisibility} abstract class OverrideBase {public void entry() {myMethod();} ${testDetails.baseVisibility} abstract void myMethod(); }`,
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
            testDetails.outcome == Outcome.OVERRIDE_REQUIRED &&
            ex.message.includes("Method must use the override keyword")
          ) {
            return;
          } else {
            throw ex;
          }
        }
      }

      if (
        testDetails.outcome != Outcome.SUPER_OVERRIDES &&
        testDetails.outcome != Outcome.SUPER_OVERRIDE_IGNORED &&
        testDetails.outcome != Outcome.OMGACK
      )
        throw new Error("Expecting an exception");

      let didThrow = false;
      try {
        await TransactionProcess.executeTestStep(
          test,
          await createApexExecutionTestStepFlow(
            test.connection,
            __dirname + "/apex-scripts/separateFile.apex",
            {
              flowName: "Separate Classes No Override",
              action: `${baseVisibilityDisplay} ${superVisibilityDisplay} ${
                Outcome[testDetails.outcome]
              }`,
            }
          )
        );
      } catch (ex) {
        didThrow = true;
      }

      if (didThrow != (testDetails.outcome == Outcome.OMGACK))
        throw Error("Script threw when not expected or didn't when it was");
    });
  });

  /*
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

      if (
        testDetails.outcome != Outcome.SUPER_OVERRIDES &&
        testDetails.outcome != Outcome.SUPER_OVERRIDE_IGNORED
      )
        throw new Error("Expecting an exception");

      await TransactionProcess.executeTestStep(
        test,
        await createApexExecutionTestStepFlow(
          test.connection,
          __dirname + "/apex-scripts/sameFile.apex",
          {
            flowName: "Same Classes",
            action: `${baseVisibilityDisplay} ${superVisibilityDisplay} ${
              Outcome[testDetails.outcome]
            }`,
          }
        )
      );
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

      if (
        testDetails.outcome != Outcome.SUPER_OVERRIDES &&
        testDetails.outcome != Outcome.SUPER_OVERRIDE_IGNORED
      )
        throw new Error("Expecting an exception");

      await TransactionProcess.executeTestStep(
        test,
        await createApexExecutionTestStepFlow(
          test.connection,
          __dirname + "/apex-scripts/sameFileExtendOuter.apex",
          {
            flowName: "Same Classes Inner extends Outer",
            action: `${baseVisibilityDisplay} ${superVisibilityDisplay} ${
              Outcome[testDetails.outcome]
            }`,
          }
        )
      );
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

      if (
        testDetails.outcome != Outcome.SUPER_OVERRIDES &&
        testDetails.outcome != Outcome.SUPER_OVERRIDE_IGNORED
      )
        throw new Error("Expecting an exception");

      await TransactionProcess.executeTestStep(
        test,
        await createApexExecutionTestStepFlow(
          test.connection,
          __dirname + "/apex-scripts/sameFileExtendInner.apex",
          {
            flowName: "Same Classes Outer extends Inner",
            action: `${baseVisibilityDisplay} ${superVisibilityDisplay} ${
              Outcome[testDetails.outcome]
            }`,
          }
        )
      );
    });
  });
  */
});
