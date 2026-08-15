# Test case inventory

Open [`test-cases.csv`](./test-cases.csv) in Excel or Google Sheets for the living inventory of automated and planned Genki Wardrobe E2E cases.

## Columns

| Column | Description |
|--------|-------------|
| Area | Module (Login, Cart, Checkout, …) |
| Name | Short unique case title |
| Objective | Risk / behavior under test |
| Priority | `P0` / `P1` / `P2` |
| Labels | Tags such as `smoke`, `regression`, `auth`, `@email`, `checkout` |
| Owner | Default `QA` |
| Preconditions | Account, cart, or env setup |
| Test Steps | Numbered steps |
| Expected Result | Observable outcome |
| Automation status | See below |

## Automation status

| Status | Meaning |
|--------|---------|
| `Covered` | Implemented in Playwright and expected to run |
| `Planned` | Documented; not yet automated |
| `Partial` | Spec exists but does not fully meet the objective |
| `Blocked` | Cannot automate yet (site bug, missing sandbox creds, etc.) |

Update `Automation status` whenever a matching spec is added, changed, or blocked.
