# Smart Task FE — Project Rules

## 1. Tech Stack

| Layer           | Technology                                                   | Version  |
| --------------- | ------------------------------------------------------------ | -------- |
| Framework       | **Next.js** (App Router)                                     | 16.2.12  |
| Language        | **TypeScript** (strict mode)                                 | ^5       |
| UI Library      | **React**                                                    | 19.2.4   |
| Styling         | **Tailwind CSS v4** + `tailwindcss-animate`                  | ^4       |
| UI Components   | **Radix UI** primitives + custom shadcn-style                | ^1.6.7   |
| CSS Utility     | `class-variance-authority` (cva) + `tailwind-merge` + `clsx` | —        |
| Form            | **React Hook Form** + `@hookform/resolvers/zod`              | ^7.83.0  |
| Validation      | **Zod v4**                                                   | ^4.4.3   |
| HTTP Client     | **Axios** (server-side only)                                 | ^1.18.1  |
| Server State    | **TanStack React Query**                                     | ^5.101.4 |
| Toast / Notify  | **Sonner**                                                   | ^2.0.7   |
| Icons           | **Lucide React**                                             | ^1.27.0  |
| Theme           | **next-themes**                                              | ^0.4.6   |
| Package Manager | **Yarn**                                                     | —        |

---

## 2. Cấu Trúc Thư Mục

```
src/
├── app/                          # Next.js App Router
│   ├── (admin)/                  # Route group — Admin pages (protected)
│   ├── (auth)/                   # Route group — Authentication pages (public)
│   │   ├── layout.tsx            # Auth layout (centered card)
│   │   ├── login/
│   │   │   ├── page.tsx          # Route entry
│   │   │   └── login-form.tsx    # Client component (form logic)
│   │   ├── register/
│   │   │   ├── page.tsx
│   │   │   └── register-form.tsx
│   │   └── verify/               # (planned)
│   ├── (user)/                   # Route group — User pages (protected)
│   ├── layout.tsx                # Root layout (fonts, providers, Toaster)
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Tailwind v4
│   └── favicon.ico
├── proxy.ts                       #Middleware
├── components/
│   ├── query-provider.tsx        # TanStack QueryClientProvider (client)
│   └── ui/                      # Reusable UI primitives (shadcn-style)
│       ├── button.tsx
│       ├── card.tsx
│       ├── field.tsx             # FieldSet, FieldGroup, FieldLabel, FieldError…
│       ├── form.tsx              # React Hook Form + Radix integration
│       ├── input.tsx
│       ├── label.tsx
│       ├── sonner.tsx            # Toaster wrapper
│       └── sperator.tsx          # Separator (typo giữ nguyên)
│
├── hooks/                        # Custom hooks
│
└── lib/
    ├── actions/                  # Next.js Server Actions
    │   └── auth.action.ts        # loginAction, logoutAction
    ├── apis/                     # Server-side HTTP layer (axios)
    │   ├── axios.ts              # publicApi, apiRequest (with refresh token)
    │   └── auth.api.ts           # loginApi, refreshApi, logoutApi, getMeApi
    ├── utils/
    │   └── cn.ts                 # merge tailwind class
    └── validations/              # Zod schemas
        ├── login.ts
        └── register.ts
```

---
