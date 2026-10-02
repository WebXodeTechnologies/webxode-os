# Webxode OS — Database Architecture

**Product:** Webxode OS
**Company:** Webxode Technologies
**Document:** Database Architecture
**Version:** V1
**Database:** MongoDB
**Architecture:** Modular Monolith
**Status:** Draft / Architecture Baseline

---

# 1. Purpose

This document defines the database architecture for Webxode OS.

The database must support the complete business lifecycle:

```text
Lead
 ↓
Opportunity
 ↓
Requirement
 ↓
Presales
 ↓
Proposal
 ↓
Quotation
 ↓
Negotiation
 ↓
Client
 ↓
Project
 ↓
Tasks / Delivery
 ↓
Payment
 ↓
Support
 ↓
Renewal / Upsell
```

The database design must also support:

* RBAC
* Ownership
* Assignment
* Departments
* Teams
* Approvals
* Notifications
* Auditability
* Business history
* Reporting
* Search
* Future integrations
* Future AI capabilities

The goal is a **clean, maintainable MongoDB architecture**, not an over-engineered enterprise database.

---

# 2. Database Philosophy

Webxode OS will use MongoDB as the primary application database.

The database should follow these principles:

1. Model around business workflows.
2. Keep module boundaries clear.
3. Reference entities that have independent lifecycles.
4. Embed small, tightly coupled data where appropriate.
5. Avoid giant documents.
6. Avoid unnecessary duplication.
7. Optimize for real application access patterns.
8. Preserve business history.
9. Enforce important uniqueness at the database level.
10. Keep authorization information available for efficient access checks.
11. Design indexes intentionally.
12. Keep V1 simple enough to evolve.

---

# 3. Database Architecture

The conceptual architecture is:

```text
Next.js Application
        ↓
Application / Service Layer
        ↓
Data Access Layer
        ↓
MongoDB
```

Business modules should access their own data through controlled data-access logic rather than allowing arbitrary database operations throughout the application.

---

# 4. MongoDB Design Approach

MongoDB does not require a traditional relational schema.

However, Webxode OS still requires strong data modeling discipline.

The system will use a hybrid approach:

### Reference

Use references when:

* The related entity has its own lifecycle.
* The entity is reused in multiple places.
* The entity can grow significantly.
* The entity requires independent permissions.
* The entity is frequently updated independently.

Examples:

```text
Lead → User
Opportunity → Lead
Project → Client
Task → User
Project → Milestone
```

### Embed

Use embedded data when:

* The data is small.
* It belongs only to the parent.
* It is usually read with the parent.
* It does not require an independent lifecycle.

Examples:

```text
Client Contact Information
Quotation Line Items
Address Information
Small configuration objects
```

The decision should be based on access patterns rather than blindly following relational database conventions.

---

# 5. Collection Naming Convention

Collections should use clear plural names.

Examples:

```text
users
roles
permissions
departments
teams

leads
leadActivities
followUps
opportunities

requirements
proposals
quotations
negotiations

clients
clientContacts
clientDocuments

projects
milestones
phases
tasks
deliverables
changeRequests

employees
attendance
leaveRequests

meetings
tickets
notifications

payments
expenses

auditLogs
```

Collection names should remain consistent across the application.

---

# 6. Common Document Fields

Major business documents should follow a common metadata pattern.

Conceptually:

```text
_id
businessId
createdAt
updatedAt
createdBy
updatedBy
status
```

Where applicable:

```text
ownerId
assignedTo
departmentId
teamId
archivedAt
```

The exact implementation can vary by collection.

---

# 7. MongoDB Identifier

MongoDB's native `_id` will remain the primary internal identifier.

The system may additionally maintain human-readable business IDs.

Examples:

```text
LEAD-000123
OPP-000042
QT-000087
CL-000021
PRJ-000014
TASK-000921
```

Business IDs should be useful for:

* Human communication
* Search
* Documents
* Quotations
* Reports
* Support
* Client communication

Internal relationships should use stable database identifiers.

---

# 8. Foundation Collections

The Foundation module provides identity and authorization.

```text
users
roles
permissions
departments
teams
```

---

# 9. Users

The `users` collection represents application accounts.

Conceptual information:

```text
_id
name
email
phone
password / authentication metadata
accountType
roleIds
departmentId
teamIds
status
lastLoginAt
createdAt
updatedAt
createdBy
updatedBy
```

### Account Types

```text
ADMIN
USER
```

Business responsibilities are handled through roles rather than account type.

---

# 10. Roles

The `roles` collection defines business roles.

Examples:

```text
Management
Sales Executive
Sales Manager
Presales Executive
Project Manager
Developer
Designer
QA
Finance
Operations
```

Conceptual fields:

```text
_id
name
description
permissionIds
scope configuration
status
createdAt
updatedAt
createdBy
updatedBy
```

Roles should be configurable rather than hard-coded wherever practical.

---

# 11. Permissions

The `permissions` collection contains action-oriented permissions.

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
expenses.approve
```

Permissions should remain independent from users and roles.

---

# 12. Departments

Departments represent organizational units.

Examples:

```text
Sales
Presales
Development
Design
QA
Finance
Operations
Management
```

Conceptual fields:

```text
_id
name
description
managerId
status
createdAt
updatedAt
```

---

# 13. Teams

Teams allow operational grouping within departments.

Examples:

```text
Development Team A
Design Team
QA Team
Sales Team
```

Conceptual fields:

```text
_id
name
departmentId
managerId
memberIds
status
createdAt
updatedAt
```

Large or frequently changing membership data may instead use separate membership records if required later.

---

# 14. Sales Collections

The Sales module contains:

```text
leads
leadActivities
followUps
opportunities
```

---

# 15. Leads

A lead represents a potential business relationship before becoming an active opportunity/client.

Conceptual fields:

```text
_id
businessId

name
companyName
email
phone
location

source
status

ownerId
assignedTo
departmentId
teamId

qualification
nextActionAt

createdAt
updatedAt
createdBy
updatedBy
```

Lead qualification information should be structured where it needs reporting.

---

# 16. Lead Activities

Activities represent interactions or events related to a lead.

Examples:

* Call
* Email
* WhatsApp
* Meeting
* Note
* Requirement discussion

Conceptual fields:

```text
_id
leadId
type
subject
description
performedBy
performedAt
metadata
createdAt
updatedAt
```

Activities should not be embedded indefinitely inside a lead document because the activity history may grow significantly.

---

# 17. Follow-Ups

Follow-ups represent actionable future work.

Conceptual fields:

```text
_id
leadId
opportunityId
clientId
projectId

type
title
description

assignedTo
dueAt
status
priority

completedAt
completedBy

createdAt
updatedAt
```

A follow-up should be associated with the relevant business context.

---

# 18. Opportunities

An opportunity represents a qualified commercial opportunity.

Conceptual fields:

```text
_id
businessId

leadId
clientId

title
description

stage
status
estimatedValue

ownerId
assignedTo
departmentId
teamId

expectedCloseDate

createdAt
updatedAt
createdBy
updatedBy
```

The opportunity remains the central commercial record until it becomes won or lost.

---

# 19. Opportunity History

Important stage transitions should be preserved.

Conceptually:

```text
opportunityId
fromStage
toStage
changedBy
changedAt
reason
```

This may be implemented through a dedicated history collection or through a generalized business history mechanism depending on implementation decisions.

The design must preserve meaningful stage progression.

---

# 20. Presales Collections

Presales contains:

```text
requirements
proposals
quotations
negotiations
```

---

# 21. Requirements

Requirements capture the client's business and solution requirements.

Conceptual fields:

```text
_id
businessId

leadId
opportunityId
clientId

title
description
objectives
scope
functionalRequirements
technicalRequirements
constraints
assumptions

ownerId
status

createdAt
updatedAt
createdBy
updatedBy
```

Large requirement content should not be unnecessarily duplicated across proposals and projects.

---

# 22. Proposals

A proposal represents a proposed solution.

Conceptual fields:

```text
_id
businessId

opportunityId
requirementId
clientId

version
title
summary
scope
deliverables
assumptions
timeline
commercialSummary

status

ownerId
createdAt
updatedAt
createdBy
updatedBy
```

Proposal versions should remain traceable.

---

# 23. Quotations

Quotations contain commercial pricing information.

Conceptual structure:

```text
_id
businessId

opportunityId
proposalId
clientId

quotationNumber
version

items
subtotal
discount
tax
total

paymentTerms
validUntil

status

createdBy
approvedBy
approvedAt

createdAt
updatedAt
```

Quotation line items are suitable candidates for embedding because they belong directly to the quotation.

---

# 24. Negotiations

Negotiations track important commercial discussions.

Conceptual fields:

```text
_id
opportunityId
quotationId

subject
notes
requestedChanges

previousValue
proposedValue

status

handledBy
createdAt
updatedAt
```

Important commercial revisions should remain traceable.

---

# 25. Client Collections

Client-related collections:

```text
clients
clientContacts
clientDocuments
```

---

# 26. Clients

A client represents an established business relationship.

Conceptual fields:

```text
_id
businessId

name
companyName
email
phone
website

address

status
clientType

accountOwnerId

sourceOpportunityId

createdAt
updatedAt
createdBy
updatedBy
```

A client should not contain all project history inside one document.

Projects remain independent collections referencing the client.

---

# 27. Client Contacts

A client may have multiple contacts.

Conceptual fields:

```text
_id
clientId

name
designation
email
phone

isPrimary
status

createdAt
updatedAt
```

Contacts have their own lifecycle and therefore should normally remain separate from the client document.

---

# 28. Client Documents

Client-related documents may include:

* Agreements
* SOW
* Contracts
* Requirements
* Other business documents

Conceptual metadata:

```text
_id
clientId
projectId
type
name
fileReference
version
uploadedBy
uploadedAt
status
```

Actual files should use dedicated file/object storage rather than MongoDB documents unless there is a specific reason to store them there.

---

# 29. Project Collections

Project management contains:

```text
projects
milestones
phases
tasks
deliverables
changeRequests
```

---

# 30. Projects

A project represents an active delivery engagement.

Conceptual fields:

```text
_id
businessId

projectCode
name
description

clientId
sourceOpportunityId
sourceQuotationId

projectManagerId

status
priority

startDate
targetEndDate
actualEndDate

projectValue

departmentId
teamId

createdAt
updatedAt
createdBy
updatedBy
```

The project should reference commercial records rather than duplicate their entire content.

---

# 31. Milestones

Milestones represent major project checkpoints.

Conceptual fields:

```text
_id
projectId

name
description
sequence

status

plannedStartDate
plannedEndDate
completedAt

ownerId

createdAt
updatedAt
```

---

# 32. Phases

Phases represent major delivery stages.

Typical phases:

```text
Requirements
UI/UX
Development
Testing
Client Review
Deployment
Handover
```

Conceptual fields:

```text
_id
projectId
milestoneId

name
sequence
status

startDate
dueDate
completedAt

ownerId

createdAt
updatedAt
```

---

# 33. Tasks

Tasks represent executable work.

Conceptual fields:

```text
_id
businessId

projectId
milestoneId
phaseId

title
description

status
priority

assigneeId
reporterId

dueDate

estimatedHours
actualHours

blockedReason

createdAt
updatedAt
createdBy
updatedBy
```

Tasks should remain independent documents because they can grow, change frequently, and require separate filtering, assignment, and reporting.

---

# 34. Deliverables

Deliverables represent expected project outputs.

Examples:

* Website
* Mobile application
* Design package
* Documentation
* Deployment
* Training

Conceptual fields:

```text
_id
projectId
milestoneId

name
description
status

dueDate
completedAt

ownerId

createdAt
updatedAt
```

---

# 35. Change Requests

Change requests represent scope changes.

Conceptual fields:

```text
_id
businessId

projectId
clientId

title
description

impact
estimatedHours
estimatedCost
timelineImpact

status

requestedBy
reviewedBy
approvedBy

createdAt
updatedAt
```

A change request should preserve the relationship between the client request, impact analysis, approval, and resulting work.

---

# 36. Workforce Collections

Workforce includes:

```text
employees
attendance
leaveRequests
```

---

# 37. Employees

An employee may be linked to an application user.

Conceptual fields:

```text
_id
userId

employeeCode
designation
departmentId
teamId

joiningDate
employmentStatus

managerId

createdAt
updatedAt
```

User authentication and employee/business information should remain conceptually separate.

---

# 38. Attendance

Attendance represents employee work presence.

Conceptual fields:

```text
_id
employeeId

date
checkIn
checkOut

status

createdAt
updatedAt
```

Attendance should be indexed by employee and date.

---

# 39. Leave Requests

Conceptual fields:

```text
_id
employeeId

leaveType
startDate
endDate
reason

status

approverId
approvedAt
rejectionReason

createdAt
updatedAt
```

---

# 40. Operations Collections

Operations includes:

```text
meetings
tickets
notifications
```

---

# 41. Meetings

Conceptual fields:

```text
_id

title
description

relatedEntityType
relatedEntityId

participants
scheduledStart
scheduledEnd

location / meetingLink

status

createdBy
createdAt
updatedAt
```

The relationship to leads, clients, projects, or internal operations should be explicit.

---

# 42. Tickets

Tickets represent internal or operational issues.

Conceptual fields:

```text
_id
businessId

title
description

category
priority
status

createdBy
assignedTo

relatedEntityType
relatedEntityId

resolvedAt
closedAt

createdAt
updatedAt
```

---

# 43. Notifications

Notifications should be lightweight and action-oriented.

Conceptual fields:

```text
_id
recipientId

type
title
message

entityType
entityId

priority
readAt

createdAt
```

Notifications should not become the permanent source of truth for business events.

The underlying business record remains authoritative.

---

# 44. Finance Collections

V1 Finance contains:

```text
payments
expenses
```

Webxode OS is not intended to replace InvoNext.

---

# 45. Payments

Payments provide operational visibility.

Conceptual fields:

```text
_id
businessId

clientId
projectId

referenceNumber

amount
currency

paymentDate
dueDate

status
paymentMethod

sourceReference

createdAt
updatedAt
createdBy
updatedBy
```

Payment records should support:

* Expected
* Due
* Partially Paid
* Paid
* Overdue
* Cancelled

---

# 46. Expenses

Conceptual fields:

```text
_id
businessId

employeeId
projectId

category
description
amount
currency

expenseDate

receiptReference

status

submittedBy
approvedBy
approvedAt

paidAt

createdAt
updatedAt
```

Expenses may optionally reference a project for operational profitability visibility.

---

# 47. Audit Logs

Audit logs are critical for Webxode OS.

Conceptual fields:

```text
_id

actorId

action

entityType
entityId

before
after

metadata

ipAddress
userAgent

createdAt
```

Examples:

```text
Lead assigned
Quotation approved
Project status changed
Expense approved
Role permission changed
Client updated
```

Audit records should be treated as append-oriented and should not normally be edited or deleted through standard application workflows.

---

# 48. Business History

Not every historical event needs to become a full audit snapshot.

The system should distinguish between:

### Audit Log

Security/accountability event.

Example:

```text
User changed quotation total.
```

### Workflow History

Business state transition.

Example:

```text
Proposal → Quotation
```

### Activity

Business interaction.

Example:

```text
Sales call with client.
```

These should remain conceptually separate even if some implementation infrastructure is shared.

---

# 49. Ownership Model

Major business collections should support ownership where relevant.

Examples:

```text
Lead → ownerId
Opportunity → ownerId
Requirement → ownerId
Proposal → ownerId
Client → accountOwnerId
Project → projectManagerId
Task → assigneeId
Ticket → assignedTo
```

Ownership is required for:

* Accountability
* Permission scopes
* Work queues
* Reporting
* Notifications
* Management visibility

---

# 50. Assignment History

Changing ownership should not erase previous assignments.

The system should preserve:

```text
entityId
previousOwner
newOwner
changedBy
changedAt
reason
```

This may later be implemented using a generalized assignment-history mechanism.

---

# 51. Department and Team Relationships

Where organizational access matters, records may contain:

```text
departmentId
teamId
```

This supports scopes such as:

```text
OWN
ASSIGNED
TEAM
DEPARTMENT
GLOBAL
```

Not every collection needs both fields.

They should exist where they support actual authorization or reporting requirements.

---

# 52. Soft Delete and Archiving

Business records should generally not be physically deleted when historical information matters.

Instead, use controlled states such as:

```text
ACTIVE
INACTIVE
ARCHIVED
CANCELLED
```

Where appropriate:

```text
archivedAt
archivedBy
```

Hard deletion should be restricted to records where permanent removal is genuinely safe and authorized.

---

# 53. Status Design

Statuses should represent meaningful business states.

Avoid creating dozens of statuses that merely describe minor UI conditions.

For example, a lead may use:

```text
NEW
CONTACTED
QUALIFIED
REQUIREMENT
MEETING
PRESALES
PROPOSAL
QUOTATION
NEGOTIATION
WON
LOST
```

Status names should be controlled and consistent.

---

# 54. State Transition Rules

Changing a status should happen through business logic rather than arbitrary database updates.

Example:

```text
Quotation
Draft
  ↓
Approval
  ↓
Approved
  ↓
Sent
  ↓
Negotiation
  ↓
Accepted
```

The service layer should validate whether the requested transition is permitted.

---

# 55. Referential Integrity

MongoDB does not provide the same foreign-key enforcement model as a relational database.

Therefore, Webxode OS must enforce important relationships at the application layer.

Examples:

Before assigning a task:

```text
Does the user exist?
Is the user active?
Does the user have appropriate access?
```

Before creating a project:

```text
Does the client exist?
Is the commercial process sufficiently confirmed?
```

Before recording a payment:

```text
Does the related client/project exist?
```

---

# 56. Unique Constraints

Important business uniqueness rules should be enforced using MongoDB unique indexes where appropriate.

Examples:

```text
User email
Employee code
Business ID
Quotation number
Project code
```

Uniqueness must be designed based on actual business rules.

For example, quotation numbering may require a unique global sequence or another defined numbering strategy.

---

# 57. Indexing Strategy

Indexes should be based on actual query patterns.

Likely indexes include:

### Users

```text
email
status
departmentId
```

### Leads

```text
businessId
ownerId
status
source
createdAt
```

### Follow-Ups

```text
assignedTo + status + dueAt
```

### Opportunities

```text
ownerId
stage
status
expectedCloseDate
```

### Clients

```text
name
status
accountOwnerId
```

### Projects

```text
clientId
projectManagerId
status
targetEndDate
```

### Tasks

```text
projectId
assigneeId
status
dueDate
```

### Payments

```text
clientId
projectId
status
dueDate
```

### Notifications

```text
recipientId
readAt
createdAt
```

### Audit Logs

```text
actorId
entityType + entityId
createdAt
```

Indexes should be added intentionally rather than indexing every field.

---

# 58. Compound Indexes

Compound indexes should reflect common filtering and sorting patterns.

Example:

```text
assignedTo + status + dueDate
```

supports a common work-queue query:

```text
Show my open tasks ordered by due date.
```

Another example:

```text
ownerId + status + createdAt
```

supports sales pipeline views.

Index design should be validated against actual application queries.

---

# 59. Pagination

Large collections must not be loaded entirely into memory.

Lists such as:

* Leads
* Tasks
* Projects
* Activities
* Audit logs
* Payments
* Notifications

must use pagination.

The application should support:

* Page-based pagination where appropriate
* Cursor-based pagination where scale requires it
* Filtering
* Sorting
* Search

---

# 60. Search Strategy

V1 search should primarily use MongoDB-supported queries and appropriately indexed fields.

Global search may cover:

```text
Leads
Clients
Projects
Tasks
Quotations
```

Advanced search infrastructure is not required for V1.

A dedicated search engine may be considered later if business volume requires it.

---

# 61. Embedded Data Strategy

Good candidates for embedding:

```text
Quotation line items
Small address objects
Small configuration objects
Simple structured contact details
```

Poor candidates for embedding:

```text
Tasks
Large activity histories
Audit logs
Notifications
Projects inside clients
All client contacts inside clients
All tasks inside projects
```

The objective is to prevent documents from becoming excessively large or frequently rewritten.

---

# 62. Document Size Discipline

MongoDB has a maximum BSON document size.

Webxode OS should avoid approaching that limit by design.

Potentially growing data must remain separate:

* Activities
* Tasks
* Audit logs
* Notifications
* Documents
* History
* Comments

---

# 63. Transactions

MongoDB transactions should be used only where multiple related writes need atomic consistency.

Examples may include:

```text
Opportunity Won
→ Client conversion
→ Required related record creation
```

or controlled multi-document operations.

Transactions should not be used for every normal CRUD operation.

The application should prefer simple operations where atomic multi-document consistency is not required.

---

# 64. Data Validation

Validation should exist at multiple levels.

### Application Validation

Validates business rules.

Examples:

* Required fields
* Allowed state transitions
* Permission checks
* Date rules
* Approval requirements

### Database-Level Constraints

Used where MongoDB supports them effectively.

Examples:

* Unique indexes
* Required structural constraints where applicable

The database should not be relied upon as the only source of business validation.

---

# 65. Monetary Data

Financial amounts must be handled carefully.

The architecture should avoid floating-point calculations for monetary values.

The implementation should use a precise representation suitable for currency calculations and apply consistent rounding rules.

Financial records should include:

```text
amount
currency
```

Where required, additional fields may capture:

```text
subtotal
discount
tax
total
```

The exact monetary implementation will be finalized during schema/API implementation.

---

# 66. Dates and Time

Business timestamps should be stored consistently.

Examples:

```text
createdAt
updatedAt
dueAt
startDate
endDate
completedAt
```

The application should store timestamps in a consistent timezone strategy and convert them for user-facing display.

Date-only business values such as leave dates may require separate handling from exact timestamps.

---

# 67. File Storage

MongoDB should primarily store file metadata and references.

Example:

```text
fileName
storageKey
mimeType
size
uploadedBy
uploadedAt
```

Actual files should be stored in an appropriate object/file storage system.

V1 should keep the storage abstraction separate from business records.

---

# 68. Security-Sensitive Data

The database must not become a general-purpose password or credential vault.

Sensitive information such as:

* Production credentials
* API secrets
* Private keys
* Client passwords
* Infrastructure credentials

should use an appropriate secrets-management approach.

Business records should store references or controlled metadata where necessary.

---

# 69. Data Access by Module

The conceptual ownership is:

```text
Foundation
→ users, roles, permissions, departments, teams

Sales
→ leads, leadActivities, followUps, opportunities

Presales
→ requirements, proposals, quotations, negotiations

Clients
→ clients, clientContacts, clientDocuments

Projects
→ projects, milestones, phases, tasks, deliverables, changeRequests

Workforce
→ employees, attendance, leaveRequests

Operations
→ meetings, tickets, notifications

Finance
→ payments, expenses

Cross-Cutting
→ auditLogs
```

Modules should avoid directly manipulating another module's internal data structures unless a defined application/service boundary allows it.

---

# 70. Cross-Module References

The major relationships are:

```text
Lead
 └── Opportunity
       ├── Requirement
       ├── Proposal
       ├── Quotation
       └── Negotiation
              ↓
            Client
              ↓
            Project
              ├── Milestones
              ├── Phases
              ├── Tasks
              ├── Deliverables
              └── Change Requests
              ↓
           Payments
```

This relationship model should remain traceable throughout the business lifecycle.

---

# 71. Historical Data Strategy

Important historical information should remain available after a record changes state.

Examples:

```text
Lead owner history
Opportunity stage history
Quotation revisions
Approval decisions
Project status history
Task assignment history
Payment history
Audit history
```

History should not depend solely on the current document state.

---

# 72. Reporting Data

V1 reporting should primarily derive from operational collections.

Examples:

### Sales

```text
leads
opportunities
quotations
```

### Delivery

```text
projects
tasks
milestones
```

### Finance

```text
payments
expenses
```

### Workforce

```text
attendance
leaveRequests
```

A separate data warehouse is not required for V1.

If reporting becomes significantly more complex later, an analytics architecture can be introduced without redesigning the operational database.

---

# 73. Performance Strategy

Database performance should prioritize:

* Correct indexes
* Small predictable queries
* Pagination
* Projection of required fields
* Avoiding unnecessary population/joins
* Avoiding giant documents
* Efficient filtering
* Controlled aggregation

Performance optimization should be driven by measured application behavior rather than premature optimization.

---

# 74. Backup and Recovery

Production MongoDB must have:

* Automated backups
* Recovery procedures
* Backup retention
* Restore testing
* Monitoring

The backup strategy should be documented before production launch.

---

# 75. Environment Separation

The application should maintain separate databases/environments for:

```text
Development
Staging
Production
```

Production data must never be casually used in development.

Test data should be isolated.

---

# 76. Database Migration Strategy

Although MongoDB is schema-flexible, schema changes must still be controlled.

Changes such as:

* Renaming fields
* Changing status values
* Introducing required fields
* Restructuring embedded objects
* Changing relationships

must have a documented migration strategy.

Schema flexibility should not become schema chaos.

---

# 77. Future Integration Support

V2 integrations may require metadata such as:

```text
externalSystem
externalId
syncStatus
lastSyncedAt
```

However, integration-specific fields should not be added throughout every collection prematurely.

A dedicated integration layer should be introduced when integrations are actually implemented.

---

# 78. Future AI Support

V3 AI capabilities may require additional data such as:

* AI analysis results
* Recommendations
* Scoring
* Generated summaries
* Prediction metadata

These should be designed as an extension to the operational system.

AI-generated information should not silently overwrite authoritative business data.

---

# 79. V1 Database Boundary

V1 should use:

```text
MongoDB
+
Well-defined collections
+
Indexes
+
Application validation
+
Service-layer business rules
+
Audit history
```

V1 should not introduce:

* Database-per-module
* Database-per-client
* Microservice databases
* Data warehouse
* Search cluster
* Event-sourcing architecture
* Complex CQRS
* Graph database
* AI vector infrastructure
* Distributed transaction architecture

unless an actual requirement emerges.

---

# 80. Database Architecture Summary

The Webxode OS database should provide a clean operational foundation for the business.

The core structure is:

```text
FOUNDATION
Users
Roles
Permissions
Departments
Teams

        ↓

SALES
Leads
Activities
Follow-Ups
Opportunities

        ↓

PRESALES
Requirements
Proposals
Quotations
Negotiations

        ↓

CLIENTS
Clients
Contacts
Documents

        ↓

PROJECTS
Projects
Milestones
Phases
Tasks
Deliverables
Change Requests

        ↓

WORKFORCE
Employees
Attendance
Leave

        ↓

OPERATIONS
Meetings
Tickets
Notifications

        ↓

FINANCE
Payments
Expenses

        ↓

CROSS-CUTTING
Audit Logs
History
Ownership
Assignments
```

---

# 81. Definition of Done

The database architecture is considered complete when:

* MongoDB is confirmed as the primary database.
* Core collections are identified.
* Module ownership is defined.
* Major relationships are documented.
* Reference vs embed strategy is established.
* Ownership and assignment are represented.
* Workflow history is supported.
* Auditability is supported.
* Indexing strategy is defined.
* Pagination requirements are defined.
* Soft-delete/archive behavior is defined.
* Validation responsibilities are clear.
* Financial data handling is defined.
* File storage responsibilities are separated.
* Security-sensitive data handling is defined.
* V1 database boundaries are clear.
* Future integration and AI extensions have clear boundaries.

---

# 82. Core Database Principle

> **The database should represent the business clearly, preserve its history, and make the workflow reliable — without becoming more complicated than the business itself.**
