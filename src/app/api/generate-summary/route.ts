import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  let totalSavings = 0;

  try {
    const body = await req.json();

    const {
      results,
      totalSavings: incomingSavings,
    } = body;

    totalSavings = incomingSavings;

    const prompt = `
You are an AI infrastructure cost optimization assistant.

Summarize the user's AI spending audit in around 100 words.

Audit Results:
${JSON.stringify(results, null, 2)}

Total Monthly Savings:
$${totalSavings}

Be concise, practical, and startup-focused.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
    });

    const summary =
      response.choices[0]?.message?.content ||
      "We identified potential AI cost optimizations across your current tooling stack.";

    return NextResponse.json({
      summary,
    });
  } catch (error) {
  console.error(error);

  const fallbackSummary =
    totalSavings > 500
      ? `Your organization appears to be overspending significantly on AI tooling. Several subscriptions could be optimized or replaced with more cost-efficient alternatives, potentially saving over $${totalSavings} per month while maintaining team productivity and collaboration capabilities.`

      : totalSavings > 100
        ? `We identified moderate AI infrastructure savings opportunities across your current tooling stack. A few plan optimizations and pricing adjustments could reduce monthly spend without impacting workflow quality.`

        : `Your current AI tooling setup already appears relatively efficient for your team size and use case. Only minor optimization opportunities were identified at this stage.`;

  return NextResponse.json({
    summary: fallbackSummary,
  });
}
}
