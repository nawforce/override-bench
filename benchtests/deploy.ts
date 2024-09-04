import { SalesforceConnection } from "@apexdevtools/benchmarker";

export async function deploy(
  connection: SalesforceConnection,
  sources: Map<string, string>
) {
  const tooling = connection.tooling;

  const nameList = Array.from(sources.keys())
    .map((name) => `'${name}'`)
    .join(", ");
  const existingClasses = await tooling.query(
    `Select Id From ApexClass where Name in (${nameList})`
  );
  const ids = existingClasses.records.map((r) => r.Id) as string[];
  for (const id of ids) {
    await tooling.sobject("ApexClass").delete(id);
  }

  for (const name of sources.keys()) {
    const body = sources.get(name);
    await tooling.sobject("ApexClass").create({ name, body });
  }
}
