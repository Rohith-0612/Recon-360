# Recon 360

Recon 360 gives Customer Success, Sales, and Finance one reconciled view of every account — usage, billing, and CRM signals combined — instead of three disconnected ones. It's built around the demo account "Client Radar."

## What it does

For every account, Recon 360 shows:

- **Health score** — a 0–100 score with a status (Healthy / At Risk / Critical)
- **Renewal risk** — how urgent the upcoming renewal is
- **Margin %** — how profitable the account is to serve
- **Upsell opportunities** — where there's room to expand or fix billing gaps
- **Alerts** — early-warning signals before they show up in the health score
- **A recommended next action** — with the evidence behind it, and a suggested owner

## Pages

### Client Radar (home)
The portfolio view. KPI tiles for total ARR, gross margin %, account count, and at-risk accounts, plus a full account table (ACV, usage growth, margin %, health, renewal risk) sorted by risk. Includes a search bar to jump straight to an account.

### Client info page
Opens when you click an account from Client Radar. Shows:
- Account header — ACV, tenure, renewal date, products in use
- An auto-generated summary of why the account looks the way it does
- Overall health score and the five drivers behind it (Utilization, Value Delivered, Timely Payments, Products, Relationship)
- **Product Truth Layer** — a table of what was bought vs. used vs. billed per product, with utilization and status
- Usage trend chart per product
- **Evidence** — the top signals behind the account's current status
- **Recommended action** — a suggested next step and owner, with buttons to create a Salesforce follow-up or send a Slack alert (these are simulated in this demo, not wired to live Salesforce/Slack)
- An auto-generated QBR narrative summarizing the account

### Upsell Engine
Surfaces expansion opportunities automatically: a chart of the top accounts by opportunity size, and a table of auto-generated plays (the triggering signal, current commit vs. actual usage, the recommendation, estimated ACV uplift, and who it's routed to).

### Margin
A per-account view of cost-to-serve and margin %, flagging accounts that are margin-healthy, low-margin, or "hidden" (healthy on paper but quietly unprofitable).

### Alerts
A portfolio-wide feed of leading-indicator alerts — stale data uploads, usage anomalies, and billing mismatches — with a severity breakdown (High / Opportunity / Medium) so nothing waits for the next monthly health-score refresh.

### Value Report
A one-click, client-ready value summary per account (ROI multiplier, products adopted, etc.) meant for QBRs and renewal conversations. Exportable as a PDF.

### Migration Insight
Identifies which accounts are good candidates to move to token-based pricing, and why — a portfolio overview, a prioritized queue, and a plan per account.

## A note on the data

All data in this app is illustrative/demo data. Action buttons (Salesforce follow-up, Slack alert) are simulated for demonstration purposes.
