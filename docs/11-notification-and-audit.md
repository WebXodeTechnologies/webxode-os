# WEBXODE OS

## NOTIFICATIONS & AUDIT ARCHITECTURE

**Document:** 11 — Notifications & Audit Architecture
**Product:** Webxode OS
**Company:** Webxode Technologies
**Architecture:** Modular Monolith
**Application:** Next.js • React • TypeScript
**Database:** MongoDB
**UI:** Tailwind CSS • shadcn/ui
**Status:** Architecture Definition

---

# 1. Purpose

This document defines the architecture for two cross-cutting capabilities of Webxode OS:

1. **Notifications**
2. **Audit Logging**

These capabilities support the entire business operating system.

Notifications help users understand:

> **What needs my attention?**

Audit logs help the organization understand:

> **What happened, who did it, and when?**

Together they provide operational awareness and accountability.

---

# 2. Core Principle

Notifications are for **action**.

Audit logs are for **history and accountability**.

They must not be treated as the same thing.

```text
Business Event
      │
      ├──────────────► Notification
      │                "You have a quotation to approve."
      │
      └──────────────► Audit Log
                       "Quotation QT-000124 was submitted
                        for approval by User X."
```

A single business action may therefore create both.

---

# 3. Objectives

The notification architecture should:

* surface important work
* reduce missed follow-ups
* support approvals
* notify users of assignments
* highlight deadlines
* avoid notification overload
* provide contextual navigation
* support future channels

The audit architecture should:

* preserve important business history
* provide accountability
* support security investigations
* support operational troubleshooting
* record sensitive actions
* provide change visibility
* preserve historical integrity

---

# 4. Architecture Position

Notifications and audit logging belong to the **shared platform layer**.

```text
Sales ──────────────┐
Presales ───────────┤
Clients ────────────┤
Projects ───────────┤
Workforce ──────────┼──► Shared Platform
Operations ─────────┤       │
Finance ────────────┤       ├── Notifications
Management ─────────┘       └── Audit
```

Business modules generate events.

The shared platform determines:

* whether an audit record is required
* whether a notification is required
* who should receive it
* what information should be shown
* what action the user can take

---

# 5. Notification Philosophy

Webxode OS should not notify users about everything that happens.

The system should notify users when an event is:

* actionable
* important
* assigned to them
* approaching a deadline
* blocking work
* requiring approval
* relevant to their responsibility

### Core Principle

> **Notify when action or awareness is valuable, not merely because something changed.**

---

# 6. Notification Categories

Notifications should be categorized by business purpose.

## 6.1 Assignment

Examples:

* lead assigned
* task assigned
* project assigned
* QA item assigned
* expense review assigned

---

## 6.2 Action Required

Examples:

* follow-up due
* quotation approval required
* client review required
* task overdue
* change request awaiting decision

---

## 6.3 Workflow Update

Examples:

* quotation approved
* lead moved to negotiation
* project entered QA
* client approved deliverable

---

## 6.4 Deadline

Examples:

* follow-up due today
* task due tomorrow
* milestone approaching
* quotation expiring

---

## 6.5 Business Event

Examples:

* payment received
* project completed
* new client created
* opportunity won

Business events should only generate notifications when they are relevant to the recipient.

---

# 7. Notification Priority

Notifications should have a priority model.

### Low

Informational events.

### Normal

Routine business activity.

### High

Action required soon.

### Critical

Important events that may significantly affect operations.

The application should avoid using critical priority excessively.

---

# 8. Notification Object

Conceptually, a notification contains:

```text id="y5q5e7"
Notification
├── recipient
├── type
├── title
├── message
├── priority
├── category
├── sourceModule
├── entityType
├── entityId
├── actionUrl / destination
├── readStatus
├── createdAt
└── metadata
```

The notification should contain enough information to understand the event without duplicating the entire business record.

---

# 9. Notification Recipient

Recipients should be determined by business context.

Possible recipients:

* specific user
* record owner
* assignee
* manager
* project manager
* approval authority
* team
* department

The system should not blindly notify entire teams unless the business rule requires it.

---

# 10. Recipient Resolution

Recipient resolution should happen server-side.

Example:

```text id="vlqg0n"
Quotation Submitted
       ↓
Determine Approval Rule
       ↓
Find Authorized Approver
       ↓
Create Notification
       ↓
Approver receives notification
```

The client should never determine who receives a sensitive notification.

---

# 11. Notification Channels

V1 should prioritize in-application notifications.

### V1

* notification center
* header notification indicator
* dashboard attention items
* contextual notifications

### Future

* email
* WhatsApp
* SMS where justified
* push notifications
* Slack
* Microsoft Teams

External channels belong to the future integration architecture.

---

# 12. In-App Notification Center

The notification center should provide:

* unread count
* recent notifications
* priority indicator
* timestamp
* source
* direct navigation
* read/unread state

Example:

```text id="wzcl2u"
Notifications

● Quotation QT-000124 requires approval
  5 minutes ago

● Task "Homepage QA" was assigned to you
  32 minutes ago

○ Payment received for Project X
  2 hours ago
```

---

# 13. Notification Interaction

Clicking a notification should take the user to the relevant context.

Examples:

```text id="z5e2u7"
Quotation Approval
       ↓
Quotation Detail
       ↓
Approval Action
```

```text id="3r0m9k"
Task Assigned
       ↓
Task Detail
```

Notifications should reduce navigation effort.

---

# 14. Read and Unread State

Notifications should support:

* unread
* read

Optional future states:

* dismissed
* archived

Unread state should be visually obvious without becoming distracting.

---

# 15. Mark as Read

A notification may be marked as read:

* when opened
* through explicit action
* through bulk "mark as read"

The system should avoid accidentally marking large numbers of notifications as read without user intent.

---

# 16. Notification Grouping

Repeated related notifications should be grouped where appropriate.

Example:

Instead of:

```text
5 separate notifications:
Task A assigned
Task B assigned
Task C assigned
Task D assigned
Task E assigned
```

The system may show:

> **5 tasks were assigned to you.**

Grouping should only be used where individual context is not lost.

---

# 17. Notification Deduplication

The system should prevent accidental duplicate notifications.

Example:

A workflow update should not generate five identical notifications because several internal operations occurred during one business action.

Notification generation should be tied to meaningful business events.

---

# 18. Notification Timing

Notifications should generally be immediate for:

* assignments
* approvals
* client responses
* important workflow changes

Time-based notifications may be generated for:

* due dates
* overdue tasks
* upcoming meetings
* quotation expiry
* payment reminders

Scheduled notifications should use background processing where required.

---

# 19. Reminder Strategy

Reminders should be useful rather than repetitive.

Example:

```text id="8ktd2v"
Task Due
   ↓
Reminder
   ↓
Overdue
   ↓
Escalation if required
```

The system should avoid sending repeated reminders without meaningful state changes.

---

# 20. Escalation

Important overdue items may eventually support escalation.

Example:

```text id="7b5s9n"
Task Overdue
      ↓
Assignee Notification
      ↓
Still Overdue
      ↓
Manager Notification
```

Escalation rules should be configurable later.

V1 should keep escalation simple.

---

# 21. Notification Preferences

Users may eventually control notification preferences.

Potential settings:

* task assignments
* follow-ups
* approvals
* project updates
* payments
* meetings

However, users should not be allowed to disable mandatory business/security notifications without appropriate controls.

---

# 22. Notification Business Rules

Each notification should have a defined reason.

Example:

| Event              | Recipient                | Priority |
| ------------------ | ------------------------ | -------- |
| Lead assigned      | Sales user               | Normal   |
| Follow-up overdue  | Lead owner               | High     |
| Quotation approval | Approver                 | High     |
| Task assigned      | Assignee                 | Normal   |
| Task overdue       | Assignee                 | High     |
| Project blocked    | Project manager          | High     |
| Payment received   | Finance / relevant owner | Normal   |
| Security event     | Authorized admin         | High     |

---

# 23. Notification and Permissions

Notifications must respect authorization.

A user should never receive a notification containing information about a record they cannot access.

Before creating or displaying a notification, the system should consider:

* recipient permission
* record scope
* record access
* sensitivity

A notification must never become a side-channel for unauthorized data.

---

# 24. Notification Data Minimization

Notifications should expose only the information necessary.

Avoid placing:

* passwords
* API keys
* credentials
* sensitive internal notes
* unnecessary personal information
* confidential financial details

inside notification messages.

---

# 25. Notification Architecture

Conceptually:

```text id="0x8gkj"
Business Action
      ↓
Service Layer
      ↓
Business Event
      ↓
Notification Resolver
      ↓
Recipient Resolution
      ↓
Notification Creation
      ↓
Notification Store
      ↓
Notification Center
```

Future external channels can consume the same notification event.

---

# 26. Notification Service

A centralized notification service should provide controlled operations such as:

* create notification
* create bulk notifications
* mark read
* mark unread
* fetch notifications
* count unread
* resolve recipients

Business modules should not implement separate notification logic independently.

---

# 27. Notification Storage

Notifications should be stored separately from business records.

Conceptual collection:

```text id="1gkyxu"
notifications
```

The collection should support:

* recipient queries
* unread queries
* recent notifications
* source filtering
* entity navigation
* cleanup/retention policies

---

# 28. Notification Indexing

Indexes should support common queries such as:

* recipient + unread
* recipient + createdAt
* recipient + priority
* source entity
* notification status

Indexes should be based on actual query patterns.

---

# 29. Background Processing

Immediate in-app notifications may be created during the normal business operation where practical.

Background processing should be used for:

* scheduled reminders
* recurring notifications
* large notification batches
* email
* external messaging
* notification digests

The notification architecture should remain simple in V1.

---

# 30. Notification Reliability

Important notifications should not silently disappear.

The system should distinguish:

* event created
* notification created
* notification delivered in-app

External delivery channels will later require:

* delivery status
* retry
* failure handling
* provider response tracking

---

# 31. Audit Philosophy

Audit logs answer:

> **Who did what, to which record, and when?**

Audit logging is different from business activity history.

Audit logs should prioritize:

* accountability
* security
* traceability
* change history
* investigation

---

# 32. What Should Be Audited

Important actions include:

### Authentication

* login
* logout
* failed login
* password reset
* account lock/suspension

### Access Control

* role changes
* permission changes
* user activation/deactivation
* ownership changes

### Business

* lead creation
* lead assignment
* stage changes
* opportunity conversion
* quotation approval
* quotation changes
* project status changes
* task assignment
* payment recording
* expense approval

### Administrative

* configuration changes
* sensitive system changes
* export operations

---

# 33. What Does Not Need Full Audit Logging

Not every read operation needs a permanent audit record.

Examples:

* opening a normal dashboard
* viewing a standard list
* scrolling through a task list
* opening a non-sensitive client page

This prevents audit data from becoming unnecessarily large.

Sensitive read operations may be audited separately where justified.

---

# 34. Audit Record Structure

Conceptually:

```text id="6v3u8z"
AuditLog
├── actorId
├── actorType
├── action
├── module
├── entityType
├── entityId
├── timestamp
├── result
├── before
├── after
├── metadata
└── requestContext
```

Not every field must be populated for every event.

---

# 35. Audit Action Naming

Audit actions should be consistent.

Examples:

```text id="2u7gq4"
CREATE
UPDATE
DELETE
ARCHIVE
ASSIGN
UNASSIGN
APPROVE
REJECT
SUBMIT
CANCEL
RESTORE
LOGIN
LOGOUT
PASSWORD_RESET
ROLE_CHANGED
PERMISSION_CHANGED
EXPORT
```

Business-specific actions may be added where necessary.

---

# 36. Before and After Values

For important updates, audit logs may capture relevant before/after values.

Example:

```text id="d5j8n2"
Quotation QT-000124

Before:
Amount: ₹50,000
Discount: ₹2,000

After:
Amount: ₹55,000
Discount: ₹5,000
```

Do not blindly store entire documents for every update.

Audit data should be purposeful.

---

# 37. Sensitive Data in Audit Logs

Audit logs must not capture:

* passwords
* authentication tokens
* API secrets
* database credentials
* private encryption keys

Sensitive business information should also be minimized.

Audit logging must not become another data-leakage mechanism.

---

# 38. Audit Immutability

Audit records should be treated as append-oriented.

Normal users must not be able to:

* edit audit records
* delete audit records
* rewrite timestamps
* change the recorded actor

Administrative access to audit data should be restricted.

---

# 39. Audit Actor

Every audit record should identify the responsible actor where possible.

Examples:

* authenticated user
* system process
* scheduled job
* integration
* administrator

Example:

```text id="1qz2o8"
Actor: Akash
Action: APPROVE
Entity: Quotation QT-000124
Time: 10:42 AM
```

Automated actions should clearly identify themselves as system-generated.

---

# 40. Request Context

Where useful, audit records may include:

* request identifier
* session/context identifier
* IP information where appropriate
* user agent information where appropriate
* source application

This information should be collected carefully and according to privacy/security requirements.

---

# 41. Audit and Business History

Some business records require a user-facing history.

Examples:

Lead:

```text id="yq5k0v"
Created
Assigned
Contacted
Qualified
Requirement Added
Meeting Completed
Proposal Sent
```

Project:

```text id="0y4v4h"
Created
Started
Development
QA
Client Review
Delivered
```

This is **workflow/business history**.

It may be derived from or related to audit events but should not be assumed to be identical to the security audit log.

---

# 42. Three Types of History

Webxode OS should distinguish:

### Activity

What people did as part of business work.

### Workflow History

How a business record moved through its lifecycle.

### Audit Log

What the system records for accountability and security.

```text id="d3g6hc"
Activity
   ↓
Business Interaction

Workflow History
   ↓
State Transition

Audit Log
   ↓
Accountability / Security
```

---

# 43. Audit Event Generation

Audit events should be generated from the server-side business layer.

Preferred flow:

```text id="u9r6m4"
User Action
   ↓
Server Action / Route Handler
   ↓
Authorization
   ↓
Business Service
   ↓
Database Change
   ↓
Audit Event
```

The client should never be responsible for creating authoritative audit records.

---

# 44. Audit Consistency

For critical operations, the business change and audit event should be coordinated carefully.

Example:

```text id="0t4g1j"
Approve Quotation
       ↓
Validate
       ↓
Update Quotation
       ↓
Record Audit
       ↓
Create Notification
```

Where atomicity is required, appropriate database transaction mechanisms should be considered.

---

# 45. Audit Failure Handling

The system must define what happens if audit recording fails during a critical operation.

For security-sensitive actions, silently losing the audit record is unacceptable.

The architecture should favor reliable audit capture while avoiding unnecessary complexity for low-risk events.

---

# 46. Audit Search

Authorized users should eventually be able to search audit history.

Filters may include:

* actor
* module
* entity
* action
* date
* result
* record ID

Example:

```text id="e3f8kn"
Actor: Akash
Module: Presales
Action: APPROVE
Entity: Quotation
Date: 01 Oct 2026
```

---

# 47. Audit Access

Audit visibility should be restricted.

Potential access:

* Management
* authorized Admin
* security/operations roles where applicable

Regular users should not automatically have access to organization-wide audit logs.

---

# 48. Audit Retention

Retention should be defined based on:

* business requirements
* security requirements
* storage requirements
* legal/regulatory requirements where applicable

V1 should establish a retention policy rather than keeping unlimited audit data indefinitely without purpose.

---

# 49. Audit and Soft Delete

When a record is archived or deleted:

The audit history should remain available where appropriate.

Example:

```text id="0b7j5a"
Project Archived
      ↓
Project no longer active
      ↓
Audit history preserved
```

Historical accountability should not disappear with the business record.

---

# 50. Notification and Audit Relationship

A single business operation may produce both.

Example:

### Event

Quotation approved.

### Audit

```text id="qg4m1k"
Akash approved QT-000124.
```

### Notification

```text id="j9n2cd"
Quotation QT-000124 has been approved.
```

The audit log records what happened.

The notification tells someone what they may need to know or do next.

---

# 51. Example — Lead Assignment

```text id="q6m8xk"
Sales Manager assigns Lead
        ↓
Business Service
        │
        ├── Update Lead Owner
        │
        ├── Create Audit Log
        │
        └── Create Notification
                ↓
          New Owner notified
```

---

# 52. Example — Quotation Approval

```text id="s6t2re"
Sales submits quotation
        ↓
Approval Workflow
        ↓
Approver notified
        ↓
Approver opens quotation
        ↓
Approve
        ↓
Quotation state updated
        ↓
Audit recorded
        ↓
Relevant users notified
```

---

# 53. Example — Project Task Assignment

```text id="r3k5vx"
Project Manager
       ↓
Assigns Task
       ↓
Task updated
       ↓
Audit recorded
       ↓
Developer notified
```

The developer receives only the information necessary to perform the task.

---

# 54. Example — Unauthorized Action

```text id="7f3d2q"
User attempts unauthorized approval
       ↓
Authorization check
       ↓
DENY
       ↓
Safe error response
       ↓
Security event logged
```

Depending on the severity and policy, repeated unauthorized attempts may trigger additional monitoring.

---

# 55. Attention Center Integration

Notifications should integrate with the Attention Center.

Example:

```text id="n6p8w2"
Attention Center

3 overdue follow-ups
2 quotations awaiting approval
1 delayed milestone
4 overdue tasks
```

These should link directly to actionable records.

The Attention Center is therefore a **workflow view**, while the notification center is a **notification view**.

They should not become duplicates.

---

# 56. Dashboard Integration

Important notifications may surface on dashboards.

Example:

```text id="c2d7pk"
Today's Attention

Follow-ups      5
Approvals       2
Overdue Tasks   3
Blocked Work    1
```

The dashboard should summarize action rather than repeat the complete notification history.

---

# 57. Notification UX Rules

Notifications should:

* be concise
* explain the event
* show relevance
* provide context
* provide a direct action
* avoid technical language
* avoid unnecessary repetition

Example:

Bad:

> Event ID 8241 generated for record update.

Good:

> Quotation QT-000124 requires your approval.

---

# 58. Audit UX Rules

Audit interfaces should prioritize:

* actor
* action
* record
* timestamp
* change summary

Technical metadata should remain available as secondary information.

Example:

```text id="x7z3p9"
Akash updated quotation QT-000124
2 minutes ago

Amount
₹50,000 → ₹55,000

Discount
₹2,000 → ₹5,000
```

---

# 59. Notification Failure Handling

If an in-app notification cannot be created, the business operation should not necessarily fail unless the notification is itself business-critical.

For example:

A task assignment should generally remain successful even if a non-critical notification fails.

The task assignment itself is the business operation.

External notification delivery should be decoupled where possible.

---

# 60. Notification Idempotency

Notification generation should support idempotent behavior for important events.

If the same business event is processed twice, the system should avoid creating duplicate notifications where possible.

This becomes especially important when background processing is introduced.

---

# 61. Audit Idempotency

Audit records should represent actual business actions.

Retries should not accidentally create misleading duplicate business events.

Where background processing is involved, event identifiers or equivalent mechanisms may be used to identify duplicate processing.

---

# 62. Data Model

Conceptual shared collections:

```text id="c7w0zk"
notifications
auditLogs
```

Optional future collections:

```text id="v4d9hp"
notificationPreferences
notificationDeliveries
notificationTemplates
```

V1 should only introduce additional collections when the actual requirement exists.

---

# 63. Module Integration

Each business module should integrate with the shared capabilities.

### Sales

* lead assignment
* follow-ups
* opportunity changes
* pipeline movement

### Presales

* proposal creation
* quotation submission
* approval
* negotiation

### Clients

* onboarding
* client updates
* important communication

### Projects

* task assignment
* milestone changes
* QA
* client review
* blockers

### Workforce

* leave approval
* work assignment
* attendance-related exceptions

### Operations

* meetings
* tickets
* operational assignments

### Finance

* payment events
* expense approval
* financial workflow changes

### Management

* high-level business alerts
* approval requirements
* critical attention items

---

# 64. Security Requirements

Notifications and audit capabilities must follow the Security Architecture.

Mandatory requirements:

* server-side authorization
* permission-aware notification generation
* restricted audit access
* sensitive data protection
* secure logging
* audit immutability
* no secrets in notifications
* no secrets in audit logs

---

# 65. Performance Considerations

Notifications and audit logs can grow quickly.

The architecture should support:

* indexed queries
* pagination
* limited default result sets
* retention policies
* background processing
* archival where required

Never load an entire audit history or notification history into the browser.

---

# 66. Scalability

V1 should remain simple:

```text id="r5w7d1"
Next.js
   ↓
Notification Service
   ↓
MongoDB
```

As volume grows:

```text id="c6p9ka"
Business Events
      ↓
Background Queue
      ↓
Notification Workers
      ↓
Delivery Channels
```

This evolution should happen only when operational volume justifies it.

---

# 67. V1 Scope

## P0

* in-app notifications
* unread count
* notification center
* assignment notifications
* approval notifications
* follow-up reminders
* task notifications
* important workflow notifications
* audit logging
* audit access control
* audit history
* important state-change tracking

## P1

* scheduled reminders
* notification preferences
* advanced audit search
* attention center integration
* notification grouping
* improved audit UI
* security event dashboard

## P2

* email notifications
* WhatsApp
* push notifications
* notification templates
* advanced escalation
* notification analytics
* external delivery tracking

---

# 68. V1 Out of Scope

Do not over-engineer V1 with:

* distributed notification microservices
* complex event buses
* enterprise messaging infrastructure
* multi-provider notification orchestration
* advanced real-time streaming infrastructure
* complex workflow engines
* AI-generated notification systems

The modular monolith should remain the primary architecture.

---

# 69. Definition of Done — Notifications

A notification feature is complete when:

* the triggering business event is clearly defined
* recipients are determined server-side
* authorization is respected
* notification content is concise
* the relevant record can be opened
* unread/read state works
* duplicate notifications are controlled
* failure behavior is defined
* sensitive data is excluded
* the notification is auditable where appropriate

---

# 70. Definition of Done — Audit

An auditable feature is complete when:

* important actions are identified
* actor is recorded
* action is recorded
* target record is recorded
* timestamp is recorded
* important changes are captured
* sensitive information is excluded
* normal users cannot modify audit records
* authorized users can retrieve relevant history
* unauthorized users cannot access audit data
* important security events are recorded
* retention behavior is defined

---

# 71. Final Architecture

The overall architecture is:

```text id="0z5p4n"
                    BUSINESS ACTION
                          │
                          ▼
                   BUSINESS SERVICE
                          │
                ┌─────────┴─────────┐
                ▼                   ▼
             AUDIT              EVENT
                │                   │
                │                   ▼
                │             NOTIFICATION
                │                   │
                │             ┌─────┴─────┐
                │             ▼           ▼
                │         In-App       Future Channels
                │                       Email / WhatsApp /
                │                       Push / Slack
                │
                ▼
          AUDIT HISTORY
```

---

# 72. Final Philosophy

Notifications and audit logs serve two different purposes.

**Notifications drive action.**

**Audit logs preserve accountability.**

The system should therefore follow:

> **Notify the right person. Record the right event. Expose only the right information.**

Webxode OS should remain quiet when nothing requires attention and become highly visible when action is necessary.

At the same time, important business and security actions should leave a reliable historical trail.

### Core Principle

> **The right person should know what needs to happen next, while the organization should always be able to understand what happened before.**
