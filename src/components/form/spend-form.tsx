"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod";

import { auditFormSchema, AuditFormSchema } from "@/lib/validations";
import { useAuditStore } from "@/store/audit-store";
import { generateAudit } from "@/lib/audit-engine";

export default function SpendForm() {
  const { formData, setFormData } = useAuditStore();

  const {
    register,
    handleSubmit,
    reset, // For resetting form with stored data
    formState: { errors },
  } = useForm<AuditFormSchema>({ 
    resolver: zodResolver(auditFormSchema),

    defaultValues: formData,
  }); 

  useEffect(() => { // Sync form with store data on mount and when store data changes
    reset(formData); // Reset form with current store data
  }, [formData, reset]); 


  const onSubmit = (data: AuditFormSchema) => {
    setFormData(data);
    const auditResults = generateAudit(data);
    console.log("Audit Data:", data);
    console.log("Audit Results:", auditResults);
  };

  return (
    <div className="rounded-xl border p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">AI Spend Audit</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="mb-2 block font-medium">Team Size</label>

          <input
            type="number"
            {...register("teamSize", {
              valueAsNumber: true,
            })}
            className="w-full rounded-md border p-3"
          />

          {errors.teamSize && (
            <p className="mt-1 text-sm text-red-500">Invalid team size</p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">Primary Use Case</label>

          <select
            {...register("primaryUseCase")}
            className="w-full rounded-md border p-3"
          >
            <option value="coding">Coding</option>
            <option value="writing">Writing</option>
            <option value="research">Research</option>
            <option value="data">Data</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">Monthly Spend</label>

          <input
            type="number"
            {...register("tools.0.monthlySpend", {
              valueAsNumber: true,
            })}
            className="w-full rounded-md border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Seats</label>

          <input
            type="number"
            {...register("tools.0.seats", {
              valueAsNumber: true,
            })}
            className="w-full rounded-md border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Tool</label>

          <select
            {...register("tools.0.tool")}
            className="w-full rounded-md border p-3"
          >
            <option value="">Select Tool</option>
            <option value="Cursor">Cursor</option>
            <option value="ChatGPT">ChatGPT</option>
            <option value="Claude">Claude</option>
            <option value="GitHub Copilot">GitHub Copilot</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">Plan</label>

          <input
            type="text"
            {...register("tools.0.plan")}
            className="w-full rounded-md border p-3"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-black px-5 py-3 text-white"
        >
          Generate Audit
        </button>
      </form>
    </div>
  );
}
