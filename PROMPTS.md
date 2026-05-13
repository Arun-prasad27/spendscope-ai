# AI Prompt Design

The application uses an LLM-generated summary feature to create a concise personalized explanation of the user's AI spend audit results.

The audit recommendation logic itself is deterministic and rule-based. AI is only used for natural-language summarization.

This separation was intentional to ensure financial recommendations remain predictable, explainable, and auditable.

---

# Primary Prompt

```txt id="c8x2wv"
You are an AI infrastructure cost optimization assistant.

Summarize the user's AI spending audit in around 100 words.

Audit Results:
${JSON.stringify(results, null, 2)}

Total Monthly Savings:
$${totalSavings}

Be concise, practical, and startup-focused.
```

---

# Why This Prompt Was Written This Way

The prompt intentionally focuses on:

* concise output length
* practical business-oriented language
* startup-focused recommendations
* summarization rather than decision making

The audit calculations themselves are generated through deterministic business rules rather than AI-generated reasoning. This prevents hallucinated financial recommendations and keeps optimization logic transparent.

The model only explains the audit results in human-readable form.

---

# Fallback Handling

The application includes graceful fallback handling for:

* API quota failures
* network failures
* provider downtime
* invalid AI responses

Fallback summary:

```txt id="g4r7qn"
We identified several opportunities to reduce AI infrastructure costs while maintaining productivity across your team.
```

This ensures the product remains usable even if the AI provider becomes unavailable.

---

# Prompt Iterations That Did Not Work Well

Earlier prompt versions produced:

* overly verbose summaries
* generic marketing language
* unrealistic optimization claims
* inconsistent formatting

Adding explicit constraints such as:

* "around 100 words"
* "startup-focused"
* "be concise"

significantly improved consistency and readability.

---

# Model Choice

The implementation currently uses OpenAI GPT models through the OpenAI SDK.

The architecture intentionally isolates the summarization logic inside a dedicated API route so the provider can be swapped later with minimal frontend changes.
