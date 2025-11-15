# API Gateway (ModuCart)

This service exposes the Admin Dashboard (EJS) and proxies to internal microservices.

**Start (dev):**

```sh
pnpm install
pnpm run dev
```

**Start (prod):**

```sh
docker build -t moducart-api-gateway .
docker run -p 5000:5000 moducart-api-gateway
```

## How to run locally

1. Save all files into `moducart/api-gateway/` following paths above.

2. Install:

    ```sh
    cd moducart/api-gateway
    pnpm install
    # or npm install
    pnpm run dev
    ```

3. Open browser: <http://localhost:5000/auth/login>

    - Login with seeded admin credentials:

        ```text
        Email: admin@moducart.local
        Password: ModuCart123!
        ```

4. To view dashboard: <http://localhost:5000/admin/dashboard>
