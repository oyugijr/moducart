# Ordering API

This service handles order placement and publishes `order_created` events to RabbitMQ, and stores orders in a MySQL database.

## Overview

- HTTP server implemented in Node.js + Express.
- Persists orders to MySQL (`mysql2`), publishes events to RabbitMQ (`amqplib`).
- Exposes a health endpoint at `/health` and accepts new orders at `POST /orders`.
- Supports idempotency via `Idempotency-Key` header (or a body field if present) — sending the same key twice returns the same stored order.

## Prerequisites

- Node.js (LTS recommended)
- npm or pnpm
- MySQL server accessible to the service
- RabbitMQ (amqp) broker
- Docker (optional, recommended for dev quickstart)

## Key files

- `src/index.js` — main server bootstrap
- `src/db.js` — MySQL pool and connection helper
- `src/orderModel.js` — DB schema init and order persistence
- `src/orderService.js` — request handlers
- `src/rabbit.js` — RabbitMQ connection & publish helper

## Environment variables

Create a `.env` file in the `ordering-api` folder. Example:

```sh
# MySQL
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DATABASE=orders_db
MYSQL_CONN_LIMIT=5

# RabbitMQ (use amqp://user:pass@host:5672)
RABBIT_HOST=amqp://guest:guest@127.0.0.1:5672
ORDER_QUEUE=order_created

# Server
PORT=4004
```

Adjust values to match your local environment or Docker Compose service names.

## Install dependencies

Open PowerShell in the `ordering-api` folder and install:

```powershell
Set-Location -Path "d:\Projects\EOS\Oprog\moducart\ordering-api"
# using npm
npm install
# or using pnpm
# pnpm install
```

The `package.json` includes:

- `npm run dev` → runs `node index.js`
- `npm start` → runs `nodemon index.js` (auto-reload during development)

## Running supporting services (quick Docker)

Option A — Docker Compose (if using the repo compose file):

```sh
Set-Location -Path "d:\Projects\EOS\Oprog\moducart"
docker compose up -d mysql rabbitmq
# or to bring up everything:
# docker compose up -d
```

Option B — Individual Docker containers:

```sh
# MySQL
docker run -d --name moducart-mysql -e MYSQL_ROOT_PASSWORD=yourpassword -e MYSQL_DATABASE=orders_db -p 3306:3306 mysql:8

# RabbitMQ with management UI
docker run -d --name moducart-rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

Make sure `.env` values match the container host/ports.

## Start the service

From `ordering-api`:

```powershell
# start with node (recommended for production-like run)
npm run dev

# during development with auto-restart
npm start
```

You should see logs indicating the server is listening and database/rabbit attempts. The service tries to initialize the DB schema on start.

## Health check

Verify the service is up:

PowerShell:

```powershell
Invoke-RestMethod -Uri "http://localhost:4004/health" -Method GET
```

curl:

```bash
curl -sS http://localhost:4004/health | jq .
```

Expected: a success response indicating the server is alive.

## Example order payload

The service expects a JSON body with at least `userId`, `items` (array of objects with `productId`, `price`, and `quantity`), and `total`.

PowerShell example (with Idempotency-Key):

```powershell
$body = @{
  userId = "user-123"
  items = @(
    @{ productId = "p-1"; price = 10.00; quantity = 2 }
    @{ productId = "p-2"; price = 5.00; quantity = 1 }
  )
  total = 25.00
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Uri "http://localhost:4004/orders" `
  -Method POST `
  -Body $body `
  -ContentType "application/json" `
  -Headers @{ "Idempotency-Key" = "test-key-001" }
```

curl example:

```bash
curl -X POST http://localhost:4004/orders \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: test-key-001" \
  -d '{"userId":"user-123","items":[{"productId":"p-1","price":10.0,"quantity":2},{"productId":"p-2","price":5.0,"quantity":1}],"total":25.0}'
```

The API validates that the `total` matches the sum of `price * quantity` for `items`. If it doesn't, the request returns 400.

## Idempotency

- Provide an `Idempotency-Key` header with each create-order request. If you retry the same request with the same key, the service returns the existing order instead of creating a duplicate.

## Troubleshooting

- DB connection errors:
  - Confirm `.env` values and the MySQL server is reachable (ping the host or use a DB client).
  - Check MySQL container logs: `docker logs moducart-mysql`.
  - The server will log retry attempts from `src/db.js`.

- RabbitMQ connectivity:
  - Verify `RABBIT_HOST` is correct and management UI is reachable at <http://localhost:15672> (guest/guest by default).
  - If the broker is unreachable the service will attempt reconnects; publishing may return false until channel is ready.

- Port 4004 already in use:
  - Change `PORT` in `.env` and restart.

## Next improvements (ideas)

- Add a small integration test script to exercise /health and /orders automatically.
- Add DB migration tooling (e.g., Knex/umzug) instead of ad-hoc init.
- Add a docker-compose file that brings ordering-api together with a local MySQL and RabbitMQ for a single-command dev start.

---

If you want, I can:

- Add a tiny PowerShell smoke-test script under `ordering-api/scripts` that runs the health check and posts a sample order (idempotent test).
- Add a `docker-compose.override.yml` for dev to start the API, MySQL and RabbitMQ together.

Which one would you like next?
