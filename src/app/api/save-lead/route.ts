import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      companyName,
      role,
      teamSize,
    } = body;

    const { error } = await supabase.from("leads").insert({
      email,
      company_name: companyName,
      role,
      team_size: teamSize,
    });

    if (error) {
      return NextResponse.json(
        {
          error: "Failed to save lead",
        },
        {
          status: 500,
        }
      );
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",

      to: email,

      subject: "Your AI Spend Audit Report",

      html: `
        <h1>AI Spend Audit Saved</h1>

        <p>Thanks for using SpendScope AI.</p>

        <p>Your audit has been saved successfully.</p>

        <p>We identified opportunities to optimize your AI tooling costs.</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}