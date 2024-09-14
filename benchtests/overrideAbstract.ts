import {
  TransactionTestTemplate,
  TransactionProcess,
} from "@apexdevtools/benchmarker";
import { deploy } from "./deploy";
import { runApex } from "./runApex";
import { Outcome } from "./outcome";
import { displayVisibility, TestDescription } from "./testDescription";

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

describe("Override Abstract Tests", async () => {
  let test: TransactionTestTemplate;

  before(async function () {
    test = await TransactionProcess.build("Something");
  });

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
      runApex(test, testDetails, "/apex-scripts/separateFile.apex");
    });
  });

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

      runApex(test, testDetails, "/apex-scripts/separateFile.apex");
    });
  });

  sameFileTests.forEach((testDetails) => {
    const baseVisibilityDisplay = displayVisibility(testDetails.baseVisibility);
    const superVisibilityDisplay = displayVisibility(
      testDetails.superVisibility
    );

    it(`Same files - Override ${baseVisibilityDisplay} abstract with ${superVisibilityDisplay} override is ${
      Outcome[testDetails.outcome]
    }`, async () => {
      const throwSuper =
        testDetails.outcome == Outcome.SUPER_OVERRIDE_IGNORED
          ? "throw new TypeException();"
          : "";
      const baseClassVisibility =
        testDetails.baseVisibility == "global" ? "global" : "public";

      try {
        await deploy(
          test.connection,
          new Map([
            [
              "OverrideTest",
              `global class OverrideTest {
                  ${baseClassVisibility}  abstract class OverrideBase {public void entry() {myMethod();} ${testDetails.baseVisibility} abstract void myMethod(); } 
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

  sameFileTests
    .filter(
      (testDetails) =>
        testDetails.baseVisibility != "global" &&
        testDetails.superVisibility != "global"
    )
    .forEach((testDetails) => {
      const baseVisibilityDisplay = displayVisibility(
        testDetails.baseVisibility
      );
      const superVisibilityDisplay = displayVisibility(
        testDetails.superVisibility
      );

      it(`Same files extend Outer - Override ${baseVisibilityDisplay} abstract with ${superVisibilityDisplay} override is ${
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
                "OverrideTest",
                `public abstract class OverrideTest {
                  public void entry() {myMethod();} ${testDetails.baseVisibility} abstract void myMethod(); 
                  public class OverrideSuper extends OverrideTest {${testDetails.superVisibility} override void myMethod() { ${throwSuper} }}
                }`,
              ],
            ])
          );
        } catch (ex) {
          if (ex instanceof Error) {
            if (
              testDetails.outcome == Outcome.OVERRIDE_ON_NON_OVERRIDING &&
              ex.message.includes(
                "@Override specified for non-overriding method"
              )
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

  sameFileTests
    .filter(
      (testDetails) =>
        testDetails.baseVisibility != "global" &&
        testDetails.superVisibility != "global"
    )
    .forEach((testDetails) => {
      const baseVisibilityDisplay = displayVisibility(
        testDetails.baseVisibility
      );
      const superVisibilityDisplay = displayVisibility(
        testDetails.superVisibility
      );

      it(`Same files extend Inner - Override ${baseVisibilityDisplay} abstract with ${superVisibilityDisplay} override is ${
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
                "OverrideTest",
                `public class OverrideTest extends OverrideBase {
                  public abstract class OverrideBase {public void entry() {myMethod();} ${testDetails.baseVisibility} abstract void myMethod(); } 
                  ${testDetails.superVisibility} override void myMethod() { ${throwSuper} }
                }`,
              ],
            ])
          );
        } catch (ex) {
          if (ex instanceof Error) {
            if (
              testDetails.outcome == Outcome.OVERRIDE_ON_NON_OVERRIDING &&
              ex.message.includes(
                "@Override specified for non-overriding method"
              )
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
