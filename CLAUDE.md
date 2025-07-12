# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Google Forms-like form generator application built as a monorepo with:
- **Frontend**: React + Vite + TypeScript + Tailwind CSS + React Hook Form + Jotai
- **Backend**: Hono + TypeScript + Prisma + SQLite (with Hono RPC)
- **Tooling**: Biome for linting/formatting, npm workspaces for monorepo management

### Product Concept
A hobby project for creating and collecting form responses without login functionality. Anyone can create forms and collect responses. Simple design with optional password protection for forms.

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

## Product Specifications

### Main Features

#### 1. Form Creation
- Set title and description
- Add/remove/reorder form elements:
  - Text input (`input`)
  - Text area (`textarea`)  
  - Radio buttons (`radio`)
  - Select box (`select`)
  - Checkboxes (`checkbox`)
  - Date picker (`date`)
  - Number input (`number`)
- Validation settings for each element:
  - Required/optional setting
  - Character limits (min/max)
  - Number ranges (min/max)
  - Regular expression patterns (email, URL, etc.)
- Optional password protection setting

#### 2. Response Collection
- Fill out created forms
- Real-time error display based on validation
- Optional confirmation screen before submission
- Display completion message after submission

#### 3. Password Protection
- Simple implementation: no session management, re-enter on reload
- Optional password setting during form creation
- Password-protected forms only display after correct password entry
- Passwords are hashed and stored on backend

#### 4. Response Management
- Form creators can view all responses
- Individual response detail view

### Routing Structure
```
/                          # Home (start form creation)
/forms/create              # Form creation page  
/forms/:formId             # Response page (password protection supported)
/forms/:formId/responses   # Response list page
/forms/:formId/responses/:responseId  # Individual response detail page
```

### Database Schema

```prisma
model Form {
  id          String   @id @default(uuid())
  title       String
  description String?
  schema      Json     // Form structure
  settings    Json     // Form settings
  password    String?  // Hashed password
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  responses   Response[]
  
  @@index([createdAt])
}

model Response {
  id          String   @id @default(uuid())
  formId      String
  data        Json     // Response data
  metadata    Json?    // Metadata (optional)
  createdAt   DateTime @default(now())
  
  form        Form     @relation(fields: [formId], references: [id], onDelete: Cascade)
  
  @@index([formId, createdAt])
}
```

### API Design (Hono RPC)

```typescript
// Form operations
POST   /api/forms/create      // Create form
GET    /api/forms/:id         // Get form
POST   /api/forms/:id/verify  // Password verification (returns form data if password matches)

// Response operations  
POST   /api/responses/create        // Submit response
GET    /api/responses/form/:formId  // Get all responses for form
GET    /api/responses/:id           // Get individual response
```

### Security Requirements
- Simple rate limiting (prevent mass requests from same IP)
- Input value sanitization
- CORS configuration

### Non-Functional Requirements
- Responsive design support
- Error handling with user-friendly error messages
- Loading state displays

### Future Extensibility Considerations
- Repository pattern for data access layer abstraction
- JSON format data storage considering future NoSQL migration