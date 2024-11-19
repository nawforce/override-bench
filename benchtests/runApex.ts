import {
  createApexExecutionTestStepFlow,
  TransactionProcess,
  TransactionTestTemplate,
} from "@apexdevtools/benchmarker";
import { Outcome } from "./outcome";
import { TestDescription } from "./testDescription";
import { displayVisibility } from "./visibility";

export async function runApex(
  test: TransactionTestTemplate,
  testDescription: TestDescription,
  apexFile: string
) {
  if (
    testDescription.outcome != Outcome.SUPER_OVERRIDES &&
    testDescription.outcome != Outcome.SUPER_OVERRIDE_IGNORED &&
    testDescription.outcome != Outcome.OMGACK
  )
    throw new Error("Expecting a deploy error");

  let didThrow = false;
  try {
    await TransactionProcess.executeTestStep(
      test,
      await createApexExecutionTestStepFlow(
        test.connection,
        __dirname + apexFile,
        {
          flowName: `Running ${apexFile}`,
          action: `${displayVisibility(
            testDescription.baseVisibility
          )} ${displayVisibility(testDescription.superVisibility)} ${
            Outcome[testDescription.outcome]
          }`,
        }
      )
    );
  } catch (ex) {
    didThrow = true;
  }

  if (didThrow != (testDescription.outcome == Outcome.OMGACK))
    throw Error("Script threw when not expected or didn't when it was");
}
