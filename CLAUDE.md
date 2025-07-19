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
- **Styling**: Tailwind CSS with PostCSS (use only default Tailwind spacing values, no custom px values)
- **Responsive Design**: Mobile-first approach with custom breakpoints (xs: 475px, sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px) and safe area support for iOS devices
- **Communication**: Direct fetch calls to backend at localhost:3000
- **Health Check**: Built-in connectivity verification with backend
- **Component Organization**: 
  - Generic reusable components in `src/components/`
  - Page-specific components in `src/features/[pageName]/`

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
/                                    # Home (start form creation)
/forms/create                        # Form creation page  
/forms/:formId                       # Response page (password protection supported)
/forms/:formId/responses             # Response list page (deprecated - use admin URLs)
/forms/:formId/responses/:responseId # Individual response detail page (deprecated)
/responses/:responseId               # Individual response page (standalone access)
/admin/:adminId/responses            # Secure admin response list page
```

### Database Schema

```prisma
model Form {
  id              String   @id @default(uuid())
  title           String
  description     String?
  schema          String   // Form structure (JSON as string)
  settings        String   // Form settings (JSON as string)
  password        String?  // Hashed password for form access
  adminId         String   @unique @default(uuid()) // Admin access UUID
  adminPassword   String?  // Hashed password for admin access (responses management)
  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  responses       Response[]
  
  @@index([createdAt])
}

model Response {
  id          String   @id @default(uuid())
  formId      String
  data        String   // Response data (JSON as string)
  metadata    String?  // Metadata (JSON as string, optional)
  createdAt   DateTime @default(now())
  
  form        Form     @relation(fields: [formId], references: [id], onDelete: Cascade)
  
  @@index([formId, createdAt])
}
```

### API Design (Hono RPC)

```typescript
// Form operations
POST   /api/forms/create              // Create form (returns formId and adminId)
GET    /api/forms/:id                 // Get form for response
POST   /api/forms/:id/verify          // Password verification for form access

// Admin operations
GET    /api/admin/:adminId            // Get form by adminId
POST   /api/admin/:adminId/verify     // Admin password verification

// Response operations  
POST   /api/responses/create          // Submit response (returns responseId)
GET    /api/responses/:id             // Get individual response
GET    /api/responses/form/:formId    // Get all responses for form (deprecated)
GET    /api/responses/admin/:adminId  // Get all responses via adminId
```

### Security Requirements
- Simple rate limiting (prevent mass requests from same IP)
- Input value sanitization
- CORS configuration

### Non-Functional Requirements
- Responsive design support
- Error handling with user-friendly error messages
- Loading state displays

### Security Features

#### Admin Access Control
- **Dual UUID System**: Form ID and Admin ID are completely separate
- **Admin Password Protection**: Optional secondary password for response management
- **URL Isolation**: Admin URLs use different routing patterns (`/admin/:adminId/responses`)
- **Access Separation**: Response viewing and form answering use different authentication

#### Privacy Protection Features
- **Privacy Notices**: Prominent warnings on both creation and response pages
- **Data Limitation**: Clear guidance against collecting personal information
- **User Education**: Explicit examples of appropriate vs inappropriate use cases

### Component Architecture

#### Generic Components (`/src/components/`)
- `Layout.tsx` - Main application layout
- `LoadingSpinner.tsx` - Loading state indicator
- `ErrorDisplay.tsx` - Error message display
- `SuccessCard.tsx` - Success message container
- `PageContainer.tsx` - Page wrapper with consistent styling
- `EmptyState.tsx` - Empty state placeholder
- `CopyButton.tsx` - Clipboard functionality with fallback
- `PrivacyNotice.tsx` - Privacy warning component
- `Modal.tsx` - Generic modal wrapper
- `SubmitButton.tsx` - Form submission button

#### Feature-Specific Components (`/src/features/`)

**Form Creation (`/form-create/`)**
- `CreateHeader.tsx` - Form creation page header
- `CreateFooter.tsx` - Form creation page footer
- `FormBuilder.tsx` - Main form building interface
- `FormPreview.tsx` - Real-time form preview
- `FormSettings.tsx` - Form configuration settings

**Form Response (`/form/`)**
- `FormContainer.tsx` - Response form wrapper
- `FormHeader.tsx` - Form title and description
- `FormElement.tsx` - Individual form field renderer
- `FormFooter.tsx` - Form submission area
- `PasswordModal.tsx` - Form access password input
- `ResponseSubmittedSuccess.tsx` - Post-submission success screen
- `FormCreatedSuccess.tsx` - Post-creation success screen

**Response Management (`/response/`)**
- `ResponseList.tsx` - List of form responses
- `ResponseCard.tsx` - Individual response preview
- `ResponseDetailHeader.tsx` - Response detail page header
- `ResponseContent.tsx` - Response data display
- `ResponseMetadata.tsx` - Response metadata (date, etc.)
- `ResponseActions.tsx` - Response management actions

**Admin Management (`/admin/`)**
- `AdminPasswordModal.tsx` - Admin authentication modal

### Utility Functions

#### Clipboard Support (`/utils/clipboard.ts`)
- Modern Clipboard API with fallback for older browsers
- Cross-browser compatibility
- Error handling and user feedback

#### Date Utilities (`/utils/dateUtils.ts`)
- Consistent date formatting across the application
- Locale-aware date display

### Development Guidelines

#### Code Quality
- **Biome**: Unified linting and formatting tool
- **TypeScript**: Strict type checking enabled
- **Component Props**: All props are properly typed with interfaces
- **Error Boundaries**: Proper error handling and user feedback

#### Responsive Design
- **Mobile-First**: Design starts with mobile and scales up
- **Tailwind Classes**: Only default spacing values, no custom px values
- **Breakpoints**: Custom breakpoints defined for consistent scaling
- **Touch-Friendly**: Interactive elements sized for touch interfaces

#### Performance Considerations
- **Code Splitting**: Components are modularly organized for potential lazy loading
- **Bundle Size**: Dependencies are carefully chosen to minimize bundle size
- **Database Indexing**: Strategic indexes on frequently queried fields

### Deployment Considerations

#### Production Setup
- Environment variables for database connection
- CORS configuration for production domains
- Static file serving configuration
- Database migration strategy

#### Monitoring and Logging
- Error tracking integration points
- Performance monitoring hooks
- User analytics considerations (privacy-compliant)

### Future Extensibility Considerations
- Repository pattern for data access layer abstraction
- JSON format data storage considering future NoSQL migration
- Modular component architecture for feature additions
- API versioning strategy for backward compatibility
- Internationalization (i18n) preparation
- Theme system implementation possibility
- Advanced form validation engine
- Export functionality for response data
- Real-time collaboration features
- Advanced analytics and reporting

## Folder Structure

```
form-generate-page/
├── backend/                    # Backend application
│   ├── src/
│   │   ├── application/        # Application layer (services, DTOs)
│   │   ├── domain/            # Domain layer (entities, value objects)
│   │   ├── infrastructure/    # Infrastructure layer (repositories, database)
│   │   ├── presentation/      # Presentation layer (controllers, schemas)
│   │   └── shared/           # Shared utilities and types
│   ├── prisma/               # Database schema and migrations
│   └── package.json
├── frontend/                  # Frontend application
│   ├── src/
│   │   ├── components/       # Generic reusable components
│   │   ├── features/         # Feature-specific components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript type definitions
│   │   ├── data/            # Mock data for development
│   │   └── lib/             # Third-party library configurations
│   ├── public/              # Static assets
│   └── package.json
├── package.json             # Root package.json for workspace management
├── tsconfig.json           # Shared TypeScript configuration
├── biome.json             # Linting and formatting configuration
├── README.md              # User documentation
└── CLAUDE.md             # Technical documentation (this file)
```

## Mock Data Strategy

During development, the application uses comprehensive mock data to simulate real API responses:

- **mockForms.ts**: Sample form structures with various field types
- **mockResponses.ts**: Sample response data for testing
- **API Integration Points**: All API calls are abstracted for easy switching to real endpoints

## Important Development Notes

1. **Privacy-First Design**: All features are built with privacy protection as a core principle
2. **No Authentication System**: Deliberate choice for simplicity, security through obscurity via UUIDs
3. **Stateless Design**: No user sessions, each access is independent
4. **Component Reusability**: High emphasis on creating reusable, composable components
5. **Type Safety**: Comprehensive TypeScript coverage for reliability
6. **Error Handling**: Graceful degradation and user-friendly error messages
7. **Accessibility**: Basic accessibility features implemented, room for enhancement
8. **Performance**: Optimized for fast loading and responsive interactions