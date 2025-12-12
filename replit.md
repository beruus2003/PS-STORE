# PS Store E-Commerce

## Overview

PS Store is a Brazilian multi-brand e-commerce platform built with a modern full-stack architecture. The application provides a complete online shopping experience with product browsing, cart management, checkout functionality, and an admin dashboard for store management. The platform supports both Portuguese language content and Brazilian Real (BRL) currency formatting.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React Context for client state (cart, theme)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and dark/light theme support
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Design**: RESTful API with JSON responses
- **Authentication**: Replit OpenID Connect (OIDC) with Passport.js
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **Validation**: Zod schemas with drizzle-zod integration

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Drizzle Kit for schema management (`db:push` command)

### Key Design Patterns
- **Shared Types**: TypeScript types generated from Drizzle schemas are shared between client and server via the `@shared` path alias
- **Storage Abstraction**: `storage.ts` provides a data access layer abstracting database operations
- **Query Function Factory**: Custom query function in `queryClient.ts` handles authentication state and error responses
- **Component Composition**: UI built with composable shadcn/ui components following Radix patterns

### Project Structure
```
├── client/src/          # React frontend application
│   ├── components/      # Reusable UI components
│   ├── context/         # React context providers (Cart, Theme)
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Route page components
│   └── lib/             # Utilities and query client
├── server/              # Express backend (development)
├── api/                 # Vercel serverless functions (production)
├── shared/              # Shared types and schemas
└── migrations/          # Database migrations
```

### Deployment Configuration
- **Development**: Express server with Vite dev server middleware
- **Production**: Vercel deployment with serverless API functions
- **Static Assets**: Built to `dist/public` directory

## External Dependencies

### Database
- **PostgreSQL**: Primary data store for users, products, categories, orders, and sessions
- **Connection**: Configured via `DATABASE_URL` environment variable

### Authentication
- **Replit OIDC**: OAuth 2.0 authentication through Replit's identity provider
- **Environment Variables**: `ISSUER_URL`, `REPL_ID`, `SESSION_SECRET`

### Third-Party Services
- **Google Fonts**: Inter and Poppins font families loaded via CDN

### Key NPM Dependencies
- `@tanstack/react-query`: Server state management
- `drizzle-orm` / `drizzle-kit`: Database ORM and migrations
- `passport` / `openid-client`: Authentication
- `zod`: Runtime validation
- `@radix-ui/*`: Accessible UI primitives
- `tailwindcss`: Utility-first CSS framework