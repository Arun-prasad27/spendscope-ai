import { AuditFormData, AuditRecommendation } from "@/types/audit";

export function generateAudit(
  data: AuditFormData
): AuditRecommendation[] {
  const recommendations: AuditRecommendation[] = [];

  data.tools.forEach((toolData) => {
    const {
      tool,
      plan,
      monthlySpend,
      seats,
    } = toolData;

    // ChatGPT Team downgrade logic
    if (
      tool === "ChatGPT" &&
      plan === "Team" &&
      seats <= 2
    ) {
      recommendations.push({
        tool,
        currentSpend: monthlySpend,
        recommendedAction:
          "Switch to ChatGPT Plus",

        estimatedSavings:
          monthlySpend - seats * 20,

        reason:
          "Small teams typically do not need Team-tier collaboration features.",
      });
    }

    // Cursor Business downgrade logic
    else if (
      tool === "Cursor" &&
      plan === "Business" &&
      seats <= 2
    ) {
      recommendations.push({
        tool,
        currentSpend: monthlySpend,

        recommendedAction:
          "Switch to Cursor Pro",

        estimatedSavings:
          monthlySpend - seats * 20,

        reason:
          "Cursor Pro is usually sufficient for small engineering teams.",
      });
    }

    // Claude Max downgrade
    else if (
      tool === "Claude" &&
      plan === "Max"
    ) {
      recommendations.push({
        tool,
        currentSpend: monthlySpend,

        recommendedAction:
          "Evaluate Claude Pro",

        estimatedSavings:
          monthlySpend - seats * 20,

        reason:
          "Most teams underutilize Claude Max capacity.",
      });
    }

    // Already optimized
    else {
      recommendations.push({
        tool,
        currentSpend: monthlySpend,

        recommendedAction:
          "No major optimization needed",

        estimatedSavings: 0,

        reason:
          "Current plan appears aligned with stated usage.",
      });
    }
  });

  return recommendations;
}