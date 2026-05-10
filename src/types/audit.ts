export type ToolName =
  | "Cursor" 
  | "GitHub Copilot" 
  | "Claude"
  | "ChatGPT"
  | "Anthropic API"
  | "OpenAI API"
  | "Gemini"
  | "Windsurf";

export type UseCase =
  | "coding"
  | "writing"
  | "research"
  | "data"
  | "mixed";

export interface ToolSpendInput {
  tool: ToolName;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditFormData {
  tools: ToolSpendInput[];
  teamSize: number;
  primaryUseCase: UseCase;
}

export interface AuditRecommendation {
  tool: ToolName;
  currentSpend: number;
  recommendedAction: string;
  estimatedSavings: number;
  reason: string;
}