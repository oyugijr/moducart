# 🛒 ModuCart — Microservices-based E-commerce System

**ModuCart** is a modular, microservices-driven e-commerce backend system built for scalability, maintainability, and extensibility.  
It is designed to simulate a real-world online shopping platform with independent services communicating asynchronously.

---

## 📦 Architecture Overview

The system is built with **Node.js**, **Express**, and multiple databases.  
Each service runs independently and communicates via **RabbitMQ** or **REST APIs**.

### Services

1. **API Gateway** — Central entry point for all requests  
2. **Catalog API** — Manages products and categories (MongoDB)  
3. **Basket API** — Manages shopping carts (Redis)  
4. **Discount API** — Handles discount coupons (gRPC + PostgreSQL)  
5. **Ordering API** — Manages orders and order status (MySQL)  
6. **EJS Frontend Layer** — Provides a simple server-rendered UI for interactions

---

## 🧱 Technologies

- **Node.js / Express.js**
- **Docker & Docker Compose**
- **MongoDB** (Catalog)
- **Redis** (Basket)
- **PostgreSQL** (Discount)
- **MySQL** (Ordering)
- **RabbitMQ** (Message Broker)
- **gRPC** (Service Communication)
- **EJS** (Frontend Template Engine)
- **dotenv** for configuration
- **Winston / Morgan** for logging
- **Jest / Supertest** for testing

---

## ⚙️ Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/ModuCart.git
cd ModuCart
````

### 2. Environment Variables

Each service has its own `.env` file.

Example for **Catalog API**:

```bash
PORT=8001
MONGO_URI=mongodb://mongo:27017/catalogdb
```

Example for **Basket API**:

```bash
PORT=8002
REDIS_HOST=redis
REDIS_PORT=6379
```

Example for **Discount API**:

```bash
PORT=8003
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=discountdb
POSTGRES_HOST=postgres
GRPC_PORT=50051
```

Example for **Ordering API**:

```bash
PORT=8004
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DB=orderingdb
MYSQL_HOST=mysql
RABBITMQ_URL=amqp://rabbitmq:5672
```

### 3. Start with Docker

```bash
docker-compose up --build
```

This command:

- Spins up all services
- Seeds the PostgreSQL and MySQL databases
- Sets up RabbitMQ, MongoDB, Redis
- Starts all APIs
- Launches the EJS frontend

---

## 📁 Project Structure

```js
ModuCart/
│
├── api-gateway/
│   ├── routes/
│   ├── controllers/
│   ├── utils/
│   ├── app.js
│   └── Dockerfile
│
├── catalog-api/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── ejs-views/
│   ├── services/
│   ├── app.js
│   ├── Dockerfile
│   └── .env
│
├── basket-api/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── app.js
│   ├── Dockerfile
│   └── .env
│
├── discount-api/
│   ├── proto/
│   ├── server.js
│   ├── seed/
│   ├── Dockerfile
│   └── .env
│
├── ordering-api/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── Dockerfile
│   └── .env
│
├── docker-compose.yml
└── README.md
```

---

## 🧩 EJS Frontend Integration

- Each microservice exposes REST endpoints.
- The **API Gateway** integrates these APIs and renders pages using **EJS**.
- Views are located under `/views` and rendered dynamically based on data fetched from the microservices.

Example route in API Gateway:

```js
router.get('/products', async (req, res) => {
  const response = await axios.get(`${CATALOG_API_URL}/products`);
  res.render('products', { products: response.data });
});
```

---

## 🧪 Testing

Each service contains unit and integration tests.

Run tests inside any service:

```bash
npm test
```

---

## 🚀 Deployment

You can deploy all services together using Docker Compose or individually on different hosts.

To run in detached mode:

```bash
docker-compose up -d
```

To stop all:

```bash
docker-compose down
```

---

## 🧰 Future Enhancements

- Add authentication service (JWT-based)
- Add payment service (M-Pesa + Stripe)
- Add monitoring (Prometheus + Grafana)
- Add caching layer and performance metrics
- Improve EJS frontend and add admin dashboard

---

## 👥 Contributors

- **Oyugi** — Software Engineer & Project Lead
- Open for collaboration — PRs welcome!

---

## 📄 License

MIT License © 2025
