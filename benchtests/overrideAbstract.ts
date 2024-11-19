import {
  TransactionTestTemplate,
  TransactionProcess,
} from "@apexdevtools/benchmarker";
import { deploy } from "./deploy";
import { runApex } from "./runApex";
import { Outcome } from "./outcome";
import {
  abstractSameFileTests,
  abstractSeparateFileNoneOverrideTests,
  abstractSeparateFileTests,
} from "./abstractResults";
import { displayVisibility, Visibility } from "./visibility";

describe("Override Abstract Tests", async () => {
  let test: TransactionTestTemplate;

  before(async function () {
    test = await TransactionProcess.build("Something");
  });

  abstractSeparateFileTests.forEach((testDetails) => {
    const baseVisibilityDisplay = displayVisibility(testDetails.baseVisibility);
    const superVisibilityDisplay = displayVisibility(
      testDetails.superVisibility
    );
    const baseClassVisibility =
      testDetails.baseVisibility == Visibility.GLOBAL ? "global" : "public";

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

  abstractSeparateFileNoneOverrideTests.forEach((testDetails) => {
    const baseVisibilityDisplay = displayVisibility(testDetails.baseVisibility);
    const superVisibilityDisplay = displayVisibility(
      testDetails.superVisibility
    );
    const baseClassVisibility =
      testDetails.baseVisibility == Visibility.GLOBAL ? "global" : "public";

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

  abstractSameFileTests.forEach((testDetails) => {
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
        testDetails.baseVisibility == Visibility.GLOBAL ? "global" : "public";

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

  abstractSameFileTests
    .filter(
      (testDetails) =>
        testDetails.baseVisibility != Visibility.GLOBAL &&
        testDetails.superVisibility != Visibility.GLOBAL
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

  abstractSameFileTests
    .filter(
      (testDetails) =>
        testDetails.baseVisibility != Visibility.GLOBAL &&
        testDetails.superVisibility != Visibility.GLOBAL
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
