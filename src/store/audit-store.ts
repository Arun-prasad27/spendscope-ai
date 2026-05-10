import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuditFormData } from "@/types/audit";

interface AuditStore {
  formData: AuditFormData;
  setFormData: (data: AuditFormData) => void;
}

export const useAuditStore = create<AuditStore>()(
  persist( 
    (set) => ({
      formData: {
        tools: [],
        teamSize: 1,
        primaryUseCase: "coding",
      },

      setFormData: (data) =>
        set({
          formData: data,
        }),
    }),

    {
      name: "audit-form-storage",
    },
  ),
);
