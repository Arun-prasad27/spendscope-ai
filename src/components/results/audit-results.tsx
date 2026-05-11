import { AuditRecommendation } from "@/types/audit";
import { LeadCaptureForm } from "./lead-capture-form";
import { useEffect, useState } from "react";

interface AuditResultsProps {
  results: AuditRecommendation[];
  teamSize: number;
}

export default function AuditResults({ results, teamSize }: AuditResultsProps) {
  const totalMonthlySavings = results.reduce(
    (sum, item) => sum + item.estimatedSavings,
    0,
  );

  const annualSavings = totalMonthlySavings * 12;

  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(true);

  useEffect(() => {
    async function generateSummary() {
      try {
        const response = await fetch("/api/generate-summary", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            results,
            totalSavings: totalMonthlySavings,
          }),
        });

        const data = await response.json();

        setSummary(data.summary);
      } catch (error) {
        console.error(error);

        setSummary(
          "We identified several opportunities to optimize your AI infrastructure spending while maintaining team productivity.",
        );
      } finally {
        setLoadingSummary(false);
      }
    }

    generateSummary();
  }, [results, totalMonthlySavings]);

  return (
    <div className="mt-10 space-y-6">
      <div className="rounded-2xl border bg-black p-8 text-white">
        <h2 className="text-3xl font-bold">Potential Savings</h2>

        <div className="mt-4">
          <p className="text-5xl font-bold">${totalMonthlySavings}/mo</p>

          <p className="mt-2 text-lg text-gray-300">${annualSavings}/year</p>
        </div>
      </div>

      <div className="rounded-xl border p-6">
        <h3 className="text-xl font-semibold">AI Audit Summary</h3>

        <p className="mt-3 text-gray-600">
          {loadingSummary ? "Generating personalized summary..." : summary}
        </p>
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
        <LeadCaptureForm
          estimatedSavings={totalMonthlySavings}
          teamSize={teamSize}
        />
      </div>
    </div>
  );
}
