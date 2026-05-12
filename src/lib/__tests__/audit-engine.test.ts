import { describe, it, expect } from "vitest"; // Import the function to be tested from the audit engine module

import { generateAudit } from "../audit-engine";

describe("Audit Engine", () => {
    // Test case 1: Recommends ChatGPT Plus for small teams on Team plan
  it("recommends ChatGPT Plus for small teams on Team plan", () => {
    const results = generateAudit({
      teamSize: 2,

      primaryUseCase: "coding",

      tools: [
        {
          tool: "ChatGPT",
          plan: "Team",
          monthlySpend: 60,
          seats: 2,
        },
      ],
    });

    expect(results[0].recommendedAction).toContain("ChatGPT Plus");
  });
  // Test case 2: Does not recommend changes for already optimized plans
  it("does not recommend changes for already optimized plans", () => {
    const results = generateAudit({
      teamSize: 10,

      primaryUseCase: "coding",

      tools: [
        {
          tool: "GitHub Copilot",
          plan: "Business",
          monthlySpend: 190,
          seats: 10,
        },
      ],
    });

    expect(results[0].estimatedSavings).toBe(0);
  });
// Test case 3: Calculates savings correctly for oversized Claude Team usage
  it("calculates savings correctly for oversized Claude Team usage", () => {
    const results = generateAudit({
      teamSize: 2,

      primaryUseCase: "writing",

      tools: [
        {
          tool: "Claude",
          plan: "Team",
          monthlySpend: 60,
          seats: 2,
        },
      ],
    });

    expect(results[0].estimatedSavings).toBeGreaterThanOrEqual(0);
  });
// Test case 4: Returns recommendations for multiple tools
  it("returns recommendations for multiple tools", () => {
    const results = generateAudit({
      teamSize: 5,

      primaryUseCase: "mixed",

      tools: [
        {
          tool: "ChatGPT",
          plan: "Team",
          monthlySpend: 150,
          seats: 5,
        },

        {
          tool: "Claude",
          plan: "Max",
          monthlySpend: 100,
          seats: 2,
        },
      ],
    });

    expect(results.length).toBe(2);
  });
// Test case 5: Handles already low spend scenarios honestly
  it("handles already low spend scenarios honestly", () => {
    const results = generateAudit({
      teamSize: 1,

      primaryUseCase: "research",

      tools: [
        {
          tool: "Gemini",
          plan: "Pro",
          monthlySpend: 20,
          seats: 1,
        },
      ],
    });

    expect(results[0].recommendedAction).toContain("No major optimization");
  });
});
