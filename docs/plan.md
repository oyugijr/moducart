# 🧩 **Project Overview: ModuCart**

A modular **e-commerce microservices system** built with:

* **Node.js + Express** for APIs
* **MongoDB, Redis, PostgreSQL, and MySQL** for service databases
* **RabbitMQ** for messaging
* **gRPC** for Discount Service
* **Docker & Docker Compose** for orchestration
* **API Gateway** for routing
* **EJS Frontend** for user interface

---

## 📋 **1. Global Project Setup**

### Tasks

* [ ] Create root folder `moducart/`
* [ ] Initialize `.gitignore`, `docker-compose.yml`, and global `.env`
* [ ] Configure Docker network for all services
* [ ] Create shared `README.md` and `Makefile`
* [ ] Add helper scripts for build and container management

---

## 🧱 **2. API Gateway**

**Purpose:** Central routing for all APIs.

### Tasks2

* [ ] Create `api-gateway/` using Express
* [ ] Configure routes for:

  * `/api/catalog` → Catalog API
  * `/api/basket` → Basket API
  * `/api/discount` → Discount API
  * `/api/order` → Ordering API
* [ ] Add middleware (rate limiting, logging, security, CORS)
* [ ] Add Dockerfile and `.env`
* [ ] Connect to frontend service

---

## 🛒 **3. Catalog API (MongoDB)**

**Purpose:** Manage products and categories.

### Tasks3

* [x] Create `catalog-api/` structure
* [x] Implement `Product` and `Category` models
* [x] Add CRUD routes for products and categories
* [x] Connect to MongoDB
* [x] Add seeding logic
* [x] Add Dockerfile and `.env`
* [x] Integrate with API Gateway
* [ ] Add pagination and filtering support
* [ ] Add product image upload feature

---

## 🧺 **4. Basket API (Redis)**

**Purpose:** Handle user shopping carts.

### Tasks4

* [x] Create `basket-api/` with Express
* [x] Connect to Redis
* [x] Implement CRUD operations
* [x] Add Dockerfile and `.env`
* [ ] Add automatic cart expiration
* [ ] Publish checkout event to RabbitMQ

---

## 💸 **5. Discount API (PostgreSQL + gRPC)**

**Purpose:** Manage discounts via gRPC.

### Tasks5

* [x] Create `discount-api/` folder and structure
* [x] Define `discount.proto`
* [x] Implement gRPC server
* [x] Connect PostgreSQL using Sequelize or pg
* [x] Add `init.sql` for table creation
* [x] Add CRUD routes and gRPC handlers
* [ ] Add Redis caching (optional)
* [ ] Add migration & reseeding script

---

## 📦 **6. Ordering API (MySQL)**

**Purpose:** Handle order creation and persistence.

### Tasks6

* [x] Create `ordering-api/`
* [x] Connect to MySQL via Sequelize
* [x] Implement `Order` and `OrderItem` models
* [x] Add CRUD routes
* [x] Consume checkout events via RabbitMQ
* [ ] Add payment processing integration
* [ ] Add Dockerfile and `.env`

---

## 🐇 **7. RabbitMQ Message Broker**

**Purpose:** Event-based service communication.

### Tasks7

* [x] Add RabbitMQ to docker-compose
* [x] Set up producer in Basket API
* [x] Set up consumer in Ordering API
* [ ] Add exchange for system-wide events (e.g., order completed)

---

## 🧰 **8. Common Utilities**

**Purpose:** Shared configuration and event definitions.

### Tasks8

* [ ] Create `shared/` folder
* [ ] Add common event DTOs for RabbitMQ
* [ ] Add centralized logging utility
* [ ] Add error response formatter

---

## 🖥️ **9. Web Frontend (EJS + Express)**

**Purpose:** User-facing web interface.

### Tasks9

* [ ] Create `web-frontend/` folder
* [ ] Install Express, EJS, Axios, dotenv
* [ ] Add folder structure:

```sh
  web-frontend/
   ├── views/
   │   ├── index.ejs
   │   ├── products.ejs
   │   ├── cart.ejs
   │   ├── checkout.ejs
   │   └── orders.ejs
   ├── routes/
   ├── controllers/
   ├── public/
   │   ├── css/
   │   ├── js/
   └── app.js
```

* [ ] Implement product listing page (fetch from Catalog API)
* [ ] Implement cart page (fetch from Basket API)
* [ ] Implement discount display (consume gRPC data via Discount API REST proxy)
* [ ] Implement checkout & order confirmation (via Ordering API)
* [ ] Add Bootstrap or Tailwind for styling
* [ ] Add Dockerfile and `.env`
* [ ] Integrate with API Gateway (proxy to backend services)
* [ ] Add authentication placeholders (login/register pages if needed)

---

## 🔐 **10. Authentication Service (Optional)**

**Purpose:** Manage users and JWT tokens.

### Tasks10

* [ ] Create `auth-api/`
* [ ] Add registration, login, JWT generation
* [ ] Add middleware to protect checkout/order routes
* [ ] Integrate with frontend

---

## 📊 **11. Observability & Monitoring**

**Purpose:** Keep track of logs and health.

### Tasks11

* [ ] Add Winston + Morgan logging
* [ ] Add `/health` endpoint in every API
* [ ] Add Docker health checks
* [ ] Optionally integrate Prometheus + Grafana

---

## 🚀 **12. Deployment Setup**

**Purpose:** Container orchestration and CI/CD.

### Tasks12

* [ ] Create `docker-compose.prod.yml`
* [ ] Configure `.env` for production
* [ ] Set up GitHub Actions for CI/CD
* [ ] Deploy to cloud (Render / AWS / GCP / DigitalOcean)
* [ ] Set up reverse proxy (NGINX or Traefik)

---

## 🧾 **13. Documentation**

**Purpose:** Guide for contributors and users.

### Tasks13

* [ ] Update root `README.md` with all service details
* [ ] Add setup steps for Docker
* [ ] Include architecture diagram
* [ ] Add `CONTRIBUTING.md`, license, and Postman collection

---
