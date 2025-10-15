# ModuCart API Specifications

## API Gateway

- **Base URL:** `http://localhost:8000`
- Handles routing between services.
- Renders EJS templates for user-facing pages.

### Routes

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | / | Home page |
| GET | /products | List all products |
| POST | /basket/add | Add item to basket |
| POST | /checkout | Checkout and create order |

---

## Catalog API

- **Base URL:** `http://localhost:5001/api/catalog`

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | /products | Get all products |
| GET | /products/:id | Get a single product |
| POST | /products | Add new product |
| GET | /categories | Get all categories |

**MongoDB Collections:**

- `products`
- `categories`

---

## Basket API

- **Base URL:** `http://localhost:5002/api/basket`

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | /add | Add product to basket |
| GET | /:userId | Get user basket |
| DELETE | /:userId | Clear basket |

**Redis Keys:**  
`basket:{userId}` → stores cart data as JSON

---

## Discount API

- **Base gRPC Port:** `:50051`
- **REST Fallback (optional):** `http://localhost:5003/api/discounts`

### gRPC Methods

| Method | Request | Response |
|--------|----------|-----------|
| `GetDiscount(productId)` | Product ID | Discount Amount, Description |

**PostgreSQL Tables:**

- `discounts(id, product_id, description, amount, created_at, updated_at)`

---

## Ordering API

- **Base URL:** `http://localhost:5004/api/orders`

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | / | Create new order |
| GET | /:orderId | Get order details |

**MySQL Tables:**

- `orders`
- `order_items`

**RabbitMQ Queue:**

- `order_events` — stores async order messages.

---

## Message Flow Summary

1. **Catalog** → Fetch product info  
2. **Basket** → Store user cart  
3. **Discount** → Apply discount via gRPC  
4. **Ordering** → Save order & publish queue event  
5. **API Gateway** → Central entry point with EJS UI  

---

## EJS Views Summary

| View File | Description |
|------------|-------------|
| `products.ejs` | List products with category filters |
| `basket.ejs` | Show basket with total |
| `orders.ejs` | Display order status |
| `main.ejs` | Shared layout for all pages |

---

## Developer Notes

- All services run in Docker (`docker-compose up -d`)
- Common `.env` variables control database hosts & ports
- Communication:
  - REST (JSON)
  - gRPC (Discounts)
  - RabbitMQ (Ordering events)
- Logs stored in `/shared/logs`

---

## Future Enhancements

- Add authentication via JWT  
- Integrate Stripe or M-Pesa for payments  
- Add dashboard analytics  
- Implement service discovery via Nginx or Consul  
