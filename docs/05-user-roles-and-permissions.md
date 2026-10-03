# Webxode OS — User Roles and Permissions

**Product:** Webxode OS
**Company:** Webxode Technologies
**Document:** User Roles and Permissions
**Version:** V1
**Status:** Access Control Definition
**Architecture:** Role-Based Access Control (RBAC)

---

# 1. Purpose

This document defines the identity, role, permission, and access-control model for Webxode OS.

The objective is to ensure that:

- Employees only access information required for their responsibilities.
- Business actions are controlled by permissions.
- Management has appropriate visibility.
- Sensitive operations require authorization.
- Roles can evolve as Webxode grows.
- Access control is centralized and auditable.

The core model is:

```text
User
  ↓
Business Role
  ↓
Permissions
  ↓
Access Scope
  ↓
Business Records
```

---

# 2. Access Control Philosophy

Webxode OS will follow:

> **Least Privilege + Role-Based Access + Scope-Based Visibility**

A user should receive only the access required to perform their responsibilities.

Access should not be determined only by the frontend interface.

All protected actions must be validated on the server.

---

# 3. System Account Types

Webxode OS has two system-level account types:

```text
ADMIN
USER
```

These are system account types and are separate from business roles.

---

# 4. ADMIN Account

An `ADMIN` is responsible for system administration.

Administrative capabilities may include:

- User management.
- Role management.
- Permission management.
- Department management.
- Team management.
- System configuration.
- Access control.
- Audit visibility.
- Business configuration.

An Admin is not necessarily a business department role.

For example, an Admin may also have a business responsibility such as Management, but these concepts should remain technically separate.

---

# 5. USER Account

A `USER` represents a normal Webxode employee using the platform.

A user receives business capabilities through assigned roles.

Example:

```text
User
 ↓
Sales Executive
 ↓
Sales Permissions
```

Another user:

```text
User
 ↓
Project Manager
 ↓
Project Permissions
```

---

# 6. Business Roles

Business roles are configurable.

Initial recommended roles:

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

These roles are starting templates, not permanent hardcoded system roles.

Admin should be able to create additional roles.

---

# 7. Role Responsibilities

## 7.1 Management

Typical responsibilities:

- Business visibility.
- Sales oversight.
- Project oversight.
- Revenue visibility.
- Approvals.
- Employee visibility.
- Management reporting.

Typical access:

```text
GLOBAL
```

subject to configured permissions.

---

## 7.2 Sales Executive

Responsibilities:

- Lead management.
- Lead qualification.
- Follow-ups.
- Sales activities.
- Opportunities.
- Proposal coordination.
- Quotation coordination.
- Client communication.

Typical scope:

```text
OWN / ASSIGNED
```

---

## 7.3 Sales Manager

Responsibilities:

- Sales team management.
- Lead assignment.
- Pipeline management.
- Sales performance.
- Opportunity oversight.
- Approvals.

Typical scope:

```text
TEAM
```

with selected GLOBAL access.

---

## 7.4 Presales Executive

Responsibilities:

- Requirement analysis.
- Solution planning.
- Estimation.
- Proposal preparation.
- Quotation preparation.
- Presales support.

Typical scope:

```text
OWN / ASSIGNED
```

---

## 7.5 Project Manager

Responsibilities:

- Project planning.
- Team allocation.
- Milestone management.
- Task management.
- Delivery tracking.
- Client coordination.
- Project reporting.

Typical scope:

```text
ASSIGNED PROJECTS
```

---

## 7.6 Developer

Responsibilities:

- Development tasks.
- Technical work.
- Bug fixing.
- Development completion.
- Technical project activities.

Typical scope:

```text
ASSIGNED TASKS / ASSIGNED PROJECTS
```

---

## 7.7 Designer

Responsibilities:

- UI/UX work.
- Design tasks.
- Design deliverables.
- Client review changes.

Typical scope:

```text
ASSIGNED TASKS / ASSIGNED PROJECTS
```

---

## 7.8 QA

Responsibilities:

- Testing.
- QA tasks.
- Bug reporting.
- Verification.
- Release readiness.

Typical scope:

```text
ASSIGNED PROJECTS / QA ASSIGNMENTS
```

---

## 7.9 Finance

Responsibilities:

- Payment visibility.
- Revenue tracking.
- Outstanding payments.
- Expense management.
- Financial operational reporting.

Typical scope:

```text
GLOBAL FINANCE DATA
```

subject to permissions.

---

## 7.10 Operations

Responsibilities:

- Internal operations.
- Meetings.
- Internal tickets.
- Employee coordination.
- Operational requests.
- Internal support.

Typical scope:

```text
DEPARTMENT / TEAM / GLOBAL
```

depending on responsibility.

---

# 8. Role vs Permission

A role represents a business responsibility.

A permission represents an allowed action.

Example:

```text
Role:
Sales Executive

Permissions:
leads.view
leads.create
leads.update
leads.followup
opportunities.view
opportunities.create
```

This separation allows roles to evolve without changing application code.

---

# 9. Permission Structure

Permissions should follow a consistent naming convention.

Recommended structure:

```text
<module>.<resource>.<action>
```

Examples:

```text
sales.leads.view
sales.leads.create
sales.leads.update
sales.leads.assign

sales.opportunities.view
sales.opportunities.create
sales.opportunities.update

presales.requirements.view
presales.requirements.create
presales.proposals.create

projects.projects.view
projects.projects.create
projects.projects.update

projects.tasks.view
projects.tasks.create
projects.tasks.assign

finance.payments.view
finance.payments.create

finance.expenses.view
finance.expenses.create
finance.expenses.approve
```

The exact permission catalog can evolve with the application.

---

# 10. Standard Actions

Common actions include:

```text
view
create
update
delete
assign
approve
reject
export
archive
restore
manage
```

Not every resource needs every action.

For example:

```text
leads.view
leads.create
leads.update
leads.assign
```

may be sufficient.

---

# 11. Permission Categories

Permissions should be grouped by functional area.

## Foundation

```text
users.*
roles.*
permissions.*
departments.*
teams.*
audit.*
```

## Sales

```text
leads.*
opportunities.*
activities.*
followups.*
pipeline.*
```

## Presales

```text
requirements.*
estimations.*
proposals.*
quotations.*
negotiations.*
```

## Clients

```text
clients.*
contacts.*
onboarding.*
documents.*
```

## Projects

```text
projects.*
milestones.*
phases.*
tasks.*
deliverables.*
qa.*
changeRequests.*
```

## Workforce

```text
employees.*
attendance.*
leave.*
workAllocation.*
```

## Operations

```text
calendar.*
meetings.*
tickets.*
communication.*
notifications.*
```

## Finance

```text
revenue.*
payments.*
expenses.*
```

## Management

```text
dashboard.*
reports.*
analytics.*
```

---

# 12. Access Scope

Permissions determine **what** a user can do.

Scope determines **which records** they can act on.

Initial scopes:

```text
OWN
ASSIGNED
TEAM
DEPARTMENT
PROJECT
GLOBAL
```

---

# 13. OWN Scope

The user can access records they personally own.

Example:

```text
Sales Executive
leads.view
Scope: OWN
```

The employee can view their own leads.

---

# 14. ASSIGNED Scope

The user can access records assigned to them.

Example:

```text
Developer
tasks.update
Scope: ASSIGNED
```

The developer can update tasks assigned to them.

---

# 15. TEAM Scope

The user can access records belonging to their team.

Example:

```text
Sales Manager
leads.view
Scope: TEAM
```

The Sales Manager can view leads belonging to the sales team.

---

# 16. DEPARTMENT Scope

The user can access records associated with their department.

Example:

```text
Operations Manager
tickets.view
Scope: DEPARTMENT
```

---

# 17. PROJECT Scope

The user can access records associated with projects they are assigned to.

Example:

```text
Developer
tasks.view
Scope: PROJECT
```

This allows project-based visibility without granting global access.

---

# 18. GLOBAL Scope

The user can access all records permitted by the relevant permission.

Example:

```text
Management
projects.view
Scope: GLOBAL
```

Global access must be granted carefully.

---

# 19. Permission Evaluation

A protected request should conceptually follow:

```text
User
 ↓
Authenticated?
 ↓
Active Account?
 ↓
Role
 ↓
Permission
 ↓
Scope
 ↓
Record Access
 ↓
Allow / Deny
```

Example:

```text
User:
Developer

Action:
Update Task

Permission:
projects.tasks.update

Scope:
ASSIGNED

Task:
Assigned to Developer

Result:
ALLOW
```

Another example:

```text
User:
Developer

Action:
Update Task

Permission:
projects.tasks.update

Scope:
ASSIGNED

Task:
Assigned to another employee

Result:
DENY
```

---

# 20. Multiple Roles

The architecture should support a user having multiple business roles where required.

Example:

```text
User
 ├── Project Manager
 └── Presales Executive
```

Effective permissions are derived from the user's assigned roles.

The system should avoid unnecessary role duplication.

---

# 21. Permission Precedence

Where multiple roles exist, permissions should be evaluated consistently.

The initial rule should be:

> **Explicitly granted permissions contribute to the user's effective permissions.**

However, sensitive permissions should not automatically become available merely because another role has broad access.

Administrative and highly sensitive actions should remain explicitly controlled.

Future versions may introduce explicit deny rules if required.

---

# 22. Sensitive Permissions

Certain actions should receive additional protection.

Examples:

```text
users.delete
roles.manage
permissions.manage

quotations.approve
quotations.discount.approve

expenses.approve

payments.update

project.scope.change.approve
```

Sensitive operations should be:

- Permission controlled.
- Audited.
- Visible in activity history where appropriate.

---

# 23. Approval Permissions

Approval actions should be separate from normal editing.

Example:

```text
quotations.create
quotations.update
quotations.approve
```

A user who can create a quotation does not automatically receive permission to approve it.

This separation is important for accountability.

---

# 24. Separation of Responsibilities

Where practical, the system should avoid allowing one person to silently perform every stage of a sensitive workflow.

Example:

```text
Quotation Created
       ↓
Internal Review
       ↓
Approval
       ↓
Sent
```

Creation and approval should be independently permission-controlled.

The exact approval rules may evolve with Webxode's team structure.

---

# 25. Module Access

A user may have access to some modules and not others.

Example:

### Sales Executive

```text
Dashboard
Sales
Clients
Notifications
```

### Developer

```text
Dashboard
Projects
Tasks
Calendar
Notifications
```

### Finance

```text
Dashboard
Clients
Finance
Reports
Notifications
```

The UI should reflect available permissions.

However:

> **Hiding a menu item is not authorization.**

Server-side access control remains mandatory.

---

# 26. Navigation Permissions

Navigation visibility can be derived from permissions.

For example:

If a user has:

```text
sales.leads.view
```

the Sales → Leads section can be displayed.

If the user has no Sales permissions, the section can be hidden.

This improves usability while server-side authorization protects the actual resource.

---

# 27. Record-Level Access

Some modules require record-level access.

Examples:

### Leads

Access may depend on:

- Owner.
- Assigned employee.
- Sales team.

### Projects

Access may depend on:

- Project manager.
- Project team.
- Assigned task.

### Tasks

Access may depend on:

- Assignee.
- Project membership.

### Expenses

Access may depend on:

- Employee.
- Approver.
- Finance.

---

# 28. Ownership Model

Important records should contain ownership information.

Examples:

```text
Lead
 → leadOwner

Opportunity
 → opportunityOwner

Requirement
 → presalesOwner

Proposal
 → proposalOwner

Project
 → projectManager

Task
 → assignee

Expense
 → submittedBy
 → approver
```

Ownership enables meaningful access control.

---

# 29. Assignment History

Important assignments should be traceable.

Example:

```text
Lead
 ↓
Assigned to A
 ↓
Reassigned to B
 ↓
Reassigned to C
```

The system should retain relevant assignment history.

This supports accountability and auditability.

---

# 30. Department and Team Relationships

The organizational model should support:

```text
Company
  ↓
Department
  ↓
Team
  ↓
User
```

Example:

```text
Webxode Technologies
      │
   Sales
      │
 ┌────┴─────┐
Team A    Team B
 │           │
Users       Users
```

Users may belong to a department and optionally a team.

---

# 31. Temporary Responsibilities

The architecture should allow future support for temporary responsibilities.

Examples:

- Acting Project Manager.
- Temporary Team Lead.
- Temporary Approval authority.
- Project-specific responsibility.

This does not need full implementation in V1 but should not be architecturally impossible.

---

# 32. User Status

User accounts should support statuses such as:

```text
ACTIVE
INACTIVE
SUSPENDED
```

Inactive or suspended users should not be able to perform normal business actions.

Historical records owned by inactive users must remain intact.

---

# 33. Employee Offboarding

When an employee leaves:

- Account access should be disabled.
- Historical activity should remain.
- Owned records should be reassigned where required.
- Active tasks should be reassigned.
- Active leads should be reassigned.
- Project responsibilities should be reviewed.

Deleting the user should not delete their business history.

---

# 34. Access to Historical Data

Users should generally be able to retain appropriate visibility into historical information according to their permissions.

For example:

A completed project should remain available even if the employee who worked on it becomes inactive.

Historical records must not disappear because of account deactivation.

---

# 35. Audit Requirements

Access-sensitive actions should be auditable.

Examples:

- User created.
- User deactivated.
- Role changed.
- Permission changed.
- Lead reassigned.
- Quotation approved.
- Discount approved.
- Expense approved.
- Payment modified.
- Project assignment changed.

Audit logs should identify:

- Actor.
- Action.
- Target record.
- Timestamp.
- Relevant change.

---

# 36. Admin Responsibilities

Admin should be able to:

- Create users.
- Edit users.
- Activate/deactivate users.
- Create roles.
- Edit roles.
- Assign permissions.
- Assign roles.
- Configure departments.
- Configure teams.
- Review audit logs.

Admin should not automatically become the business owner of every record.

System administration and business ownership remain separate concepts.

---

# 37. Management Responsibilities

Management access should focus on:

- Business visibility.
- Approvals.
- Reporting.
- Sales oversight.
- Project oversight.
- Revenue visibility.
- Workforce visibility.

Management access should be configurable rather than permanently hardcoded.

---

# 38. Example Permission Matrix

The following represents the initial recommended baseline.

| Module        | Sales Exec  | Sales Manager | Presales    | PM              | Developer | QA       | Finance | Management   |
| ------------- | ----------- | ------------- | ----------- | --------------- | --------- | -------- | ------- | ------------ |
| Leads         | Own         | Team          | Assigned    | Limited         | No        | No       | Limited | Global       |
| Opportunities | Own         | Team          | Assigned    | Limited         | No        | No       | Limited | Global       |
| Requirements  | Assigned    | Team          | Own         | Assigned        | Limited   | Limited  | No      | Global       |
| Proposals     | Create/View | Team          | Create/Edit | View            | No        | No       | View    | Approve/View |
| Quotations    | Create/View | Team          | Create/Edit | View            | No        | No       | View    | Approve      |
| Clients       | Assigned    | Team          | Assigned    | Project         | Project   | Project  | Finance | Global       |
| Projects      | Assigned    | Team          | Limited     | Global Assigned | Assigned  | Assigned | View    | Global       |
| Tasks         | Own         | Team          | Assigned    | Global Assigned | Assigned  | Assigned | No      | Global       |
| QA            | No          | View          | View        | Manage          | View      | Manage   | No      | View         |
| Payments      | View        | View          | No          | View            | No        | No       | Manage  | Global       |
| Expenses      | Own         | Team          | Own         | Team            | Own       | Own      | Manage  | Approve      |
| Reports       | Limited     | Team          | Limited     | Project         | Own       | Own      | Finance | Global       |
| Users         | No          | No            | No          | No              | No        | No       | No      | View         |
| Roles         | No          | No            | No          | No              | No        | No       | No      | No           |
| Audit         | No          | Limited       | No          | Limited         | No        | No       | Finance | Global       |

This matrix is a starting point.

Actual permissions should be configured through the role-permission system rather than permanently hardcoded from this table.

---

# 39. Permission Matrix Principles

The matrix should follow:

### Sales

Sales employees primarily manage sales records.

### Presales

Presales employees primarily manage requirements and commercial preparation.

### Project Management

Project managers primarily control project execution.

### Delivery Team

Developers, designers and QA primarily access assigned project work.

### Finance

Finance primarily accesses operational financial information.

### Management

Management receives broad visibility and approval capabilities.

### Admin

Admin controls the system itself.

---

# 40. V1 Permission Strategy

V1 should implement:

- User authentication.
- User status.
- Role assignment.
- Permission assignment.
- Module permissions.
- Action permissions.
- Basic ownership-based access.
- Basic team-based access.
- Basic global access.
- Server-side authorization.
- Audit logging for sensitive actions.

Advanced policy engines are not required.

---

# 41. Future Permission Capabilities

The architecture should allow future support for:

- Custom permission scopes.
- Temporary access.
- Project-specific roles.
- Delegated approvals.
- Time-limited permissions.
- Conditional access.
- Advanced policy rules.
- Attribute-based access control.

These are future capabilities, not V1 requirements.

---

# 42. Security Principles

Webxode OS access control must follow:

### Least Privilege

Give users only the access they need.

### Server-Side Enforcement

Never trust the frontend for authorization.

### Explicit Approval

Sensitive actions should require explicit permission.

### Auditability

Important access changes must be traceable.

### Separation of Responsibilities

Creation, approval and administration should be separable where appropriate.

### Secure Defaults

New users should not automatically receive broad business access.

---

# 43. Example: Sales Workflow Access

```text
Sales Executive
      │
      ├── Create Lead
      ├── Update Own Lead
      ├── Schedule Follow-up
      ├── Create Opportunity
      ├── Create Proposal
      └── View Assigned Clients
```

Sales Manager:

```text
Sales Manager
      │
      ├── View Team Leads
      ├── Assign Leads
      ├── View Team Opportunities
      ├── Review Pipeline
      ├── Review Proposals
      └── Approve Selected Actions
```

Management:

```text
Management
      │
      ├── View Global Sales
      ├── View Revenue
      ├── View Projects
      ├── View Workforce
      └── Perform Authorized Approvals
```

---

# 44. Example: Project Workflow Access

```text
Project Manager
      │
      ├── Create Project
      ├── Manage Milestones
      ├── Create Tasks
      ├── Assign Tasks
      ├── Monitor QA
      ├── Manage Client Review
      └── Track Delivery
```

Developer:

```text
Developer
      │
      ├── View Assigned Projects
      ├── View Assigned Tasks
      ├── Update Task
      ├── Submit for QA
      └── Comment
```

QA:

```text
QA
      │
      ├── View Assigned QA Work
      ├── Test
      ├── Pass
      ├── Fail
      └── Create Bug
```

---

# 45. Example: Finance Workflow Access

Employee:

```text
Employee
 ↓
Create Expense
 ↓
View Own Expense
```

Manager:

```text
Manager
 ↓
Review Team Expense
 ↓
Approve / Reject
```

Finance:

```text
Finance
 ↓
View Expenses
 ↓
Process Approved Expense
 ↓
Track Payments
 ↓
View Revenue
```

Management:

```text
Management
 ↓
View Global Financial Visibility
 ↓
Perform Authorized Approvals
```

---

# 46. Access Control Flow

The final authorization model is:

```text
                 USER
                   │
                   ▼
            Authentication
                   │
                   ▼
             Account Status
                   │
                   ▼
               ROLE(S)
                   │
                   ▼
             PERMISSIONS
                   │
                   ▼
                SCOPE
                   │
                   ▼
            RECORD OWNERSHIP
                   │
                   ▼
           ACCESS DECISION
              │         │
            ALLOW      DENY
```

---

# 47. Final RBAC Model

Webxode OS V1 follows:

```text
User
 │
 ├── Account Type
 │      ├── ADMIN
 │      └── USER
 │
 ├── Business Role(s)
 │      ├── Sales
 │      ├── Presales
 │      ├── Project
 │      ├── Development
 │      └── Other
 │
 ├── Permissions
 │      ├── View
 │      ├── Create
 │      ├── Update
 │      ├── Assign
 │      ├── Approve
 │      └── Other Actions
 │
 └── Scope
        ├── Own
        ├── Assigned
        ├── Team
        ├── Department
        ├── Project
        └── Global
```

---

# 48. Final Principle

Webxode OS should not ask:

> **"What department does this user belong to?"**

and assume everything from that.

Instead, the system should determine:

> **Who is this user?**

> **What role are they performing?**

> **What actions are they allowed to perform?**

> **Which records are they allowed to access?**

> **What approval authority do they have?**

This creates a flexible access-control system that can evolve as Webxode grows.

> **Roles define responsibility.**

> **Permissions define capability.**

> **Scopes define visibility.**

> **Ownership defines accountability.**

> **Audit logs define traceability.**
