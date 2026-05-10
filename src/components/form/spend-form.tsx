"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { auditFormSchema, AuditFormSchema } from "@/lib/validations";
import { useAuditStore } from "@/store/audit-store";
import { generateAudit } from "@/lib/audit-engine";
import AuditResults from "@/components/results/audit-results";
import { AuditRecommendation } from "@/types/audit";

export default function SpendForm() {
  const { formData, setFormData } = useAuditStore();
  const [results, setResults] = useState<AuditRecommendation[]>([]);

  const {
    control, // For useFieldArray
    register,
    handleSubmit,
    reset, // For resetting form with stored data
    formState: { errors },
  } = useForm<AuditFormSchema>({
    resolver: zodResolver(auditFormSchema),

    defaultValues: {
  ...formData,

  tools:
    formData.tools?.length > 0
      ? formData.tools
      : [
          {
            tool: "ChatGPT",
            plan: "",
            monthlySpend: 0,
            seats: 1,
          },
        ],
},
  });

  const { fields, append, remove } = useFieldArray({
    // For dynamic tool entries
    control,
    name: "tools",
  });

  useEffect(() => {
    // Sync form with store data on mount and when store data changes
    reset(formData); // Reset form with current store data
  }, [formData, reset]);

  const onSubmit = (data: AuditFormSchema) => {
    setFormData(data);
    const auditResults = generateAudit(data);
    setResults(auditResults);
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

        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="rounded-xl border p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Tool {index + 1}</h3>

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-sm text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block">Tool</label>

                  <select
                    {...register(`tools.${index}.tool`)}
                    className="w-full rounded-md border p-3"
                  >
                    <option value="ChatGPT">ChatGPT</option>

                    <option value="Claude">Claude</option>

                    <option value="Cursor">Cursor</option>

                    <option value="Copilot">GitHub Copilot</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block">Plan</label>

                  <input
                    {...register(`tools.${index}.plan`)}
                    className="w-full rounded-md border p-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block">Monthly Spend</label>

                  <input
                    type="number"
                    {...register(`tools.${index}.monthlySpend`, {
                      valueAsNumber: true,
                    })}
                    className="w-full rounded-md border p-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block">Seats</label>

                  <input
                    type="number"
                    {...register(`tools.${index}.seats`, {
                      valueAsNumber: true,
                    })}
                    className="w-full rounded-md border p-3"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({
                tool: "ChatGPT",
                plan: "",
                monthlySpend: 0,
                seats: 1,
              })
            }
            className="rounded-md border px-4 py-2"
          >
            + Add Another Tool
          </button>
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
      {results.length > 0 && <AuditResults results={results} />}
    </div>
  );
}
