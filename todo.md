# ModuCart Backlog & Actionable TODOs

This file contains a prioritized GitHub-style backlog and a PR checklist you can copy into issues/PR templates. It reflects the current project state (API Gateway, Catalog, Basket, Discount, Ordering, shared utilities) and the `docs/plan.md` master plan.

---

## How to use

- Copy any item under **Backlog (Issues)** into a GitHub issue and set labels and assignees.
- Use the `Estimate` field as a guideline (Small = ~1 day, Medium = 2-4 days, Large = 1+ week) — adapt to your team's velocity.
- Use the PR checklist at the bottom for pull request reviews.

---

## Priority Legend

- P0 — Critical to user flow / blocking (auth, checkout, payments)
- P1 — Important features / reliability (events, persistence, caching)
- P2 — UX, polish, ops, docs
- P3 — Nice-to-have

Effort: S (Small ~4–8h), M (Medium ~1–3d), L (Large ~1+ week)

---

## Backlog (Issues) — Prioritized

1) [P0][Auth] Implement `auth-api` service (register/login, JWT)

- Summary: Create a standalone `auth-api` service with user registration, login, password hashing, JWT issuance, and token validation middleware.
- Acceptance criteria:
  - POST /auth/register, POST /auth/login endpoints working
  - JWT tokens issued and validated by middleware
  - Integration with api-gateway sessions (or optional gateway JWT proxy)
- Estimate: L
- Labels: auth, backend, api, security
- Dependencies: none

2) [P0][Ordering] Add payment integration to `ordering-api`

- Summary: Integrate a payment gateway (Stripe or sandbox) or implement a payment-mock for dev; extend order creation to record payment status.
- Acceptance criteria:
  - Checkout flow reaches ordering-api and returns paid/failed status
  - Orders have payment state in DB
- Estimate: M-L
- Labels: payments, ordering, backend
- Dependencies: auth-api (for secure checkout), RabbitMQ wiring

3) [P0][Events] Ensure Basket->Ordering checkout event pipeline is reliable

- Summary: Implement event publishing in `basket-api` on checkout and robust consumer in `ordering-api` with ack/retry.
- Acceptance criteria:
  - Basket publishes standardized event (schema in `shared/`)
  - Ordering consumes, creates order, publishes order.completed
  - Messages are acked; failed handling/retry exists
- Estimate: M
- Labels: messaging, rabbitmq, backend
- Dependencies: RabbitMQ running in docker-compose

4) [P1][Catalog] Add pagination + filtering to `catalog-api` products

- Summary: Support page, limit, category, price range query params; return metadata (totalPages, count).
- Acceptance criteria: paginated endpoints return consistent metadata & links
- Estimate: M
- Labels: catalog, api

5) [P1][Catalog] Add product image upload support

- Summary: Add image upload endpoint, store files (local / S3) and save URLs in product model.
- Acceptance criteria: product create/update accepts image; product list returns image URLs
- Estimate: M
- Labels: storage, catalog

6) [P1][Discount] Add Redis caching + migrations

- Summary: Add cache layer for discount lookups and add DB migrations + reseed scripts.
- Acceptance criteria: discount reads hit cache on repeated lookups; migrations available
- Estimate: M
- Labels: discount, db, caching

7) [P1][Basket] Add TTL / automatic expiration for carts

- Summary: Keys in Redis should use expiry; expired carts cleaned and optionally publish cart.expired event.
- Acceptance criteria: carts expire in configured TTL; UI handles expired cart gracefully
- Estimate: S
- Labels: basket, redis

8) [P1][Observability] Add /health endpoints and Docker healthchecks

- Summary: All services (api-gateway, catalog, basket, discount, ordering) expose `/health` and Docker Compose includes healthchecks.
- Acceptance criteria: docker-compose healthchecks pass in dev; services return OK
- Estimate: S-M
- Labels: ops, health

9) [P1][Logging] Consolidate logging using shared logger util

- Summary: Wire all services to use `shared/utils/logger.js` (Winston) for structured logs and error formats.
- Acceptance criteria: services log JSON with level/timestamp/service fields
- Estimate: M
- Labels: logging, shared

10) [P2][Frontend] Implement storefront pages (product listing, cart, checkout)

- Summary: Add `web-frontend/` or extend api-gateway views to serve: index, products, cart, checkout, orders pages.
- Acceptance criteria: Basic storefront can list products, add to cart, proceed to checkout (use payment)
- Estimate: L
- Labels: frontend, ejs
- Dependencies: catalog-api, basket-api, ordering-api

11) [P2][Docs] Expand README and contributor docs

- Summary: Add clear dev setup, environment variables, ports, and architecture diagram to root README; add CONTRIBUTING.md and Postman collection.
- Acceptance criteria: README contains step-by-step local dev instructions for running all services with docker-compose
- Estimate: S-M
- Labels: docs

12) [P2][Tests] Add unit + integration tests

- Summary: Add unit tests for critical logic (catalog, ordering) and a small E2E test (create product -> add to cart -> checkout) using a test harness.
- Acceptance criteria: CI runs tests and they pass locally
- Estimate: M-L
- Labels: tests, ci

13) [P3][UX] Improve admin dashboard recent orders and fallbacks

- Summary: Sort recent orders by createdAt desc, limit to 6, show "No recent orders" banner when empty.
- Acceptance criteria: Dashboard shows latest orders or friendly empty state
- Estimate: S
- Labels: frontend, admin

14) [P3][Ops] Add GitHub Actions CI pipeline (build/test/docker-compose up)

- Summary: Create basic CI that runs lint, unit tests, and a smoke docker-compose up for core services.
- Acceptance criteria: PRs run CI and show status
- Estimate: M
- Labels: ci, ops

15) [P3][Nice] Prometheus + Grafana integration

- Summary: Instrument services with `/metrics` endpoints and add simple Prometheus config + Grafana dashboards
- Estimate: L
- Labels: monitoring

---

## Suggested issue templates (copy into GitHub issue body)

### Feature / Bug Issue Template

```
**Summary**: (one-line)

**Context / Background**:

**Acceptance criteria**:
- [ ] criterion 1
- [ ] criterion 2

**Estimate**: S / M / L
**Labels**: (e.g., backend, auth, catalog)
**Assignees**:
**Dependencies**:
```

---

## PR Checklist (copy into PR descriptions)

- [ ] Code compiles / lints (if applicable)
- [ ] Unit tests added for new behavior (or rationale provided)
- [ ] Integration/manual test steps in PR description
- [ ] DB migrations included (if schema changes)
- [ ] Docs updated (README or relevant doc)
- [ ] Security checks (no secrets committed, input validation)
- [ ] Performance considerations noted

---

## Notes & Next Steps

- I can create GitHub issues from this backlog by generating Markdown for each issue and optionally open them if you give me repo permissions / CI details.
- I can also create `docs/ISSUE_TEMPLATE.md` and `docs/PULL_REQUEST_TEMPLATE.md` in the repo if you'd like.

---

*Generated from `docs/plan.md` and repository scan on 2025-10-24.*
