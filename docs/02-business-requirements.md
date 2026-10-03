# Webxode OS — Business Requirements

**Product:** Webxode OS
**Company:** Webxode Technologies
**Document:** Business Requirements
**Version:** V1
**Status:** Initial Business Requirements
**Architecture Direction:** Modular Monolith

---

## 1. Purpose

Webxode OS is the internal business operating platform for Webxode Technologies.

The system must standardize and manage the complete business lifecycle:

**Lead Generation → Lead Management → Sales → Qualification → Presales → Proposal → Quotation → Negotiation → Client Confirmation → Onboarding → Project Delivery → Payment → Support → Renewal / Upsell**

The primary purpose of V1 is to create a repeatable operating system for Webxode so that business activities do not depend entirely on the founder.

The platform must help the team:

- Capture and manage business opportunities.
- Follow up with leads consistently.
- Convert qualified opportunities into clients.
- Standardize requirement analysis and presales.
- Create proposals and quotations.
- Manage client onboarding.
- Execute projects systematically.
- Track employee responsibilities.
- Monitor payments and revenue.
- Manage operational activities.
- Provide management visibility.
- Maintain accountability and audit history.

---

# 2. Business Objectives

Webxode OS must support the following business objectives.

### 2.1 Increase Sales Conversion

The system should ensure that every genuine opportunity has:

- An owner.
- A current stage.
- A next action.
- A follow-up date.
- Relevant communication history.
- Clear qualification status.

The system should make it difficult for qualified opportunities to become inactive without visibility.

---

### 2.2 Standardize Presales

Presales must follow a structured process:

**Requirement → Analysis → Solution → Estimation → Pricing → Proposal → Quotation → Negotiation → Approval → Confirmation**

The objective is to reduce inconsistent pricing, unclear scope, and incomplete requirements.

---

### 2.3 Improve Project Delivery

Once a client confirms a project, the system should convert the commercial opportunity into an operational project.

The project should have:

- Defined scope.
- Project owner.
- Team members.
- Milestones.
- Phases.
- Tasks.
- Deliverables.
- Deadlines.
- QA process.
- Client review.
- Delivery status.

---

### 2.4 Establish Accountability

Every important business activity must have an identifiable owner.

Examples:

- Lead owner.
- Follow-up owner.
- Presales owner.
- Project manager.
- Task assignee.
- QA assignee.
- Expense approver.
- Payment owner.

The system should make responsibility visible rather than relying on informal communication.

---

### 2.5 Reduce Founder Dependency

The business should be able to operate through defined workflows and responsibilities even when the founder is not directly involved in every activity.

Management should be able to see:

- What is happening.
- Who owns it.
- What is pending.
- What is overdue.
- What requires approval.
- What requires attention.

---

# 3. Business Operating Model

Webxode OS is based on the following operating model:

```text
Lead Generation
      ↓
Lead Management
      ↓
Qualification
      ↓
Opportunity
      ↓
Requirement Analysis
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
Client Onboarding
      ↓
Project Creation
      ↓
Project Delivery
      ↓
Payment / Revenue
      ↓
Support / Maintenance
      ↓
Renewal / Upsell
```

Each stage must have a clear:

- Owner
- Status
- Action
- Input
- Output
- Next step

---

# 4. Business Actors

Webxode OS must support different business responsibilities without hardcoding specific job titles.

The initial business roles may include:

- Management
- Sales Executive
- Sales Manager
- Presales Executive
- Project Manager
- Developer
- Designer
- QA
- Finance
- Operations
- Admin

These are business roles.

The system-level account types are:

### ADMIN

Administrative access to configure and manage the platform.

### USER

Normal employee account whose business permissions are determined through assigned roles.

Business roles and permissions must remain configurable.

---

# 5. Lead Management

## 5.1 Lead Sources

The system must support leads from multiple sources.

Initial sources:

- Manual Entry
- Website
- LinkedIn
- Referral
- Cold Calling
- Lead Scraping / Import
- Google
- Advertising
- Partner
- Existing Client
- Other

The system should allow additional sources to be added later.

---

## 5.2 Lead Information

A lead should contain relevant information such as:

- Lead name
- Company / business name
- Contact person
- Phone
- Email
- Location
- Industry
- Lead source
- Interested service
- Requirement summary
- Estimated value
- Lead owner
- Priority
- Status
- Next follow-up
- Notes
- Communication history
- Created date
- Updated date

The system should avoid unnecessary data collection.

---

## 5.3 Lead Assignment

Every active lead should have an owner.

Lead assignment may happen through:

- Manual assignment.
- Admin assignment.
- Manager assignment.
- Future automated assignment.

The assigned employee becomes responsible for progressing the lead.

---

# 6. Lead Qualification

A lead must be evaluated before significant presales effort is invested.

Qualification should consider factors such as:

- Genuine requirement.
- Business fit.
- Budget indication.
- Decision-maker availability.
- Project timeline.
- Service suitability.
- Client seriousness.
- Communication responsiveness.

Qualification outcomes:

- Qualified
- Unqualified
- Nurture
- Lost

A lost or unqualified opportunity should have a reason recorded.

---

# 7. Sales Pipeline

The initial sales pipeline is:

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

A lead may also move to:

```text
Lost
```

---

## 7.1 Pipeline Rules

Every active opportunity should have:

- Current stage.
- Owner.
- Next action.
- Follow-up date.
- Expected value where applicable.
- Last activity.
- Next activity.

The system should highlight opportunities with no recent activity.

---

# 8. Sales Activities

Sales employees must be able to record activities including:

- Phone call
- Follow-up
- Meeting
- WhatsApp communication
- Email
- Callback
- Requirement discussion
- Proposal discussion
- Negotiation
- Other sales activity

Each activity should support:

- Date/time.
- Activity type.
- Related lead/client.
- Owner.
- Notes.
- Outcome.
- Next action.

---

# 9. Follow-Up Management

Follow-ups are a core business requirement.

The system must provide a centralized follow-up queue.

Employees should be able to see:

### Today

- Calls due.
- Follow-ups due.
- Meetings.
- Callbacks.
- Proposal follow-ups.

### Upcoming

- Future follow-ups.
- Meetings.
- Scheduled actions.

### Overdue

- Missed follow-ups.
- Overdue callbacks.
- Unresolved sales actions.

The objective is simple:

> Every important opportunity should always have a next action.

---

# 10. Opportunity Management

A qualified lead can become an opportunity.

An opportunity represents a genuine commercial possibility for Webxode.

An opportunity should track:

- Client/lead.
- Service.
- Requirement.
- Estimated value.
- Owner.
- Stage.
- Probability if introduced later.
- Expected closing period.
- Presales owner.
- Proposal.
- Quotation.
- Negotiation history.
- Final outcome.

---

# 11. Requirement Analysis

Before preparing a proposal or quotation, requirements must be documented.

Requirement analysis should capture:

- Business problem.
- Client objective.
- Current process.
- Required solution.
- Functional requirements.
- Technical requirements where applicable.
- Integrations.
- User requirements.
- Expected deliverables.
- Timeline.
- Constraints.
- Assumptions.
- Dependencies.
- Out-of-scope requirements.

The requirement should be understandable by both business and delivery teams.

---

# 12. Presales Process

The standard presales process is:

```text
Requirement
    ↓
Requirement Analysis
    ↓
Solution Planning
    ↓
Scope Definition
    ↓
Effort Estimation
    ↓
Pricing
    ↓
Proposal
    ↓
Quotation
    ↓
Negotiation
    ↓
Approval
    ↓
Client Confirmation
```

Presales must ensure that the project is commercially and operationally understood before confirmation.

---

# 13. Estimation

Estimation may consider:

- Project type.
- Features.
- Complexity.
- Development effort.
- Design effort.
- QA effort.
- Infrastructure.
- Third-party services.
- Maintenance/support.
- Timeline.
- Internal resource availability.

The system should eventually allow estimation to be converted into a commercial price.

---

# 14. Proposal Management

The system must support proposal creation and tracking.

A proposal may include:

- Client information.
- Business requirement.
- Proposed solution.
- Scope.
- Deliverables.
- Technology approach where relevant.
- Timeline.
- Assumptions.
- Exclusions.
- Commercial information.
- Terms and conditions.

Proposal statuses may include:

- Draft
- Internal Review
- Approved
- Sent
- Viewed
- Revision Required
- Accepted
- Rejected
- Expired

---

# 15. Quotation Management

Quotation management is a controlled business process.

A quotation should contain:

- Client.
- Project/service.
- Items.
- Quantity.
- Unit price.
- Discount.
- Tax where applicable.
- Total value.
- Validity.
- Payment terms.
- Terms and conditions.

Quotation workflow:

```text
Draft
 ↓
Internal Review
 ↓
Approval
 ↓
Sent to Client
 ↓
Negotiation
 ↓
Accepted / Rejected
```

Important commercial changes should be auditable.

Examples:

- Price changes.
- Discount changes.
- Scope changes.
- Payment-term changes.

---

# 16. Negotiation Management

Negotiation should not exist only in chat history.

The system should record important commercial changes.

Examples:

- Original quotation.
- Revised quotation.
- Requested discount.
- Scope changes.
- Timeline changes.
- Payment-term changes.
- Final agreed value.

The objective is to maintain a clear commercial history.

---

# 17. Client Confirmation

When a client confirms the project, the opportunity should move to **Won**.

Client confirmation may involve:

- Proposal acceptance.
- Quotation acceptance.
- Agreement/SOW.
- Advance payment where applicable.
- Confirmation communication.

A confirmed opportunity should trigger the client onboarding process.

---

# 18. Client Management

A client profile should contain:

- Company/business information.
- Primary contacts.
- Contact history.
- Active projects.
- Completed projects.
- Commercial history.
- Documents.
- Payments.
- Support history.
- Notes.
- Future opportunities.

Client information should become the central relationship record after conversion.

---

# 19. Client Onboarding

Client onboarding should follow a standard process.

```text
Client Confirmation
      ↓
Agreement / SOW
      ↓
Advance / Initial Payment
      ↓
Requirement Finalization
      ↓
Assets & Access Collection
      ↓
Team Assignment
      ↓
Project Creation
      ↓
Kickoff Meeting
      ↓
Project Execution
```

Onboarding may collect:

- Logo/assets.
- Brand information.
- Content.
- Domain information.
- Hosting information.
- Required credentials/access.
- Business documents.
- Technical requirements.
- Contact information.

Sensitive credentials must be handled securely and should not be stored casually.

---

# 20. Project Management

Every confirmed project should have a structured project record.

A project should contain:

- Client.
- Project owner.
- Project manager.
- Team.
- Project type.
- Start date.
- Expected completion date.
- Commercial value.
- Scope.
- SOW.
- Milestones.
- Phases.
- Tasks.
- Deliverables.
- QA status.
- Client review.
- Deployment/delivery.
- Payment status.

---

# 21. Project Lifecycle

The standard delivery lifecycle is:

```text
Requirements
 ↓
Planning
 ↓
UI/UX
 ↓
Development
 ↓
Testing / QA
 ↓
Client Review
 ↓
Changes
 ↓
Deployment
 ↓
Handover
 ↓
Support / Maintenance
```

Not every project must use every phase.

The project type should determine the applicable workflow.

---

# 22. Task Management

Tasks should support:

- Title.
- Description.
- Project.
- Phase.
- Assignee.
- Reporter.
- Priority.
- Status.
- Due date.
- Estimated effort.
- Actual effort where required.
- Comments.
- Attachments.
- Dependencies where required.

Initial task statuses:

- To Do
- In Progress
- Blocked
- Developer Complete
- QA
- Client Review
- Done

---

# 23. Quality Assurance

Projects requiring QA should follow:

```text
Development
 ↓
Developer Complete
 ↓
QA
 ↓
Pass / Fail
```

If failed:

```text
QA
 ↓
Bug / Issue
 ↓
Developer
 ↓
QA
```

A completed task should not automatically be considered production-ready when QA is required.

---

# 24. Client Review

Client review may result in:

- Approved.
- Changes requested.
- New requirement.
- Bug reported.
- Scope change.

Existing scope changes should follow the Change Request process.

---

# 25. Change Request Management

A change request should follow:

```text
Client Request
      ↓
Change Request
      ↓
Impact Analysis
      ↓
Effort Estimation
      ↓
Cost / Timeline Impact
      ↓
Client Approval
      ↓
Task / Work Creation
```

A significant scope change should not be silently added to the original project.

---

# 26. Project Delivery

A project can be marked complete when required deliverables are completed and accepted according to the project agreement.

Project closure should capture:

- Final deliverables.
- Client approval.
- Deployment status.
- Handover information.
- Final payment status.
- Documentation.
- Support/maintenance status.

---

# 27. Support and Maintenance

After project delivery, the client may enter:

- Support.
- Maintenance.
- Retainer.
- Renewal.
- Upsell.
- Cross-sell.

Support activities should remain connected to the client and project history.

---

# 28. Workforce Management

Webxode OS must provide basic workforce visibility.

The system should support:

- Employee profiles.
- Department/team assignment.
- Business role.
- Work allocation.
- Attendance.
- Clock-in/out.
- Leave.
- Task workload.
- Assigned projects.
- Activity history.

V1 should focus on operational workforce management rather than becoming a complete HRMS.

---

# 29. Attendance

Employees should be able to:

- Clock in.
- Clock out.
- View attendance history.
- View working status.

Management should be able to view attendance information based on permissions.

---

# 30. Leave Management

The system should support:

- Leave request.
- Leave type.
- Start date.
- End date.
- Reason.
- Approval.
- Rejection.
- Leave history.

Basic workflow:

```text
Employee
 ↓
Leave Request
 ↓
Manager / Approver
 ↓
Approve / Reject
```

---

# 31. Internal Operations

The platform should support internal operational activities including:

- Meetings.
- Calendar events.
- Internal tickets.
- Notifications.
- Internal communication.
- Task coordination.

These capabilities should support the business rather than attempting to replace every external productivity application.

---

# 32. Finance Visibility

Webxode OS will provide operational finance visibility.

It is **not intended to replace InvoNext or become a complete accounting system.**

The system should track:

- Project value.
- Quotation value.
- Expected revenue.
- Advance.
- Payments.
- Collected amount.
- Outstanding amount.
- Project revenue.
- Client revenue.
- Expenses.
- Payment status.

---

# 33. Payment Tracking

Payment records should be associated with the relevant:

- Client.
- Project.
- Agreement/quotation where applicable.
- Payment milestone.
- Amount.
- Due date.
- Payment date.
- Status.

Example statuses:

- Pending
- Due
- Partially Paid
- Paid
- Overdue

---

# 34. Expense Management

Employees should be able to submit business expenses.

Expense categories may include:

- Travel.
- Food.
- Software.
- Hosting.
- Domain.
- Advertising.
- Office.
- Client Meeting.
- Equipment.
- Other.

Expense workflow:

```text
Employee Submit
      ↓
Manager Review
      ↓
Approve / Reject
      ↓
Finance
      ↓
Paid
```

Expenses may optionally be associated with a project.

---

# 35. Management Dashboard

Management should have a consolidated view of business operations.

The dashboard should provide visibility into:

### Sales

- New leads.
- Qualified leads.
- Active opportunities.
- Follow-ups.
- Meetings.
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

### Workforce

- Employee workload.
- Attendance.
- Pending approvals.
- Assigned work.

### Finance

- Expected revenue.
- Won revenue.
- Collected revenue.
- Outstanding payments.
- Expenses.

### Attention Items

The system should highlight things requiring action rather than only displaying statistics.

---

# 36. Notifications

The system should generate notifications for important business events.

Examples:

- New lead assigned.
- Follow-up due.
- Follow-up overdue.
- Meeting approaching.
- Proposal approved.
- Quotation approved.
- Client confirmation.
- Task assigned.
- Task overdue.
- QA failure.
- Client change request.
- SOW approved.
- Expense submitted.
- Expense approved/rejected.
- Payment due.
- Payment overdue.
- Milestone completed.

Notifications should be actionable where possible.

---

# 37. Approval Workflows

The system should support controlled approvals.

Initial approval areas:

- Quotations.
- Discounts.
- Proposals.
- SOW.
- Expenses.
- Leave.
- Project scope changes.
- Other management-controlled actions.

Approval rules should be configurable as the company grows.

---

# 38. Auditability

Important business changes must be traceable.

The system should record:

- Who performed the action.
- What changed.
- When it changed.
- Relevant record.
- Previous value where required.
- New value where required.

Examples:

- Quotation amount changed.
- Discount modified.
- Lead reassigned.
- Project status changed.
- Task reassigned.
- Expense approved.
- Payment updated.

---

# 39. Ownership and Accountability

The following principle applies across Webxode OS:

> **Every important business object must have clear ownership.**

Examples:

| Business Object | Primary Owner               |
| --------------- | --------------------------- |
| Lead            | Sales Owner                 |
| Opportunity     | Sales Owner                 |
| Requirement     | Presales Owner              |
| Proposal        | Presales Owner              |
| Quotation       | Sales / Presales Owner      |
| Client          | Relationship Owner          |
| Project         | Project Manager             |
| Task            | Assignee                    |
| QA Issue        | QA Assignee                 |
| Expense         | Employee / Approver         |
| Payment         | Finance / Responsible Owner |

Ownership may be transferred, but the system must retain the history.

---

# 40. Action-Oriented Business Design

Webxode OS should not become a system where employees only enter data.

The system should continuously answer:

**What should I do today?**

Examples:

- Call these leads.
- Follow up with these prospects.
- Review these requirements.
- Approve these quotations.
- Review these expenses.
- Complete these tasks.
- Test these builds.
- Follow up on these payments.
- Resolve these overdue items.

The platform should prioritize action over information overload.

---

# 41. Search and Visibility

Users should be able to find business information quickly.

Global search should eventually cover:

- Leads.
- Opportunities.
- Clients.
- Projects.
- Tasks.
- Quotations.
- Proposals.
- SOWs.
- Payments.
- Tickets.
- Meetings.
- Documents.

Search visibility must respect user permissions.

---

# 42. Business Rules

Initial business rules include:

1. Every active lead must have an owner.
2. Every active opportunity should have a next action.
3. Lost opportunities should have a reason.
4. Important commercial changes must be traceable.
5. Confirmed opportunities should be converted into client/project workflows.
6. Projects must have ownership.
7. Tasks must have assignees where execution is required.
8. Scope changes should use the change request process.
9. Expenses requiring approval must not bypass the approval workflow.
10. Payment status must be visible against relevant commercial records.
11. Sensitive credentials must not be stored casually.
12. Users should only access information allowed by their permissions and scope.
13. Important business actions should be auditable.
14. The system should avoid duplicate business records wherever practical.
15. Completed projects should remain part of the client's history.

---

# 43. V1 Out of Scope

The following are not core V1 business requirements:

- Full accounting.
- Payroll.
- Complete HRMS.
- Full recruitment system.
- Advanced ERP.
- Video conferencing.
- Full email replacement.
- Full Slack replacement.
- Full Microsoft Teams replacement.
- Advanced third-party integrations.
- AI business assistant.
- Predictive analytics.
- Advanced automation engine.
- Cloud infrastructure management.
- IoT management.
- Microservices architecture.
- Full client portal.

These may be considered in future versions.

---

# 44. Future Business Evolution

### V2 — Connected Business

Webxode OS can connect with external platforms such as:

- Google Workspace.
- Microsoft 365.
- Slack.
- GitHub.
- WhatsApp.
- Zoom.
- Other productivity and development platforms.

The purpose is to connect existing workflows rather than rebuild every external tool inside Webxode OS.

---

### V3 — Intelligent Business

AI and advanced analytics can enhance existing workflows through:

- Lead intelligence.
- Sales insights.
- Follow-up recommendations.
- Proposal assistance.
- Requirement analysis.
- Project risk detection.
- Revenue intelligence.
- Business recommendations.
- Intelligent automation.

AI should enhance the operating system rather than become a disconnected feature.

---

# 45. Success Criteria

Webxode OS V1 will be considered successful when Webxode can use it as the primary internal platform for:

### Sales

Lead capture → qualification → follow-up → opportunity → proposal → quotation → negotiation → conversion.

### Presales

Requirement → analysis → estimation → scope → proposal → quotation.

### Clients

Client conversion → onboarding → history.

### Delivery

Project → milestones → phases → tasks → QA → client review → delivery.

### Workforce

Employees → roles → workload → attendance → leave.

### Operations

Meetings → tickets → notifications → approvals.

### Finance Visibility

Project value → payments → outstanding → expenses → revenue visibility.

### Management

Sales → delivery → workforce → finance → attention items.

---

# 46. Core Business Principle

Webxode OS should become the internal system that defines **how Webxode does business.**

It should not merely record what happened.

It should help the company understand:

> **What is happening?**

> **Who owns it?**

> **What needs to happen next?**

> **What is delayed?**

> **What requires approval?**

> **What is generating revenue?**

> **Where is the business losing opportunities?**

The ultimate objective is to create a repeatable, measurable, accountable business operation that can scale beyond the founder.

---

## 47. Guiding Principle

> **Less data. Less clicking. More action.**

> **Architect for the future. Build for the present.**

> **Webxode OS is the operating system for how Webxode does business.**
