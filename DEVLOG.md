## Day 1 — 2026-05-09

**Hours worked:** 4

**What I did:**  
Initialized the Next.js application using TypeScript, Tailwind CSS, and the App Router architecture. Set up shadcn/ui with Radix components for the UI system and installed core dependencies including Zustand, React Hook Form, Zod, Supabase, Resend, and Vitest. Created the initial project structure, required markdown documentation files, and started planning the audit engine flow and pricing data structure.

**What I learned:**  
Spent time comparing Supabase and Firebase for storing audit reports and captured leads. Chose Supabase because relational PostgreSQL queries fit the pricing and audit-reporting use case more naturally than a NoSQL document structure.

**Blockers / what I'm stuck on:**  
Still deciding the best structure for storing pricing metadata and recommendation rules in a maintainable way. Also researching how to keep the audit logic financially defensible rather than generating vague AI-based recommendations.

**Plan for tomorrow:**  
Build the spend input form, add persistent state management with Zustand, and begin implementing the first version of the audit engine rules.