export const TOOL_PRICING = {
  ChatGPT: {
    plans: ["Plus", "Team", "Enterprise", "API Direct"],
  },

  Claude: {
    plans: [
      "Free",
      "Pro",
      "Max",
      "Team",
      "Enterprise",
      "API Direct",
    ],
  },

  Cursor: {
    plans: ["Hobby", "Pro", "Business", "Enterprise"],
  },

  "GitHub Copilot": {
    plans: ["Individual", "Business", "Enterprise"],
  },

  Gemini: {
    plans: ["Pro", "Ultra", "API"],
  },

  Windsurf: {
    plans: ["Free", "Pro", "Teams"],
  },
} as const;