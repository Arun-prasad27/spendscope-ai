import { createClient } from "@/lib/supabase/server";

interface AuditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AuditPage({ params }: AuditPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: audit } = await supabase
    .from("public_audits")
    .select("*")
    .eq("id", id)
    .single();

  if (!audit) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Audit not found</h1>
      </div>
    );
  }

  const recommendations = audit.audit_data;

  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="rounded-2xl bg-black p-8 text-white">
        <h1 className="text-4xl font-bold">AI Spend Audit</h1>

        <p className="mt-4 text-5xl font-bold">
          ${audit.total_monthly_savings}/mo
        </p>

        <p className="mt-2 text-lg text-gray-300">
          ${audit.total_annual_savings}/year potential savings
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {recommendations.map(
          (
            result: {
              tool: string;
              reason: string;
              recommendedAction: string;
              estimatedSavings: number;
            },
            index: number,
          ) => (
            <div key={index} className="rounded-xl border p-6">
              <h2 className="text-xl font-semibold">{result.tool}</h2>

              <p className="mt-2">{result.reason}</p>

              <div className="mt-4 flex items-center justify-between">
                <p>{result.recommendedAction}</p>

                <p className="font-semibold text-green-600">
                  Save ${result.estimatedSavings}/mo
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
