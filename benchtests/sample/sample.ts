import {
  TransactionTestTemplate,
  TransactionProcess,
  createApexExecutionTestStepFlow,
  saveResults,
} from "@apexdevtools/benchmarker";

describe("sample", async () => {
  let test: TransactionTestTemplate;
  const flowName = "Looping";

  before(async function () {
    test = await TransactionProcess.build("Something");
  });

  it("Sleep test", async () => {
    await TransactionProcess.executeTestStep(
      test,
      await createApexExecutionTestStepFlow(
        test.connection,
        __dirname + "/apex-scripts/sample.apex",
        {
          flowName: flowName,
          action: "Sleep",
        },
        {
          tokenMap: [{ token: "_count_", value: "" + 1000000 }],
        }
      )
    );
  });

  after("Display/Save Results", async () => {
    await saveResults(test, test.flowStepsResults);
  });
});
