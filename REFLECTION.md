# Reflection

## 1. The hardest bug I hit this week, and how I debugged it

The hardest bug I encountered was an infinite render loop caused by syncing React Hook Form state directly into Zustand persistence. Initially, I used `watch()` from React Hook Form inside a `useEffect` that immediately updated the Zustand store whenever form values changed. This caused the form state update to trigger another render, which retriggered the watcher repeatedly until React threw a “Maximum update depth exceeded” error.

My first hypothesis was that Zustand persistence itself was unstable, so I temporarily removed persistence entirely. The issue disappeared, which narrowed the problem down to the interaction between `watch()` and the store updates. I then tested logging render counts and discovered the `watch()` values were changing every render because new object references were being produced continuously.

I fixed the issue by restructuring the synchronization logic and avoiding direct recursive update patterns between React Hook Form and Zustand. I also learned that React Hook Form’s `watch()` API behaves differently from stable memoized state and can trigger compiler-related warnings when misused inside render logic.

That debugging process improved my understanding of controlled forms, render cycles, and persistent client-side state management in React applications.

---

## 2. A decision I reversed mid-week, and what made me reverse it

Initially, I planned to save lead data directly from the frontend into Supabase because it was faster to implement. After adding transactional email support and honeypot spam protection, I realized this architecture would become difficult to secure and maintain properly.

I reversed that decision and moved lead persistence into dedicated Next.js API routes. This allowed the backend to coordinate multiple responsibilities in one place:

* saving leads
* validating honeypot spam fields
* sending confirmation emails
* handling errors consistently

This also improved separation of concerns because frontend components no longer needed direct responsibility for database interactions.

The reversal taught me that “fastest implementation” is not always the best long-term architectural choice, even for MVPs. Small backend abstractions can significantly improve maintainability without adding too much complexity.

---

## 3. What I would build in week 2 if I had it

If I had another week, I would improve three major areas.

First, I would expand the audit engine into a more sophisticated recommendation system using structured pricing configuration tables rather than partially hardcoded logic. This would allow easier updates as vendor pricing changes.

Second, I would improve benchmarking and analytics features. One feature I would add is “AI spend per developer” benchmarking so startups can compare their tooling costs against peers of similar team size and use case.

Third, I would improve distribution-focused features. The assignment made me think heavily about viral growth loops, so I would invest more into the shareable audit experience with richer Open Graph previews, better screenshot formatting, and embedded audit widgets that bloggers or startup communities could reuse externally.

I would also improve observability by adding analytics instrumentation for:

* audit completion rates
* lead conversion funnels
* share rates
* high-savings audit frequency

---

## 4. How I used AI tools during the project

I used ChatGPT heavily for brainstorming architecture approaches, debugging frontend issues, improving documentation quality, and refining engineering explanations. I also used GitHub Copilot occasionally for repetitive boilerplate generation.

However, I intentionally did not trust AI-generated business logic blindly. The audit engine itself was designed using deterministic recommendation rules because financial recommendations need to remain explainable and predictable.

One specific example where AI was wrong involved the React Hook Form persistence issue. Early suggestions encouraged syncing watched form state directly into Zustand, which created recursive render loops and unstable updates. The code looked plausible initially, but debugging showed the architecture itself was flawed. I corrected the implementation manually after isolating the render cycle behavior.

I also rejected overly complicated architecture suggestions several times during development because they introduced unnecessary complexity for an MVP-scale product.

---

## 5. Self-rating

### Discipline — 8/10

I maintained consistent daily progress, deployment updates, testing, CI setup, and documentation work while balancing implementation and debugging pressure under a tight deadline.

### Code Quality — 7/10

The codebase is strongly typed, modular, tested, and production deployed, though some recommendation logic remains intentionally simplified for MVP speed.

### Design Sense — 7/10

The UI is clean, readable, responsive, and focused on clarity rather than visual excess. More polish could still be added around branding and richer result presentation.

### Problem Solving — 8/10

Several real production issues emerged during development, including state persistence loops, API failure handling, deployment configuration problems, and test integration. I was able to isolate and resolve them systematically.

### Entrepreneurial Thinking — 7/10

The project pushed me to think beyond frontend implementation and consider lead generation, pricing trustworthiness, viral sharing loops, abuse protection, and conversion-oriented product design rather than treating the assignment as only a coding task.
