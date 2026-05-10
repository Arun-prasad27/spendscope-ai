import { z } from "zod"; 

export const toolSpendSchema = z.object({ 
  tool: z.string().min(1, "Tool is required"),
  plan: z.string().min(1, "Plan is required"),
  monthlySpend: z.number().min(0),
  seats: z.number().min(1),
});

export const auditFormSchema = z.object({ 
  tools: z.array(toolSpendSchema).min(1),
  teamSize: z.number().min(1),
  primaryUseCase: z.enum([
    "coding",
    "writing",
    "research",
    "data",
    "mixed",
  ]),
});

export type AuditFormSchema = z.infer<typeof auditFormSchema>; 