# Webxode OS

> **The Operating System for Webxode Technologies**

Webxode OS is an internal **Business Operations Platform** built to manage the complete lifecycle of Webxode Technologies — from lead generation and sales to project delivery, payments, operations, and management.

It is designed to reduce founder dependency, standardize business workflows, improve accountability, and provide a single source of truth for the organization.

---

## Overview

Webxode Technologies operates across multiple stages of a client engagement:

```text
Lead Generation
      ↓
Lead Management
      ↓
Qualification
      ↓
Presales
      ↓
Requirement Analysis
      ↓
Proposal / Quotation
      ↓
Negotiation
      ↓
Client Confirmation
      ↓
Client Onboarding
      ↓
Project Delivery
      ↓
Payment
      ↓
Revenue
      ↓
Support
      ↓
Renewal / Upsell
```

Webxode OS brings these processes into one centralized platform.

The goal is simple:

> **Less data. Less clicking. More action.**

Instead of being just another CRM, Webxode OS is designed as a **Business Operating System** that tells the team what needs to happen, who owns it, and what comes next.

---

# Product Vision

### The Operating System for Webxode

Webxode OS is being built around five core principles:

- **Standardize** business processes
- **Reduce** founder dependency
- **Assign** clear ownership
- **Track** accountability
- **Improve** management visibility

The platform should make it possible for Webxode Technologies to scale its operations without every decision or workflow depending on the founder.

### Guiding Principle

> **Architect for the future. Build for the present.**

The architecture should be capable of evolving into a larger business platform without introducing unnecessary complexity during V1.

---

# Core Business Lifecycle

Webxode OS manages the complete operational lifecycle:

```text
┌──────────────────┐
│ Lead Generation  │
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Lead Management  │
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Sales            │
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Qualification    │
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Presales         │
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Proposal / Quote │
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Negotiation      │
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Client           │
│ Confirmation     │
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Project Delivery │
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Payments         │
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Revenue          │
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Support / Growth │
└──────────────────┘
```

---

# V1 Modules

Webxode OS V1 focuses on the core business operating system.

### Foundation

Application infrastructure, configuration, database connectivity, authentication foundations, error handling, validation, logging, and shared services.

### Sales

The primary revenue engine.

Includes:

- Leads
- Lead sources
- Lead assignment
- Lead qualification
- Sales activities
- Calls
- Meetings
- Follow-ups
- Lead status
- Sales pipeline
- Ownership
- Conversion tracking

### Presales

Converts qualified opportunities into business.

Includes:

- Requirement analysis
- Requirement documentation
- Proposals
- Quotations
- Negotiation
- Approval workflows
- Presales activities
- Commercial information

### Clients

Centralized client information.

Includes:

- Client profiles
- Contacts
- Communication information
- Client history
- Related leads
- Related projects
- Commercial information
- Activity history

### Projects & Delivery

Manages delivery after a client is converted.

Includes:

- Projects
- Project ownership
- Tasks
- Milestones
- Deliverables
- Project status
- Team assignments
- Project activities
- Payment visibility

### Workforce

Manages internal people and teams.

Includes:

- Employees
- Teams
- Business roles
- Departments
- Assignments
- Responsibilities

### Operations

Manages day-to-day internal work.

Includes:

- Tasks
- Operational activities
- Expenses
- Approvals
- Internal workflows

### Finance Visibility

Provides operational visibility into financial activity.

Includes:

- Invoices
- Payments
- Expenses
- Revenue
- Payment tracking

> Webxode OS provides operational finance visibility. It is not intended to replace dedicated accounting software.

### Management

Provides management-level visibility.

Includes:

- Business dashboard
- Reports
- Analytics
- Sales performance
- Project performance
- Revenue visibility
- Operational metrics

---

# V1 Priority

Not every module has equal priority.

The first major business engine is:

```text
Sales
   ↓
Presales
   ↓
Client
   ↓
Project
   ↓
Revenue
```

The highest priority is **Sales + Presales** because these directly influence business conversion and revenue.

---

# Action-Oriented Workflow

Webxode OS is not designed to simply store business data.

It should help employees understand:

```text
What needs to be done?
        ↓
Who needs to do it?
        ↓
When does it need to happen?
        ↓
What is the current status?
        ↓
What happens next?
```

Examples:

- Leads requiring contact today
- Follow-ups due today
- Meetings scheduled today
- Proposals awaiting approval
- Quotations awaiting client response
- Negotiations requiring attention
- Projects approaching deadlines
- Payments due
- Approvals pending

The objective is to turn the application into a **daily operating system for the business**.

---

# Architecture

Webxode OS follows a **Modular Monolith** architecture.

The application is intentionally not split into microservices during V1.

```text
                    Webxode OS
                         │
        ┌────────────────┼────────────────┐
        │                │                │
     Next.js          Modules          Server
        │                │                │
        │        ┌───────┼────────┐       │
        │        │       │        │       │
        │      Sales   Clients  Projects  │
        │        │       │        │       │
        │        └───────┼────────┘       │
        │                │                │
        │          Business Logic         │
        │                │                │
        └────────────────┼────────────────┘
                         │
                  MongoDB / Redis
```

### Architectural Principles

- Modular monolith
- Server-first architecture
- Feature-oriented modules
- Clear separation of responsibilities
- Centralized authorization
- Repository-based data access
- Service-based business logic
- Reusable UI components
- Auditable business operations
- Incremental scalability

---

# Application Architecture

The application uses Next.js server architecture.

```text
UI
 ↓
Next.js App Router
 ↓
Server Actions / Route Handlers
 ↓
Services
 ↓
Repositories
 ↓
MongoDB
```

Supporting infrastructure:

```text
Next.js
   │
   ├── Server Components
   ├── Client Components
   ├── Server Actions
   ├── Route Handlers
   │
   └── Services
          │
          └── Repositories
                  │
                  └── MongoDB
```

Redis and BullMQ are introduced only where asynchronous processing is actually required.

---

# Technology Stack

## Frontend

- Next.js 16.x
- React 19.x
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Nova design style
- Lucide icons
- Geist typography
- React Hook Form
- Zod
- Zustand where client-side state is required

## Backend

The backend is implemented inside the Next.js application.

- Next.js Server Components
- Server Actions
- Route Handlers
- Service layer
- Repository layer

No separate Express backend is used.

## Database

- MongoDB
- MongoDB Native Driver

The project intentionally does not use:

- Prisma
- Mongoose
- PostgreSQL

## Authentication & Security

- Session-based authentication architecture
- `jose`
- `bcryptjs`
- Role-Based Access Control
- Permission-based authorization
- Scope-based access

## Background Processing

- Redis
- ioredis
- BullMQ

These are used only for workloads that require asynchronous/background processing.

## Testing

- Vitest
- Testing Library
- Playwright

Testing is divided into:

```text
Unit Tests
Integration Tests
End-to-End Tests
```

## Infrastructure

- Docker
- Docker Compose
- GitHub Actions
- Future AWS deployment

---

# RBAC Architecture

Webxode OS uses a flexible permission architecture.

```text
User
  ↓
Role
  ↓
Permissions
  ↓
Access Scope
```

A system user can have one or more business roles.

Examples:

- Sales Executive
- Sales Manager
- Presales Executive
- Project Manager
- Developer
- Designer
- QA
- Finance
- Operations
- Management

The application account type itself remains simple:

```text
ADMIN
USER
```

Business responsibilities are handled through roles and permissions.

---

# Permission Model

Permissions are action-oriented.

Examples:

```text
leads.view
leads.create
leads.update
leads.assign

projects.view
projects.create
projects.update

quotations.view
quotations.create
quotations.approve

expenses.view
expenses.create
expenses.approve
```

---

# Access Scopes

Permissions can operate within different scopes.

Supported conceptual scopes include:

```text
OWN
ASSIGNED
TEAM
DEPARTMENT
PROJECT
GLOBAL
```

Example:

A Sales Executive may:

```text
View → OWN leads
Update → ASSIGNED leads
```

A Sales Manager may:

```text
View → TEAM leads
Assign → TEAM leads
```

Management may have:

```text
View → GLOBAL business information
```

This provides granular access without creating hard-coded authorization rules throughout the application.

---

# Project Structure

```text
webxode-os/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── public/
│   ├── images/
│   ├── icons/
│   └── favicon/
│
├── src/
│   │
│   ├── app/
│   │   │
│   │   ├── (marketing)/
│   │   │   ├── page.tsx
│   │   │   ├── pricing/
│   │   │   ├── features/
│   │   │   ├── about/
│   │   │   └── contact/
│   │   │
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   ├── sales/
│   │   │   ├── presales/
│   │   │   ├── clients/
│   │   │   ├── projects/
│   │   │   ├── workforce/
│   │   │   ├── operations/
│   │   │   ├── finance/
│   │   │   ├── management/
│   │   │   └── settings/
│   │   │
│   │   ├── api/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── common/
│   │   └── providers/
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── roles/
│   │   ├── sales/
│   │   ├── presales/
│   │   ├── clients/
│   │   ├── projects/
│   │   ├── workforce/
│   │   ├── operations/
│   │   ├── finance/
│   │   ├── management/
│   │   ├── notifications/
│   │   └── audit/
│   │
│   ├── server/
│   │   ├── db/
│   │   ├── auth/
│   │   ├── repositories/
│   │   ├── services/
│   │   ├── jobs/
│   │   └── cache/
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   ├── env.ts
│   │   ├── formatters.ts
│   │   └── validators.ts
│   │
│   ├── hooks/
│   ├── stores/
│   │
│   ├── config/
│   │   ├── app.ts
│   │   ├── navigation.ts
│   │   └── permissions.ts
│   │
│   └── types/
│       ├── api.ts
│       ├── auth.ts
│       └── common.ts
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env.example
├── .gitignore
├── .prettierrc.json
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

---

# Folder Responsibilities

### `src/app`

Next.js routing and page composition.

The app router should primarily handle:

- Routing
- Layouts
- Page composition
- Loading states
- Error states
- Metadata

Business logic should not be placed directly inside pages.

### `src/components`

Reusable UI components.

```text
components/ui
components/layout
components/common
components/providers
```

### `src/modules`

Business-domain modules.

Each module owns its business functionality.

Examples:

```text
sales
presales
clients
projects
finance
workforce
```

### `src/server`

Server-side infrastructure.

Responsible for:

- Database
- Authentication
- Authorization
- Repositories
- Services
- Background jobs
- Cache

### `src/lib`

Generic utilities that do not belong to a specific business module.

### `src/config`

Application-wide configuration.

### `src/types`

Shared TypeScript types.

---

# Development Strategy

Webxode OS follows a **vertical-slice development strategy**.

A feature is not considered complete just because the UI exists.

Each feature should move through:

```text
Requirement
    ↓
Data Model
    ↓
Repository
    ↓
Service
    ↓
Authorization
    ↓
UI
    ↓
Audit
    ↓
Notifications
    ↓
Tests
```

Where applicable.

---

# Feature Completion Standard

A feature should be considered complete only when the required areas have been addressed:

- Business requirement
- Data model
- Validation
- Repository
- Business logic
- Authorization
- Access scope
- UI
- Loading state
- Empty state
- Error state
- Audit trail
- Notifications
- Tests
- Security considerations

Not every feature requires every cross-cutting capability, but each should be deliberately evaluated.

---

# Development Roadmap

## Phase 0 — Project Foundation

- Repository setup
- Next.js configuration
- TypeScript
- Tailwind
- shadcn/ui
- ESLint
- Prettier
- Environment configuration
- Docker
- CI foundation

## Phase 1 — Application Foundation

- Application shell
- Layout system
- Navigation
- Shared components
- Error handling
- Loading states
- Database connection
- Core server architecture

## Phase 2 — Design System & Application Shell

- Sidebar
- Top navigation
- Breadcrumbs
- Page headers
- Tables
- Forms
- Dialogs
- Dropdowns
- Status indicators
- Notifications
- Responsive layouts

## Phase 3 — Authentication & RBAC

- Login
- Sessions
- Password handling
- Users
- Roles
- Permissions
- Access scopes
- Authorization utilities

## Phase 4 — Sales Engine

- Leads
- Lead sources
- Lead assignment
- Qualification
- Activities
- Follow-ups
- Sales pipeline
- Lead details
- Lead conversion

## Phase 5 — Presales Engine

- Requirements
- Requirement analysis
- Proposals
- Quotations
- Approval workflow
- Negotiation
- Commercial tracking

## Phase 6 — Client Management

- Client profiles
- Contacts
- Client history
- Related leads
- Related projects
- Client activities

## Phase 7 — Project Delivery

- Projects
- Tasks
- Milestones
- Deliverables
- Assignments
- Project tracking
- Project activities

## Phase 8 — Workforce & Operations

- Employees
- Teams
- Responsibilities
- Operational tasks
- Expenses
- Approvals

## Phase 9 — Finance Visibility

- Invoices
- Payments
- Expenses
- Revenue
- Payment tracking

## Phase 10 — Management & Reporting

- Management dashboard
- Reports
- Analytics
- Sales performance
- Project performance
- Revenue visibility

## Phase 11 — Cross-Cutting Features

- Notifications
- Audit logs
- Search
- Activity history
- Shared workflows
- Common filters
- Common tables

## Phase 12 — Testing & Hardening

- Unit tests
- Integration tests
- E2E tests
- Security review
- Performance review
- Error handling
- Validation
- Authorization testing

## Phase 13 — Production Deployment

- Production configuration
- Docker image
- CI/CD
- Infrastructure
- Database configuration
- Monitoring
- Backups
- Deployment validation

---

# Future Roadmap

## V2 — Integrations & Automation

The second stage can introduce integrations with external business tools.

Potential integrations include:

- Google Workspace
- Microsoft 365
- Slack
- GitHub
- WhatsApp
- Zoom
- Email services
- Calendar services

Integrations will be isolated behind an integration layer rather than tightly coupling external services to business modules.

---

## V3 — Advanced Intelligence & Analytics

Future versions may introduce advanced capabilities such as:

- Sales intelligence
- Lead scoring
- Advanced analytics
- Business forecasting
- Proposal assistance
- Operational insights
- Automated recommendations

These capabilities are intentionally **not part of the initial V1 architecture**.

---

# SEO & Public Website

Webxode OS includes a public-facing marketing layer separate from the private business application.

Public routes include:

```text
/
 /features
 /pricing
 /about
 /contact
```

Private application routes are separated from the marketing experience.

SEO infrastructure includes:

- Metadata
- Sitemap
- Robots configuration
- Semantic page structure
- Search-engine-friendly public routes

The internal business application itself should not be treated as a public SEO surface.

---

# Environment Variables

Create a local `.env` file based on `.env.example`.

Example:

```env
NEXT_PUBLIC_APP_NAME=Webxode OS
NEXT_PUBLIC_APP_URL=http://localhost:3000

MONGODB_URI=
MONGODB_DB_NAME=webxode_os

AUTH_SECRET=

REDIS_URL=redis://localhost:6379
```

### Important

Never commit:

```text
.env
.env.local
.env.production
```

Secrets must be provided through the appropriate environment configuration.

---

# Local Development

## Prerequisites

Install:

- Node.js 22+
- npm
- MongoDB
- Redis
- Git

Docker can be used to run MongoDB and Redis locally.

---

## Clone the Repository

```bash
git clone <repository-url>

cd webxode-os
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment

Create:

```text
.env
```

using:

```text
.env.example
```

and provide the required configuration.

---

## Start Infrastructure

If using Docker:

```bash
docker compose up -d
```

This starts:

```text
MongoDB
Redis
```

---

## Start Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

# Available Scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production Build

```bash
npm run build
```

Creates the production build.

### Production Server

```bash
npm run start
```

Starts the production server.

### Lint

```bash
npm run lint
```

Runs ESLint.

### Type Check

```bash
npm run typecheck
```

Runs TypeScript validation without emitting files.

### Format

```bash
npm run format
```

Formats the project using Prettier.

### Format Check

```bash
npm run format:check
```

Checks formatting without modifying files.

---

# Quality Checks

Before pushing code, run:

```bash
npm run typecheck
npm run lint
npm run build
```

For feature development, tests should also be executed:

```bash
npm run test
```

and where applicable:

```bash
npm run test:e2e
```

> Test scripts should be kept synchronized with the project's actual `package.json` configuration.

---

# Docker

Webxode OS supports containerized deployment.

The application uses Next.js standalone output for production containers.

Build:

```bash
docker build -t webxode-os .
```

Run:

```bash
docker run -p 3000:3000 webxode-os
```

Local infrastructure can be started with:

```bash
docker compose up -d
```

---

# CI/CD

GitHub Actions is used for automated quality checks.

The CI pipeline is responsible for validating:

```text
Install
   ↓
Lint
   ↓
Type Check
   ↓
Build
```

The goal is to prevent broken code from reaching the main development/production branches.

Production deployment will be introduced as the infrastructure matures.

---

# Database Strategy

MongoDB is the primary database.

The application uses the **MongoDB Native Driver** rather than an ORM.

This keeps the data layer explicit and provides control over:

- Queries
- Indexes
- Aggregations
- Transactions
- Collection design
- Performance

Database access should remain behind repository/data-access boundaries.

Business logic should not directly perform database operations from UI components.

---

# Caching & Background Jobs

Redis is available for use cases that benefit from:

- Caching
- Rate limiting
- Temporary state
- Queue infrastructure

BullMQ can be used for:

- Background jobs
- Scheduled processing
- Notifications
- Heavy asynchronous operations

Redis and BullMQ should not be introduced into a workflow unless the requirement actually benefits from asynchronous processing.

---

# Auditability

Business-critical operations should be auditable.

Potential audit events include:

```text
Lead Created
Lead Assigned
Lead Updated
Quotation Created
Quotation Approved
Client Created
Project Created
Payment Recorded
Expense Approved
User Role Changed
Permission Changed
```

Audit records should provide enough context to understand:

```text
Who
What
When
Where
```

and, where appropriate:

```text
Previous Value
New Value
```

---

# Security Principles

Security is treated as a cross-cutting concern.

Core principles include:

- Server-side authorization
- Password hashing
- Secure session handling
- Permission checks
- Scope-based access
- Input validation
- Environment secret protection
- Audit logging
- Secure database access
- Least-privilege access
- No sensitive business logic in client-only code

Client-side permission checks may improve UX, but **server-side authorization remains authoritative**.

---

# Design Principles

Webxode OS follows these product principles:

### 1. Action over information

The system should help users act, not simply display data.

### 2. Simple workflows

Business processes should require as few unnecessary steps as possible.

### 3. Consistency

Similar operations should behave consistently throughout the application.

### 4. Clear ownership

Every actionable item should have a responsible owner wherever applicable.

### 5. Visibility

Management should be able to understand business performance without manually collecting information.

### 6. Auditability

Important changes should be traceable.

### 7. Scalability without overengineering

Build the architecture to evolve, but don't build complexity before it is needed.

---

# UX Philosophy

The core UX principle is:

> **Less data. Less clicking. More action.**

The interface should prioritize:

- Clear hierarchy
- Strong information architecture
- Fast navigation
- Actionable dashboards
- Useful defaults
- Minimal unnecessary forms
- Consistent components
- Responsive layouts
- Clear feedback
- Empty states
- Loading states
- Error recovery

The goal is a professional SaaS experience rather than an enterprise interface overloaded with unnecessary complexity.

---

# Development Rules

When implementing features:

### Do

- Keep business logic inside services/modules
- Keep database access inside repositories
- Validate inputs
- Check authorization server-side
- Reuse shared components
- Write meaningful types
- Add appropriate tests
- Keep modules isolated
- Prefer simple solutions
- Build vertical slices

### Avoid

- Business logic inside UI components
- Direct database access from pages
- Hard-coded permissions
- Unnecessary global state
- Unnecessary dependencies
- Premature microservices
- Premature abstractions
- Duplicate UI components
- Unnecessary API layers
- Overengineering

---

# Architecture Decisions

The following decisions are intentional.

| Decision              | Choice                                  |
| --------------------- | --------------------------------------- |
| Framework             | Next.js                                 |
| UI                    | React                                   |
| Language              | TypeScript                              |
| Styling               | Tailwind CSS                            |
| Components            | shadcn/ui                               |
| Design Style          | Nova                                    |
| Icons                 | Lucide                                  |
| Font                  | Geist                                   |
| Architecture          | Modular Monolith                        |
| Database              | MongoDB                                 |
| Database Driver       | MongoDB Native Driver                   |
| Authentication        | Custom server-side architecture         |
| Authorization         | RBAC + Permission + Scope               |
| Cache                 | Redis                                   |
| Jobs                  | BullMQ                                  |
| Containerization      | Docker                                  |
| CI/CD                 | GitHub Actions                          |
| Deployment            | AWS / Production infrastructure         |
| API                   | Next.js Server Actions + Route Handlers |
| Backend Framework     | Next.js                                 |
| ORM                   | None                                    |
| Microservices         | Not in V1                               |
| AI                    | Not in V1                               |
| External Integrations | V2                                      |

---

# Project Status

**Current Stage:** V1 Development

The project is being developed incrementally using a vertical-slice approach.

Current focus:

```text
Project Foundation
        ↓
Application Foundation
        ↓
Design System & Application Shell
        ↓
Authentication & RBAC
        ↓
Sales Engine
        ↓
Presales Engine
        ↓
Client Management
        ↓
Project Delivery
        ↓
Operations & Finance
        ↓
Management
        ↓
Testing & Production
```

---

# Future Scalability

The architecture is designed so that individual modules can evolve independently without immediately converting the entire application into microservices.

If future scale requires service extraction, modules such as:

```text
Sales
Notifications
Finance
Projects
Integrations
```

can be separated later.

Until that requirement exists, the modular monolith remains the preferred architecture.

---

# Ownership

**Webxode OS** is an internal product of:

### Webxode Technologies

**Design • Develop • Deliver**

---

# License

This project is proprietary software owned by **Webxode Technologies**.

Unauthorized copying, distribution, modification, or commercial use is prohibited unless explicitly permitted by Webxode Technologies.

---

# Final Principle

Webxode OS exists to make Webxode Technologies operate better.

It is not just a CRM.

It is not just a project management tool.

It is not just an internal dashboard.

It is intended to become:

> **The operating system for Webxode Technologies. ❤️ **

**Design • Develop • Deliver ✨ **
