import { AuditRecommendation } from "@/types/audit";

interface AuditResultsProps {
  results: AuditRecommendation[];
}

export default function AuditResults({ results }: AuditResultsProps) {
  const totalMonthlySavings = results.reduce(
    (sum, item) => sum + item.estimatedSavings,
    0,
  );

  const annualSavings = totalMonthlySavings * 12;

  return (
    <div className="mt-10 space-y-6">
      <div className="rounded-2xl border bg-black p-8 text-white">
        <h2 className="text-3xl font-bold">Potential Savings</h2>

        <div className="mt-4">
          <p className="text-5xl font-bold">${totalMonthlySavings}/mo</p>

          <p className="mt-2 text-lg text-gray-300">${annualSavings}/year</p>
        </div>
      </div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className="rounded-xl border p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{result.tool}</h3>

                <p className="mt-2 text-gray-600">{result.reason}</p>
              </div>

              <div className="text-right">
                <p className="font-semibold">{result.recommendedAction}</p>

                <p className="mt-2 text-green-600">
                  Save ${result.estimatedSavings}/mo
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
