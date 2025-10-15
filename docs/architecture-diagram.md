# ModuCart System Architecture

```mermaid
graph TD
    A[User / Browser] -->|HTTP| B[API Gateway]
    B -->|REST| C[Catalog API]
    B -->|REST| D[Basket API]
    B -->|REST| E[Ordering API]
    B -->|REST| F[Discount API (gRPC Proxy)]

    C -->|MongoDB| G[(MongoDB)]
    D -->|Redis| H[(Redis Cache)]
    E -->|MySQL| I[(MySQL Database)]
    F -->|PostgreSQL| J[(PostgreSQL Database)]

    E -->|RabbitMQ| K[(Message Queue)]

    subgraph "Front-End (EJS Templates)"
      L[Views - Products, Basket, Orders]
    end

    A --> L
```
