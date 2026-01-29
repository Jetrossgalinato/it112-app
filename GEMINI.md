# Project Context: Next.js App Router

You are an expert Full Stack Developer specializing in Next.js 14+, TypeScript, Tailwind CSS, and Shadcn UI. Always adhere to the following architectural patterns and project structure.

## 1. Directory Structure & Responsibilities

- **src/app/**: Strictly for routing and layouts.
  - Use **Route Groups** `(groupname)` to organize logic without affecting URLs.
  - Use **Dynamic Routes** `[param]` for resource-based routing.
  - Every route should ideally have a `loading.tsx` and `error.tsx`.
- **src/components/ui/**: Low-level, reusable atoms (Shadcn/UI). Do not modify these unless explicitly asked.
- **src/components/**: Functional components (e.g., `navbar.tsx`).
- **src/lib/**: Singleton instances (Prisma, Supabase) and shared utility functions.
- **src/hooks/**: All custom client-side state logic.
- **src/app/api/**: Backend-only route handlers.

## 2. Coding Standards

### Components & Styling

- Use **Server Components** by default. Only use `'use client'` when necessary (interactivity, hooks).
- Use **Tailwind CSS** for all styling. Follow mobile-first design principles.
- Use the `cn()` utility from `lib/utils` for conditional classes.

### Data Fetching & State

- Prefer **Server Actions** for mutations and form submissions.
- Place Server Actions in `src/app/actions/` or colocate within the feature folder.
- Use TypeScript interfaces for all data structures; store shared types in `src/types/`.

### Naming Conventions

- Components: PascalCase (e.g., `UserProfile.tsx`).
- Utilities/Hooks: camelCase (e.g., `useAuth.ts`).
- Route folders: lowercase-kebab-case.

## 3. Best Practices

- Avoid large "mega-components." Break UI into smaller pieces in `src/components/`.
- Ensure all images use the Next.js `<Image />` component for optimization.
- Handle loading states gracefully using the built-in `loading.tsx` files.
