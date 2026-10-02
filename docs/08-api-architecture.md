# Webxode OS — Application & API Architecture

**Product:** Webxode OS
**Company:** Webxode Technologies
**Document:** Application & API Architecture
**Version:** V1
**Architecture:** Next.js Modular Monolith
**Frontend:** React + TypeScript + Tailwind CSS + shadcn/ui
**Backend:** Next.js Server Architecture
**Database:** MongoDB
**Status:** Draft / Architecture Baseline

---

# 1. Purpose

This document defines how Webxode OS processes application requests and connects the user interface, authentication, authorization, business logic, data access, and MongoDB.

The architecture must support:

* Modular development
* Clear business boundaries
* Server-side authorization
* Reusable business logic
* Maintainability
* Testability
* Secure data access
* Fast development
* Future integrations
* Future AI capabilities

The goal is to build a **modular monolith**, not a collection of disconnected APIs.

---

# 2. Core Architecture

The primary application flow is:

```text id="qj7f3m"
User Interface
      ↓
Server Action / Route Handler
      ↓
Authentication
      ↓
Authorization
      ↓
Application / Use Case
      ↓
Business Service
      ↓
Repository / Data Access
      ↓
MongoDB
```

For read-heavy operations:

```text id="u7i9rc"
UI
 ↓
Server Action / Route Handler
 ↓
Auth
 ↓
Authorization
 ↓
Query / Data Access
 ↓
MongoDB
```

For complex business operations:

```text id="h8tw3p"
UI
 ↓
Server Action
 ↓
Authorization
 ↓
Service
 ↓
Business Rules
 ↓
Repository
 ↓
MongoDB
 ↓
Side Effects
```

---

# 3. Modular Monolith

Webxode OS will be implemented as a modular monolith.

This means:

* One application
* One primary deployment
* One primary MongoDB database
* Clearly separated internal modules
* Shared infrastructure where appropriate
* No unnecessary microservices

Conceptually:

```text id="3tqj0m"
                    Webxode OS
                        │
 ┌──────────────────────┼──────────────────────┐
 │                      │                      │
Foundation             Sales                Presales
 │                      │                      │
Clients              Projects             Workforce
 │                      │                      │
Operations            Finance             Management
 └──────────────────────┼──────────────────────┘
                        │
                 Shared Infrastructure
                        │
                    MongoDB
```

---

# 4. Application Layers

The application should maintain clear responsibilities.

### Layer 1 — Presentation

Responsible for:

* Pages
* Components
* Forms
* Tables
* Dashboards
* Client-side interaction

Should not contain core business rules.

### Layer 2 — Request / Application Boundary

Responsible for:

* Receiving requests
* Parsing input
* Authentication
* Authorization
* Calling application services
* Returning responses

Implemented through:

* Server Actions
* Route Handlers

### Layer 3 — Business / Service Layer

Responsible for:

* Business workflows
* Business rules
* State transitions
* Ownership rules
* Approval logic
* Cross-module operations

### Layer 4 — Data Access Layer

Responsible for:

* MongoDB queries
* Document creation
* Updates
* Aggregations
* Index-aware data access

### Layer 5 — Infrastructure

Responsible for:

* Database connection
* File storage
* Email
* External services
* Logging
* Background processing

---

# 5. Responsibility Boundary

A simple rule should be followed:

> **UI decides how to present. Services decide what the business allows. Repositories decide how data is stored.**

For example:

The UI should not decide:

```text id="i5a1r5"
"Can this quotation be approved?"
```

The service layer should decide that.

The repository should only perform the required database operation.

---

# 6. Next.js Application Architecture

Webxode OS will use Next.js as the primary application framework.

The application will use:

* React
* Server Components
* Client Components where interaction requires them
* Server Actions
* Route Handlers
* Server-side services
* Data-access/repository layer

The architecture should avoid introducing a separate backend application unless future requirements justify it.

---

# 7. Server Components

Server Components should be the default for server-rendered application screens.

They are suitable for:

* Dashboard data
* Detail pages
* Tables
* Read-heavy screens
* Server-side data fetching
* Permission-aware rendering

Server Components should call appropriate server-side application/data functions rather than exposing internal database logic to the browser.

---

# 8. Client Components

Client Components should be used where browser-side interaction is required.

Examples:

* Interactive forms
* Filters
* Search controls
* Modals
* Drag-and-drop
* Rich editors
* Real-time UI
* Complex client-side interactions

Client Components should not directly access MongoDB.

---

# 9. Server Actions

Server Actions should be used for appropriate application mutations.

Examples:

```text id="b5ks93"
createLead
updateLead
assignLead
createFollowUp
moveOpportunityStage
approveQuotation
createProject
assignTask
completeTask
approveExpense
```

A Server Action should:

```text id="5pjzqg"
Receive Input
    ↓
Authenticate
    ↓
Authorize
    ↓
Validate
    ↓
Call Service
    ↓
Return Result
```

Server Actions should remain thin.

---

# 10. Route Handlers

Route Handlers should be used where an HTTP endpoint is appropriate.

Examples:

* External API access
* Webhooks
* File upload endpoints
* Integration callbacks
* Public endpoints
* APIs required by external clients
* Future mobile applications

Example conceptual routes:

```text id="yk8h4u"
/api/webhooks/...
/api/files/...
/api/integrations/...
```

Internal application operations should not automatically become REST endpoints simply because an API can be created.

---

# 11. Server Action vs Route Handler

### Prefer Server Actions for:

* Internal UI mutations
* Form submissions
* Business operations initiated by Webxode OS users
* Server-side application actions

### Prefer Route Handlers for:

* Webhooks
* External integrations
* Public/API consumers
* External callbacks
* Cases requiring explicit HTTP endpoints

This keeps V1 simpler.

---

# 12. Application Service Layer

The service layer contains business use cases.

Examples:

```text id="x6r0z9"
LeadService
OpportunityService
RequirementService
ProposalService
QuotationService
ClientService
ProjectService
TaskService
PaymentService
ExpenseService
```

Services should orchestrate business operations.

Example:

```text id="v8l2q7"
approveQuotation()
```

may:

1. Verify quotation exists.
2. Verify current status.
3. Verify user permission.
4. Validate approval requirements.
5. Update quotation status.
6. Record approval history.
7. Create required notification.
8. Record audit information.

The UI should not implement these rules.

---

# 13. Repository / Data Access Layer

Repositories encapsulate database operations.

Examples:

```text id="f5l1cm"
LeadRepository
OpportunityRepository
QuotationRepository
ClientRepository
ProjectRepository
TaskRepository
PaymentRepository
```

A repository should answer questions such as:

```text id="1gq8g8"
findLeadById()
findLeads()
createLead()
updateLead()
```

It should not decide whether a user is allowed to approve a quotation.

That belongs to authorization/business logic.

---

# 14. Repository Responsibilities

Repositories are responsible for:

* MongoDB queries
* Inserts
* Updates
* Deletes where permitted
* Aggregations
* Pagination
* Sorting
* Filtering
* Data projections
* Database-specific implementation

Repositories should avoid business decisions.

---

# 15. Service vs Repository

The distinction is critical.

### Repository

```text id="ax2y6w"
"How do I get/update this data?"
```

### Service

```text id="9p1m4a"
"Is this operation valid, and what business actions should happen?"
```

Example:

```text id="d0m6f9"
QuotationRepository.updateStatus()
```

performs the database update.

While:

```text id="s9w3f2"
QuotationService.approveQuotation()
```

decides whether the approval is allowed and orchestrates the complete workflow.

---

# 16. Validation Architecture

Validation should happen before business logic executes.

Three categories should be distinguished.

### Input Validation

Checks whether the submitted data has the correct structure.

Examples:

* Required fields
* Email format
* Dates
* Numbers
* Enum values

### Business Validation

Checks whether the operation makes business sense.

Examples:

* Cannot approve an already cancelled quotation.
* Cannot move a lost opportunity directly to deployment.
* Cannot assign work to an inactive user.
* Cannot deploy a project that has required QA pending.

### Authorization

Checks whether the current user is allowed to perform the operation.

These are separate concerns.

---

# 17. Authorization Flow

Every protected server operation should follow:

```text id="w4g1o4"
Request
  ↓
Authenticated?
  ↓
Active User?
  ↓
Roles Loaded
  ↓
Permission Check
  ↓
Scope Check
  ↓
Record Access Check
  ↓
Business Rule Check
  ↓
Execute
```

Authorization must be enforced server-side.

Client-side hiding of buttons is not sufficient security.

---

# 18. Permission Model

The API/application layer will use the permission model defined in the Roles & Permissions architecture.

Examples:

```text id="6c6pp1"
leads.view
leads.create
leads.update
leads.assign

quotations.view
quotations.create
quotations.approve

projects.view
projects.update
projects.assign

expenses.approve
```

Permissions should be checked before sensitive operations.

---

# 19. Scope Enforcement

Permission alone may not be sufficient.

A user may have:

```text id="td2qjp"
projects.view
```

but only within:

```text id="w7l4gc"
OWN
ASSIGNED
TEAM
DEPARTMENT
GLOBAL
```

Therefore, the application must evaluate both:

```text id="5p6qcw"
Permission
+
Scope
```

before returning protected records.

---

# 20. Ownership-Aware Queries

Authorization should be reflected in database queries where appropriate.

Example:

```text id="1d4t8v"
Sales Executive
+
leads.view
+
OWN
```

should result in a query constrained to the user's owned leads.

The application should not:

1. Fetch every lead.
2. Send them to the application.
3. Filter unauthorized records afterward.

Access restrictions should be applied as early as practical.

---

# 21. Application Workflow Example — Lead Creation

Conceptually:

```text id="f6d1z5"
Create Lead Form
      ↓
Server Action
      ↓
Authenticate User
      ↓
Check leads.create
      ↓
Validate Input
      ↓
LeadService.createLead()
      ↓
Create Lead
      ↓
Assign Owner if applicable
      ↓
Create Audit Event
      ↓
Create Notification
      ↓
Return Result
```

---

# 22. Application Workflow Example — Lead Assignment

```text id="2m5k0j"
Assignment Request
      ↓
Authenticate
      ↓
Check leads.assign
      ↓
Validate Target User
      ↓
Validate Access
      ↓
Update Lead
      ↓
Record Assignment History
      ↓
Notify New Owner
      ↓
Audit
```

---

# 23. Application Workflow Example — Opportunity Won

A high-value business transition may involve multiple operations.

```text id="r8b8mx"
Mark Opportunity Won
        ↓
Authenticate
        ↓
Authorize
        ↓
Validate Opportunity State
        ↓
Validate Required Commercial Data
        ↓
Update Opportunity
        ↓
Create / Convert Client
        ↓
Create Onboarding Tasks
        ↓
Notify Responsible Users
        ↓
Audit
```

Where atomic consistency is required, an appropriate MongoDB transaction may be used.

---

# 24. Application Workflow Example — Quotation Approval

```text id="n6e4kl"
Approve Quotation
       ↓
Authentication
       ↓
Permission Check
       ↓
Scope Check
       ↓
Quotation State Validation
       ↓
Approval Rules
       ↓
Update Quotation
       ↓
Record Approval
       ↓
Audit
       ↓
Notify Sales Owner
```

Approval must never be implemented as a simple uncontrolled database status update.

---

# 25. Application Workflow Example — Task Completion

```text id="2bqj7d"
Complete Task
     ↓
Authenticate
     ↓
Permission / Ownership Check
     ↓
Validate Current Status
     ↓
Update Task
     ↓
Check Related Workflow
     ↓
Notify Relevant User
     ↓
Audit
```

Depending on the task, completion may trigger the next workflow stage.

---

# 26. Cross-Module Services

Some business operations span multiple modules.

Examples:

```text id="4s9z9w"
Convert Opportunity → Client
Create Project from Won Opportunity
Approve Quotation → Notify Sales
Complete QA → Enable Client Review
Payment Received → Update Project Finance Visibility
```

These operations should be handled through application/service orchestration rather than direct cross-module database manipulation from UI components.

---

# 27. Module Boundaries

Each module should expose controlled application operations.

Conceptually:

```text id="2f7tqp"
Foundation
 ├── Authentication
 ├── Users
 ├── Roles
 └── Permissions

Sales
 ├── Leads
 ├── Activities
 ├── Follow-Ups
 └── Opportunities

Presales
 ├── Requirements
 ├── Proposals
 ├── Quotations
 └── Negotiations

Clients
 ├── Clients
 ├── Contacts
 └── Documents

Projects
 ├── Projects
 ├── Milestones
 ├── Phases
 ├── Tasks
 ├── Deliverables
 └── Change Requests
```

Modules should not directly reach into another module's repositories without a deliberate boundary.

---

# 28. Shared Infrastructure

Cross-cutting infrastructure may include:

```text id="a5cz2v"
Authentication
Authorization
Validation
Database
Logging
Audit
Notifications
File Storage
Error Handling
Configuration
```

These should be reusable without becoming a giant miscellaneous utility layer.

---

# 29. Authentication Architecture

Authentication should establish the identity of the current user.

Conceptually:

```text id="b8r0n3"
Login
 ↓
Credential / OAuth Verification
 ↓
Session Creation
 ↓
Authenticated Request
 ↓
Current User
```

The authentication mechanism should be isolated from business modules.

The application should never trust user identity information supplied directly by the client.

---

# 30. Session and User Context

Protected server operations should be able to obtain a trusted user context containing information such as:

```text id="ps3qz4"
userId
accountType
roleIds
departmentId
teamIds
status
```

Additional authorization information may be loaded when required.

The server remains the source of truth.

---

# 31. Error Handling

The application should use consistent error categories.

Examples:

```text id="2v0y6o"
Validation Error
Authentication Error
Authorization Error
Not Found
Conflict
Business Rule Error
Database Error
External Service Error
Unexpected Error
```

The user should receive a useful safe message.

Sensitive internal details should not be exposed.

---

# 32. API / Action Response Model

Application operations should return predictable results.

Conceptually:

```text id="rj2q6m"
Success
{
    success
    data
    message
}
```

Error:

```text id="f7j4w8"
Failure
{
    success
    error
    code
    message
}
```

The exact TypeScript implementation will be finalized during development.

---

# 33. API Naming Principles

Where Route Handlers are required, naming should be resource-oriented.

Examples:

```text id="s0o5x7"
/api/leads
/api/leads/[id]
/api/projects
/api/projects/[id]
/api/quotations
/api/payments
```

Action-specific operations may use explicit action endpoints where appropriate:

```text id="d7e1q3"
/api/quotations/[id]/approve
/api/leads/[id]/assign
/api/opportunities/[id]/convert
```

The API design should remain consistent.

---

# 34. Avoid Generic CRUD-Only APIs

The application should not model every business operation as:

```text id="p4c7n2"
POST
GET
PUT
DELETE
```

without understanding business actions.

For example:

```text id="z8x5q1"
Approve Quotation
```

is a business operation, not merely:

```text id="9k2c1m"
Update quotation.status = approved
```

The service layer should own the transition.

---

# 35. Query Architecture

Read operations should support:

* Filtering
* Sorting
* Pagination
* Search
* Date ranges
* Status filters
* Ownership filters
* Department/team filters

Example conceptual query:

```text id="b9z2h4"
GET Leads
WHERE
status = QUALIFIED
AND ownerId = currentUser
ORDER BY createdAt DESC
```

Authorization constraints must be applied alongside business filters.

---

# 36. Mutation Architecture

Mutations should follow:

```text id="v5c6s8"
Input
 ↓
Authentication
 ↓
Authorization
 ↓
Validation
 ↓
Service
 ↓
Repository
 ↓
Database
 ↓
Side Effects
 ↓
Audit
```

Side effects may include:

* Notification
* Activity
* Assignment history
* Audit record
* Background job

---

# 37. Audit Architecture

Important mutations should generate audit information.

Examples:

```text id="w0x4o7"
Create
Update
Delete
Assign
Approve
Reject
Archive
Restore
Status Change
Permission Change
```

Audit creation should be centralized enough to remain consistent.

---

# 38. Notification Architecture

Notifications should be triggered by business events.

Examples:

```text id="8v3m2k"
Lead Assigned
Task Assigned
Quotation Approved
Approval Requested
Follow-Up Due
Payment Overdue
QA Failed
Client Review Required
```

The service layer may create notification records directly for simple V1 use cases.

More complex asynchronous notification processing can be introduced later.

---

# 39. Background Jobs

Not every operation needs synchronous execution.

Background processing may later handle:

* Email sending
* PDF generation
* Large imports
* Scheduled reminders
* Report generation
* File processing

V1 should introduce background processing only where it provides a clear benefit.

---

# 40. Internal Events

The architecture may use lightweight internal events for decoupling side effects.

Example:

```text id="1p8k7j"
QuotationApproved
      ↓
Notification Handler
Audit Handler
```

However, V1 should avoid building a complex event-driven platform.

Simple service orchestration is preferred where sufficient.

---

# 41. File Handling

Files should not be uploaded directly into MongoDB through arbitrary business logic.

The application should:

```text id="j2o4k8"
Request Upload
 ↓
Authorize
 ↓
Upload / Storage Process
 ↓
Store Metadata
 ↓
Associate File with Business Record
```

Storage implementation can evolve independently.

---

# 42. External Integrations

V1 should keep integrations outside the core business services where practical.

Future examples:

```text id="0f2s9n"
Google Workspace
Microsoft 365
Slack
GitHub
WhatsApp
Zoom
Payment Providers
```

The architecture should avoid embedding external-provider-specific logic throughout Sales, Projects, or Finance modules.

---

# 43. Webhooks

Future external integrations may communicate through Route Handlers.

Conceptual flow:

```text id="v4u0v7"
External Service
      ↓
Webhook Route
      ↓
Validate Signature
      ↓
Parse Event
      ↓
Application Service
      ↓
Update Business Record
      ↓
Audit
```

Webhook endpoints must never blindly trust incoming requests.

---

# 44. AI Integration Boundary

Future AI features should interact with the application through controlled services.

Example:

```text id="m4v6g3"
Business Data
      ↓
AI Service
      ↓
Analysis
      ↓
Recommendation
      ↓
Human Review / Workflow
```

AI should not directly modify critical business records without controlled business rules.

---

# 45. Caching

Caching should be introduced only where useful.

Potential candidates:

* Permission metadata
* User/session context
* Frequently accessed configuration
* Dashboard summaries where justified

The database remains the authoritative source.

V1 should avoid introducing a complex caching architecture before real performance requirements exist.

---

# 46. Security Principles

The application architecture must follow:

* Server-side authorization
* Input validation
* Secure session handling
* Least privilege
* No database access from client components
* No secrets in client-side code
* Safe error responses
* Auditability
* Secure file access
* Protected webhooks
* Controlled external integrations

---

# 47. Logging

Application logs should capture useful operational information.

Examples:

```text id="m9r8s1"
Request errors
Authentication failures
Authorization failures
Important business failures
External service failures
Database failures
Performance issues
```

Logs should not contain:

* Passwords
* Authentication tokens
* API secrets
* Sensitive client credentials
* Unnecessary personal information

---

# 48. Observability Boundary

V1 should provide enough visibility to troubleshoot:

```text id="q1t7k8"
Application errors
Database errors
Failed business operations
Authentication failures
Slow operations
Background job failures
```

Advanced distributed tracing is not required for the initial modular monolith.

---

# 49. Testing Architecture

Application services should be designed so business logic can be tested independently.

Testing layers may include:

### Unit Tests

For:

* Business rules
* State transitions
* Permission decisions
* Utility logic

### Integration Tests

For:

* Services + MongoDB
* Repositories
* Authentication/authorization
* Cross-module workflows

### End-to-End Tests

For:

* Login
* Lead lifecycle
* Sales workflow
* Quotation approval
* Client onboarding
* Project workflow
* Payment visibility

---

# 50. Application Folder Concept

The final implementation should maintain clear module boundaries.

Conceptually:

```text id="5s2kq1"
src/
├── app/
│   ├── (auth)/
│   ├── dashboard/
│   ├── leads/
│   ├── opportunities/
│   ├── presales/
│   ├── clients/
│   ├── projects/
│   ├── workforce/
│   ├── operations/
│   ├── finance/
│   └── management/
│
├── modules/
│   ├── foundation/
│   ├── sales/
│   ├── presales/
│   ├── clients/
│   ├── projects/
│   ├── workforce/
│   ├── operations/
│   ├── finance/
│   └── management/
│
├── components/
├── lib/
├── infrastructure/
└── types/
```

The exact folder structure may be refined during project initialization, but module ownership should remain clear.

---

# 51. Business Module Structure

A module may conceptually contain:

```text id="8x5d1q"
sales/
├── services/
├── repositories/
├── validations/
├── permissions/
├── types/
└── workflows/
```

The actual structure should remain pragmatic.

Not every module needs identical folders if doing so creates unnecessary complexity.

---

# 52. Dependency Rules

Preferred dependency direction:

```text id="k8q4s3"
UI
 ↓
Application Boundary
 ↓
Services
 ↓
Repositories
 ↓
Database
```

Avoid:

```text id="d9w1e5"
UI → MongoDB
UI → Repository
Repository → UI
Database → Business Module
```

Business logic should remain independent from presentation.

---

# 53. Cross-Module Dependency Rules

Modules may interact through controlled service/application interfaces.

Example:

```text id="n5v8q2"
Sales
  ↓
Client Conversion Service
  ↓
Clients
```

Avoid direct manipulation such as:

```text id="f2j7m8"
Sales UI
  ↓
Clients collection
```

This protects module boundaries.

---

# 54. Business Workflow Enforcement

The application layer is responsible for enforcing the workflow defined in:

**06 — Business Workflow**

Examples:

```text id="y0s6t1"
Lead
NEW → CONTACTED → QUALIFIED
```

```text id="n7m2x9"
Opportunity
QUALIFIED → PRESALES → PROPOSAL → QUOTATION → NEGOTIATION → WON
```

```text id="a6q4p2"
Project
PLANNING → DEVELOPMENT → QA → CLIENT REVIEW → DEPLOYMENT → HANDOVER
```

The service layer controls valid transitions.

---

# 55. Database Relationship Enforcement

The application layer must also enforce relationships defined in:

**07 — Database Architecture**

Examples:

```text id="d5f8j2"
Task → Project
Payment → Client / Project
Quotation → Opportunity
Project → Client
Opportunity → Lead
```

Invalid or missing references should be rejected safely.

---

# 56. Performance Principles

The application should:

* Fetch only required fields.
* Paginate large lists.
* Use appropriate indexes.
* Avoid repeated database queries.
* Avoid unnecessary document population.
* Avoid N+1 query patterns.
* Cache only where justified.
* Use aggregation when appropriate.
* Keep API responses focused.

Performance optimization should follow actual measurements.

---

# 57. Scalability Path

The initial architecture is:

```text id="g2p9k1"
Single Next.js Application
        +
MongoDB
```

As usage grows:

```text id="x8r4v5"
Load Balancer
      ↓
Multiple Next.js Instances
      ↓
MongoDB
```

Later, specific workloads may be extracted if required.

Examples:

* Notification processing
* File processing
* Reporting
* AI workloads
* Integration workers

The modular boundaries should make future extraction possible without prematurely building microservices.

---

# 58. V1 Architectural Boundary

V1 will **not** introduce:

* Microservices
* Separate backend service
* GraphQL unless a real requirement emerges
* Complex API gateway
* Kubernetes
* Distributed event bus
* CQRS
* Event sourcing
* Service mesh
* Complex workflow engine
* Dedicated search cluster

The goal is a strong modular monolith.

---

# 59. End-to-End Request Example

A typical request should look like:

```text id="v7q5m4"
User clicks "Approve Quotation"
             ↓
React UI
             ↓
Server Action
             ↓
Authentication
             ↓
Permission Check
             ↓
Scope Check
             ↓
Input Validation
             ↓
Quotation Service
             ↓
Business Rule Validation
             ↓
Quotation Repository
             ↓
MongoDB
             ↓
Approval History
             ↓
Audit Log
             ↓
Notification
             ↓
Response
             ↓
UI Updates
```

This is the standard architectural pattern for important Webxode OS operations.

---

# 60. Definition of Done

The Application/API Architecture is considered complete when:

* Next.js is established as the application platform.
* Modular monolith architecture is defined.
* Server Components are the default for server-rendered UI.
* Client Components are used only where interaction requires them.
* Server Actions are defined for internal mutations.
* Route Handlers are reserved for appropriate HTTP/API requirements.
* Authentication boundaries are defined.
* Authorization is server-side.
* Permission and scope checks are defined.
* Service-layer business logic is established.
* Repository/data-access responsibilities are defined.
* Cross-module boundaries are established.
* Validation responsibilities are separated.
* Error handling is standardized.
* Audit and notification responsibilities are defined.
* Background processing boundaries are identified.
* Integration boundaries are separated.
* AI integration boundaries are separated.
* Testing layers are defined.
* V1 avoids unnecessary distributed architecture.

---

# 61. Core Application Principle

> **Keep the UI simple, the application boundary thin, the business logic explicit, and the database access controlled.**

The Webxode OS application should therefore follow:

```text id="w3k8n2"
                    WEBXODE OS

                         UI
                          ↓
              Server Action / API
                          ↓
              Authentication / AuthZ
                          ↓
                     Services
                          ↓
                   Repositories
                          ↓
                      MongoDB

             ↙            ↓            ↘
          Audit       Notifications   Jobs
```

This architecture provides the foundation for building Webxode OS rapidly without sacrificing maintainability or future scalability.
