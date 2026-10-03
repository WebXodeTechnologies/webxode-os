# Webxode OS — Modules and Features

**Product:** Webxode OS
**Company:** Webxode Technologies
**Document:** Modules and Features
**Version:** V1
**Status:** Feature Definition
**Architecture:** Modular Monolith

---

# 1. Purpose

This document defines the functional modules and features included in Webxode OS V1.

It translates the business requirements into a practical product structure.

The document defines:

- Core modules.
- Submodules.
- Features.
- Major workflows.
- User actions.
- Module boundaries.
- V1 priorities.
- Future extension areas.

It does not define database schemas or implementation code.

---

# 2. Product Structure

Webxode OS V1 is organized into the following major areas:

```text
WEBXODE OS
│
├── Dashboard
│
├── Foundation
│   ├── Users
│   ├── Roles
│   ├── Permissions
│   ├── Departments
│   ├── Teams
│   └── Audit Logs
│
├── Sales
│   ├── Leads
│   ├── Opportunities
│   ├── Activities
│   ├── Follow-ups
│   └── Pipeline
│
├── Presales
│   ├── Requirements
│   ├── Analysis
│   ├── Estimation
│   ├── Proposals
│   ├── Quotations
│   └── Negotiation
│
├── Clients
│   ├── Clients
│   ├── Contacts
│   ├── Onboarding
│   ├── Documents
│   └── History
│
├── Projects
│   ├── Projects
│   ├── Milestones
│   ├── Phases
│   ├── Tasks
│   ├── Deliverables
│   ├── QA
│   └── Change Requests
│
├── Workforce
│   ├── Employees
│   ├── Attendance
│   ├── Leave
│   └── Work Allocation
│
├── Operations
│   ├── Calendar
│   ├── Meetings
│   ├── Internal Tickets
│   ├── Communication
│   └── Notifications
│
├── Finance
│   ├── Revenue
│   ├── Payments
│   ├── Outstanding
│   └── Expenses
│
└── Management
    ├── Dashboards
    ├── Reports
    ├── Analytics
    └── Attention Center
```

---

# 3. Dashboard

The Dashboard is the primary entry point after login.

The dashboard should be role-aware.

Different users should see information relevant to their responsibilities.

---

## 3.1 Management Dashboard

Management should see:

### Sales

- New leads.
- Qualified leads.
- Active opportunities.
- Proposals.
- Quotations.
- Negotiations.
- Won opportunities.
- Lost opportunities.

### Delivery

- Active projects.
- Delayed projects.
- Upcoming deadlines.
- Overdue tasks.
- QA issues.
- Client reviews.

### Finance

- Expected revenue.
- Won revenue.
- Collected revenue.
- Outstanding payments.
- Expenses.

### Workforce

- Employee availability.
- Workload.
- Pending approvals.
- Attendance overview.

### Attention Center

- Overdue follow-ups.
- Overdue tasks.
- Payment overdue.
- Approval pending.
- Projects at risk.
- Important unresolved items.

---

## 3.2 Employee Dashboard

Employees should see:

- My tasks.
- Today's follow-ups.
- Upcoming meetings.
- Pending approvals.
- Assigned projects.
- Notifications.
- Overdue work.
- Recent activity.

The dashboard should answer:

> **What do I need to do today?**

---

# 4. Foundation Module

The Foundation module provides the system's core capabilities.

---

## 4.1 Authentication

Features:

- Login.
- Logout.
- Session management.
- Password management.
- Account status.
- Authentication protection.

Future extension:

- Google OAuth.
- Microsoft OAuth.
- Other identity providers.

---

## 4.2 User Management

Admin features:

- Create user.
- Edit user.
- Activate/deactivate user.
- Reset access.
- Assign business role.
- Assign department.
- Assign team.
- View user activity.

User profile should include:

- Name.
- Email.
- Phone.
- Profile image.
- Department.
- Team.
- Business role.
- Account status.

---

## 4.3 Roles

Admin should be able to create and manage business roles.

Examples:

- Sales Executive.
- Sales Manager.
- Presales Executive.
- Project Manager.
- Developer.
- Designer.
- QA.
- Finance.
- Operations.
- Management.

Roles should not be hardcoded to the application.

---

## 4.4 Permissions

Admin should be able to assign permissions to roles.

Examples:

```text
leads.view
leads.create
leads.update
leads.assign

projects.view
projects.create
projects.update
projects.assign

quotations.view
quotations.create
quotations.approve

expenses.view
expenses.create
expenses.approve
```

Permission scope should support future expansion.

---

## 4.5 Departments

Initial departments may include:

- Sales.
- Presales.
- Development.
- Design.
- QA.
- Finance.
- Operations.
- Management.

Departments should be configurable.

---

## 4.6 Teams

Teams can be created within departments.

Example:

```text
Development
 ├── Frontend Team
 ├── Backend Team
 └── Full Stack Team
```

Team membership should be manageable by authorized users.

---

## 4.7 Audit Logs

Authorized users should be able to view important system activities.

Examples:

- User created.
- Lead reassigned.
- Quotation changed.
- Quotation approved.
- Expense approved.
- Project status changed.
- Task reassigned.

---

# 5. Sales Module

Sales is one of the highest-priority modules in V1.

The purpose is to ensure opportunities are captured, followed up, qualified and converted.

---

# 5.1 Lead Management

Features:

- Create lead.
- Edit lead.
- View lead.
- Assign lead.
- Reassign lead.
- Change status.
- Set priority.
- Add notes.
- Record source.
- Record requirement.
- Schedule follow-up.
- Convert lead.
- Mark lost.
- Search leads.
- Filter leads.

---

## 5.2 Lead Sources

Initial sources:

- Manual.
- Website.
- LinkedIn.
- Referral.
- Cold Calling.
- Lead Import.
- Google.
- Advertising.
- Partner.
- Existing Client.
- Other.

Admin should be able to add sources later.

---

## 5.3 Lead Qualification

Features:

- Qualification status.
- Qualification notes.
- Budget indication.
- Timeline.
- Business fit.
- Decision-maker information.
- Requirement status.
- Qualification outcome.

Possible outcomes:

- Qualified.
- Unqualified.
- Nurture.
- Lost.

---

# 5.4 Lead Assignment

Authorized users can:

- Assign lead.
- Reassign lead.
- View ownership history.

The assigned owner is responsible for progressing the lead.

---

# 5.5 Sales Pipeline

Pipeline stages:

```text
New
 ↓
Contacted
 ↓
Qualified
 ↓
Requirement Collected
 ↓
Meeting
 ↓
Presales
 ↓
Proposal
 ↓
Quotation
 ↓
Negotiation
 ↓
Client Confirmation
 ↓
Won
```

Alternative outcome:

```text
Lost
```

---

# 5.6 Sales Activities

Activity types:

- Call.
- Follow-up.
- Meeting.
- WhatsApp.
- Email.
- Callback.
- Requirement discussion.
- Proposal discussion.
- Negotiation.
- Other.

Each activity should record:

- Type.
- Date/time.
- Owner.
- Notes.
- Outcome.
- Next action.

---

# 5.7 Follow-Up Queue

Employees should have:

### Today

- Follow-ups.
- Calls.
- Callbacks.
- Meetings.
- Proposal follow-ups.

### Upcoming

- Scheduled follow-ups.
- Meetings.
- Future callbacks.

### Overdue

- Missed follow-ups.
- Unresolved actions.

This should be one of the most frequently used Sales screens.

---

# 5.8 Opportunity Management

Features:

- Create opportunity.
- Convert qualified lead.
- Assign owner.
- Set expected value.
- Track stage.
- Track expected close period.
- Link requirement.
- Link proposal.
- Link quotation.
- Track negotiation.
- Mark won/lost.

---

# 5.9 Sales Dashboard

Metrics:

- New leads.
- Leads contacted.
- Qualified leads.
- Active opportunities.
- Follow-ups due.
- Overdue follow-ups.
- Meetings.
- Proposals.
- Quotations.
- Negotiations.
- Won opportunities.
- Lost opportunities.

---

# 6. Presales Module

Presales converts a business requirement into a commercially viable solution.

---

# 6.1 Requirements

Features:

- Create requirement.
- Link to lead/opportunity.
- Record business problem.
- Record objective.
- Record requirements.
- Record constraints.
- Record dependencies.
- Record assumptions.
- Record exclusions.
- Assign presales owner.

---

# 6.2 Requirement Analysis

Features:

- Functional requirements.
- Technical requirements.
- Integrations.
- User requirements.
- Scope analysis.
- Complexity assessment.
- Risks.
- Dependencies.
- Assumptions.

---

# 6.3 Solution Planning

Features:

- Proposed solution.
- Service category.
- Delivery approach.
- Technology approach.
- Major components.
- Integration requirements.
- Infrastructure requirements.
- Support requirements.

---

# 6.4 Estimation

Features:

- Feature estimation.
- Development effort.
- Design effort.
- QA effort.
- Infrastructure cost.
- Third-party cost.
- Timeline.
- Resource requirement.

---

# 6.5 Proposal Management

Features:

- Create proposal.
- Edit proposal.
- Proposal versioning.
- Internal review.
- Approval.
- Send proposal.
- Track status.
- Accept/reject.
- Expiry.

Statuses:

```text
Draft
 ↓
Internal Review
 ↓
Approved
 ↓
Sent
 ↓
Accepted / Rejected
```

---

# 6.6 Quotation Management

Features:

- Create quotation.
- Add line items.
- Set quantity.
- Set price.
- Discount.
- Tax.
- Total.
- Payment terms.
- Validity.
- Terms and conditions.
- Internal approval.
- Send quotation.
- Revision.
- Track acceptance.

Statuses:

```text
Draft
 ↓
Review
 ↓
Approved
 ↓
Sent
 ↓
Negotiation
 ↓
Accepted / Rejected
```

---

# 6.7 Negotiation

Features:

- Record negotiation.
- Record requested discount.
- Record scope changes.
- Record timeline changes.
- Record payment-term changes.
- Create quotation revision.
- Maintain commercial history.

---

# 7. Clients Module

The Clients module manages converted business relationships.

---

# 7.1 Client Management

Features:

- Create client.
- Convert lead to client.
- Edit client.
- View client.
- Assign relationship owner.
- Search client.
- Filter clients.
- View client history.

---

# 7.2 Client Contacts

Features:

- Add contact.
- Edit contact.
- Set primary contact.
- Record designation.
- Record communication details.
- Mark contact active/inactive.

A client may have multiple contacts.

---

# 7.3 Client Profile

Client profile should provide a consolidated view:

```text
Client
├── Contacts
├── Opportunities
├── Projects
├── Documents
├── Payments
├── Support
└── Activity History
```

---

# 7.4 Client Onboarding

Features:

- Onboarding checklist.
- Agreement/SOW.
- Advance payment status.
- Requirement confirmation.
- Asset collection.
- Domain details.
- Hosting details.
- Access requirements.
- Team assignment.
- Kickoff meeting.
- Project creation.

---

# 7.5 Client Documents

Documents may include:

- Agreements.
- SOW.
- Proposals.
- Quotations.
- Brand assets.
- Requirements.
- Project documents.
- Other business documents.

---

# 7.6 Client History

Client history should show:

- Lead history.
- Opportunities.
- Proposals.
- Quotations.
- Projects.
- Payments.
- Support.
- Meetings.
- Important activities.

---

# 8. Projects Module

Projects are created after a confirmed business opportunity.

---

# 8.1 Project Management

Features:

- Create project.
- Edit project.
- Assign project manager.
- Assign team.
- Set start date.
- Set deadline.
- Set project value.
- Define scope.
- Link client.
- Link SOW.
- Track status.
- Close project.

---

# 8.2 Project Status

Initial statuses:

```text
Planning
Active
On Hold
At Risk
Completed
Cancelled
```

---

# 8.3 Milestones

Features:

- Create milestone.
- Set due date.
- Assign owner.
- Track completion.
- Link deliverables.

---

# 8.4 Phases

Example:

```text
Requirements
UI/UX
Development
Testing
Client Review
Deployment
Handover
```

Project managers should be able to customize phases based on project type.

---

# 8.5 Task Management

Features:

- Create task.
- Assign task.
- Set priority.
- Set due date.
- Estimate effort.
- Track actual effort where required.
- Add comments.
- Add attachments.
- Set status.
- Track dependencies.

Statuses:

```text
To Do
In Progress
Blocked
Developer Complete
QA
Client Review
Done
```

---

# 8.6 Deliverables

Features:

- Define deliverable.
- Assign owner.
- Set deadline.
- Link milestone.
- Track status.
- Record client approval.

---

# 8.7 QA

Features:

- Submit for QA.
- QA assignment.
- Pass.
- Fail.
- Bug creation.
- Return to developer.
- Re-test.
- Final approval.

Workflow:

```text
Development
 ↓
Developer Complete
 ↓
QA
 ├── Pass → Client Review
 └── Fail → Developer
```

---

# 8.8 Change Requests

Features:

- Create change request.
- Record client request.
- Impact analysis.
- Estimate effort.
- Estimate cost.
- Estimate timeline.
- Send for approval.
- Approve/reject.
- Convert approved change into work.

Workflow:

```text
Client Request
 ↓
Analysis
 ↓
Estimation
 ↓
Approval
 ↓
Task / Work
```

---

# 8.9 Project Timeline

The project should provide a timeline showing:

- Project creation.
- Milestones.
- Major phase changes.
- Important tasks.
- Client approvals.
- Change requests.
- Delivery.
- Closure.

---

# 8.10 Project Dashboard

Metrics:

- Overall project status.
- Progress.
- Milestones.
- Tasks.
- Overdue tasks.
- QA issues.
- Change requests.
- Client review.
- Payment status.
- Deadline.

---

# 9. Workforce Module

The Workforce module provides operational employee management.

---

# 9.1 Employee Management

Features:

- Employee profile.
- User account link.
- Department.
- Team.
- Business role.
- Joining date.
- Employment status.
- Contact details.
- Work allocation.

---

# 9.2 Attendance

Features:

- Clock in.
- Clock out.
- Attendance history.
- Working status.
- Daily attendance view.
- Management attendance view.

---

# 9.3 Leave

Features:

- Apply leave.
- View leave.
- Approve leave.
- Reject leave.
- Leave history.
- Leave status.

Workflow:

```text
Employee
 ↓
Leave Request
 ↓
Approver
 ↓
Approve / Reject
```

---

# 9.4 Work Allocation

Features:

- View employee workload.
- Assign project.
- Assign task.
- View active assignments.
- View overdue work.
- View availability.

---

# 10. Operations Module

Operations handles internal coordination.

---

# 10.1 Calendar

Features:

- Calendar view.
- Events.
- Meetings.
- Deadlines.
- Follow-ups.
- Project milestones.

---

# 10.2 Meetings

Features:

- Create meeting.
- Add participants.
- Set date/time.
- Add agenda.
- Record notes.
- Record decisions.
- Add follow-up actions.

---

# 10.3 Internal Tickets

Internal tickets can be used for:

- IT requests.
- Infrastructure issues.
- Internal support.
- Operational requests.
- Access requests.
- General internal issues.

Features:

- Create ticket.
- Assign ticket.
- Priority.
- Status.
- Comments.
- Attachments.
- Resolution.

---

# 10.4 Internal Communication

V1 may provide lightweight internal communication features.

Examples:

- Comments.
- Mentions.
- Activity updates.
- Internal messages where required.

The system is not intended to replace Slack, Teams or WhatsApp in V1.

---

# 10.5 Notifications

Notification types:

- Assignment.
- Approval.
- Reminder.
- Overdue.
- Mention.
- Project update.
- Payment reminder.
- System alert.

---

# 11. Finance Module

Finance provides operational financial visibility.

It does not replace InvoNext.

---

# 11.1 Revenue

Features:

- Project value.
- Opportunity value.
- Won value.
- Expected revenue.
- Collected revenue.
- Outstanding revenue.
- Client revenue.
- Project revenue.

---

# 11.2 Payment Tracking

Features:

- Add payment.
- Payment milestone.
- Due date.
- Amount.
- Payment date.
- Payment status.
- Outstanding calculation.
- Payment history.

Statuses:

```text
Pending
Due
Partially Paid
Paid
Overdue
```

---

# 11.3 Outstanding

The system should provide:

- Client outstanding.
- Project outstanding.
- Overdue payments.
- Upcoming payments.
- Payment reminders.

---

# 11.4 Expenses

Features:

- Submit expense.
- Expense category.
- Amount.
- Date.
- Project.
- Receipt.
- Approval.
- Rejection.
- Payment status.

---

# 12. Management Module

Management provides cross-functional visibility.

---

# 12.1 Management Dashboard

Sections:

```text
Sales
Delivery
Workforce
Finance
Operations
Attention Center
```

---

# 12.2 Reports

Initial reports:

### Sales

- Lead source report.
- Lead conversion.
- Sales pipeline.
- Won/lost opportunities.
- Sales performance.

### Projects

- Active projects.
- Project status.
- Delayed projects.
- Task performance.
- QA performance.
- Delivery performance.

### Finance

- Revenue.
- Collections.
- Outstanding.
- Expenses.
- Project financial visibility.

### Workforce

- Workload.
- Attendance.
- Leave.
- Task allocation.

---

# 12.3 Attention Center

This is a core management feature.

The system should surface:

- Overdue follow-ups.
- Stale leads.
- Unassigned leads.
- Pending quotations.
- Pending approvals.
- Overdue tasks.
- At-risk projects.
- QA failures.
- Client review delays.
- Payment overdue.
- Unresolved internal tickets.

The objective is:

> **Show management what needs attention, not just what happened.**

---

# 13. Global Search

Global search should allow users to quickly locate business records.

Search targets:

- Leads.
- Opportunities.
- Clients.
- Projects.
- Tasks.
- Proposals.
- Quotations.
- Payments.
- Tickets.
- Meetings.
- Documents.

Results must respect permissions.

---

# 14. Activity Timeline

Important business records should provide a timeline.

Example:

```text
Lead Created
     ↓
Lead Assigned
     ↓
Call Completed
     ↓
Requirement Added
     ↓
Meeting Completed
     ↓
Proposal Created
     ↓
Quotation Sent
     ↓
Negotiation
     ↓
Won
```

Similar timelines should exist for:

- Clients.
- Projects.
- Quotations.
- Change requests.

---

# 15. Approval Center

A centralized approval view should eventually show:

- Quotation approvals.
- Discount approvals.
- Proposal approvals.
- Expense approvals.
- Leave approvals.
- Scope-change approvals.

The user should be able to act directly from the approval queue where appropriate.

---

# 16. Documents

The system should support document relationships across modules.

Examples:

```text
Lead
 └── Requirement

Opportunity
 ├── Proposal
 └── Quotation

Client
 ├── Agreement
 └── Documents

Project
 ├── SOW
 ├── Deliverables
 └── Handover Documents
```

Documents should remain associated with their business context.

---

# 17. Core Cross-Module Workflows

## 17.1 Lead to Client

```text
Lead
 ↓
Qualification
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
Client Confirmation
 ↓
Client
```

---

## 17.2 Client to Project

```text
Client Confirmation
 ↓
Onboarding
 ↓
SOW
 ↓
Payment / Advance
 ↓
Team Assignment
 ↓
Project Creation
 ↓
Kickoff
```

---

## 17.3 Project Delivery

```text
Project
 ↓
Milestones
 ↓
Phases
 ↓
Tasks
 ↓
Development
 ↓
QA
 ↓
Client Review
 ↓
Deployment
 ↓
Handover
```

---

## 17.4 Change Request

```text
Client Request
 ↓
Impact Analysis
 ↓
Estimation
 ↓
Cost / Timeline
 ↓
Approval
 ↓
Task
 ↓
Delivery
```

---

## 17.5 Payment

```text
Quotation / Project
 ↓
Payment Milestone
 ↓
Due
 ↓
Payment
 ↓
Collected
 ↓
Outstanding Updated
```

---

# 18. V1 Priority Classification

Not every feature has the same implementation priority.

## P0 — Core Business Engine

These are essential.

### Foundation

- Authentication.
- Users.
- Roles.
- Permissions.

### Sales

- Leads.
- Assignment.
- Qualification.
- Pipeline.
- Activities.
- Follow-ups.
- Opportunities.

### Presales

- Requirements.
- Estimation.
- Proposals.
- Quotations.
- Approval.
- Negotiation.

### Clients

- Client conversion.
- Client profiles.
- Contacts.
- Onboarding.

### Projects

- Projects.
- Milestones.
- Phases.
- Tasks.
- Assignment.
- Basic QA.
- Delivery status.

### Finance

- Project value.
- Payments.
- Outstanding.

### Management

- Core dashboard.
- Attention items.

---

# 19. P1 — Operational Expansion

After the core business engine is stable:

- Attendance.
- Leave.
- Work allocation.
- Meetings.
- Calendar.
- Internal tickets.
- Expenses.
- Deliverables.
- Change requests.
- Advanced project dashboard.
- Detailed reports.
- Audit log UI.
- Notifications.

---

# 20. P2 — Platform Enhancement

After the operational foundation is stable:

- Advanced search.
- Advanced reporting.
- Document management improvements.
- Advanced approval workflows.
- Automation foundation.
- More detailed analytics.
- Advanced activity timelines.

---

# 21. Future Modules

The following should remain outside the V1 core.

## Integrations

Potential integrations:

- Google Workspace.
- Microsoft 365.
- GitHub.
- Slack.
- WhatsApp.
- Zoom.
- Other productivity tools.

---

## AI

Potential AI capabilities:

- Lead scoring.
- Sales intelligence.
- Follow-up recommendations.
- Proposal assistance.
- Requirement analysis.
- Project risk detection.
- Revenue intelligence.
- AI business assistant.

---

## Automation

Future capabilities:

- Trigger-based workflows.
- Scheduled actions.
- Cross-module automation.
- External application automation.
- Notification automation.

---

## Client Portal

Future capability:

Clients may eventually be able to:

- View projects.
- Approve deliverables.
- Review quotations.
- View documents.
- Raise support requests.
- Track payments.

---

# 22. Module Ownership

Each module must have a clear responsibility.

| Module     | Primary Responsibility                  |
| ---------- | --------------------------------------- |
| Foundation | Identity, access and system control     |
| Sales      | Leads and commercial opportunities      |
| Presales   | Requirements and commercial preparation |
| Clients    | Client relationship records             |
| Projects   | Delivery execution                      |
| Workforce  | Employee operations                     |
| Operations | Internal coordination                   |
| Finance    | Operational financial visibility        |
| Management | Business visibility and reporting       |

---

# 23. Feature Design Principles

Every feature should satisfy at least one of the following:

- Helps generate revenue.
- Helps convert revenue.
- Helps deliver revenue.
- Helps collect revenue.
- Helps manage people.
- Helps reduce operational risk.
- Helps management make informed decisions.
- Helps create repeatable business processes.

Features that do not provide meaningful operational value should not be added simply because they are technically possible.

---

# 24. UI/UX Functional Principles

The application should prioritize:

### Action First

Users should immediately see what requires action.

### Context First

Users should understand why an action is required.

### Minimal Clicks

Common workflows should require as few steps as practical.

### Progressive Detail

Show essential information first and deeper information when needed.

### Consistency

Common actions should behave consistently across modules.

### Role Awareness

Different users should see relevant information and actions.

---

# 25. V1 Functional Boundary

Webxode OS V1 is primarily:

> **Sales + Presales + Client Management + Project Delivery + Workforce + Operations + Finance Visibility + Management**

It is not:

- A complete ERP.
- A complete accounting platform.
- A complete HRMS.
- A complete project management SaaS for external customers.
- A communication platform.
- An AI platform.
- An integration platform.

The objective is to build the operating system required to run **Webxode Technologies**.

---

# 26. Final Product Flow

The functional product flow is:

```text
                    WEBXODE OS

                       DASHBOARD
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
      SALES             PRESALES            CLIENTS
        │                  │                  │
      LEADS           REQUIREMENTS       ONBOARDING
        │                  │                  │
   OPPORTUNITIES       PROPOSALS          PROJECT
        │                  │                  │
    FOLLOW-UPS         QUOTATIONS         DELIVERY
        │                  │                  │
        └────────────── CONVERSION ──────────┘
                           │
                        PROJECTS
                           │
                     TASKS / QA
                           │
                        DELIVERY
                           │
                      PAYMENTS
                           │
                       REVENUE
                           │
                 SUPPORT / RENEWAL
                           │
                     MANAGEMENT
```

---

# 27. Final Principle

Webxode OS should not become a collection of disconnected modules.

Every major module must contribute to one continuous business system:

> **Generate → Convert → Deliver → Collect → Retain → Grow**

And every employee interaction should move the business forward:

> **Know what happened.
> Know who owns it.
> Know what happens next.
> Take action.**

**Less data. Less clicking. More action.**
