# Architecture

## Planned System Flow

```mermaid
flowchart TD
    A[User Input Form] --> B[Validation Layer]
    B --> C[Audit Engine]
    C --> D[AI Summary Generator]
    C --> E[Results Page]
    E --> F[Lead Capture]
    F --> G[Supabase Database]
```

## Notes

- Zustand will manage persistent client-side form state
- Audit calculations will use deterministic rule-based logic
- AI will only generate personalized summaries
- Supabase will store captured leads and audit reports