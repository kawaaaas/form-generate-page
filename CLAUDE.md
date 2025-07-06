# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a form generator application built as a monorepo with:
- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Hono + TypeScript + Prisma + SQLite
- **Tooling**: Biome for linting/formatting, npm workspaces for monorepo management

## Development Commands

### Root Level Commands
```bash
# Install all dependencies
npm install

# Start both frontend and backend in development mode
npm run dev

# Build both frontend and backend
npm run build

# Start both frontend and backend in production mode
npm run start

# Lint all code
npm run lint

# Format all code
npm run format

# Check formatting and linting
npm run check
```

### Workspace-Specific Commands
```bash
# Frontend development (runs on localhost:5173)
npm run dev --workspace=frontend

# Backend development (runs on localhost:3000)
npm run dev --workspace=backend

# Build individual workspaces
npm run build --workspace=frontend
npm run build --workspace=backend
```

### Database Commands
```bash
# Generate Prisma client
npx prisma generate --schema=backend/prisma/schema.prisma

# Run database migrations
npx prisma migrate dev --schema=backend/prisma/schema.prisma

# View database in Prisma Studio
npx prisma studio --schema=backend/prisma/schema.prisma
```

## Architecture

### Monorepo Structure
- Uses npm workspaces defined in root `package.json`
- TypeScript configuration uses a shared root `tsconfig.json` with workspace-specific extensions
- Biome handles linting and formatting across the entire monorepo

### TypeScript Configuration
- **Root tsconfig.json**: Shared configuration with path aliases for cross-workspace imports
- **frontend/tsconfig.json**: Extends root config with Vite-specific settings (noEmit, bundler moduleResolution)
- **backend/tsconfig.json**: Extends root config with Node.js output settings
- **Path aliases**: `@backend/*` and `@frontend/*` for cross-referencing between workspaces

### Backend Architecture
- **Framework**: Hono with @hono/node-server for Node.js deployment
- **Database**: SQLite with Prisma ORM
- **CORS**: Configured for frontend at localhost:5173
- **Structure**: Single entry point at `src/index.ts` with basic health endpoint

### Frontend Architecture
- **Build**: Vite with TypeScript compilation check before bundling
- **Styling**: Tailwind CSS with PostCSS
- **Communication**: Direct fetch calls to backend at localhost:3000
- **Health Check**: Built-in connectivity verification with backend

### Development Workflow
1. Both servers run on different ports (frontend: 5173, backend: 3000)
2. Frontend includes a health check component that verifies backend connectivity
3. CORS is pre-configured to allow frontend-backend communication
4. TypeScript types can be shared between workspaces using path aliases

## Important Notes

- The project is designed for minimal setup - no testing framework included
- Database uses SQLite for simplicity in development
- Biome replaces ESLint/Prettier for consistent code formatting
- All builds must pass TypeScript compilation before deployment