# SpendScope AI

SpendScope AI is an AI spend auditing platform designed to help startups and engineering teams identify unnecessary AI tooling costs and optimization opportunities.

The platform analyzes current AI subscriptions, recommends better pricing plans or alternatives, and estimates monthly + annual savings through a deterministic audit engine.

## Live Demo

https://spendscope-ai-ebon.vercel.app/

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand
- Zod
- Supabase
- Vercel

## Current Status

Project setup and deployment completed. MVP development in progress.

## Quick Start

```bash

npm install
npm run dev
Open http://localhost:3000

```

# Deployment

Deployed using Vercel.

# Decisions

1. Next.js App Router

Chosen for modern React architecture, routing simplicity, and easy deployment on Vercel.

2. TypeScript Instead of JavaScript

Used for safer development, better maintainability, and improved debugging.

3. Deterministic Audit Engine

Financial recommendations are rule-based instead of AI-generated to improve reliability and trustworthiness.

4. Zustand for State Management

Chosen because the app needs lightweight persistent state without Redux-level complexity.

5. Supabase for Backend

Selected for fast setup, PostgreSQL support, and simple integration for lead storage and shared reports.