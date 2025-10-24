import express from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import ejsMate from "ejs-mate";
// import expressLayouts from "express-ejs-layouts";
import { fileURLToPath } from "url";

import indexRoutes from "./routes/index.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Use express-ejs-layouts so views can call `layout(...)`
// app.use(expressLayouts);

// Static
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "moducart_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 8 } // 8 hours
  })
);

// Make session user available to views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// Routes
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);

// Error handler
app.use(errorHandler);

// 404 for unmatched GETs: render 404 page
app.use((req, res) => {
  res.status(404).render("auth/login", { title: "Login", error: "Page not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));


// import express from "express";
// import path from "path";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import cookieParser from "cookie-parser";
// import session from "express-session";

// import indexRoutes from "./routes/index.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();
// const app = express();
// const __dirname = path.resolve();

// // Middleware
// app.use(morgan("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // Session
// app.use(
//   session({
//     secret: "moducart_secret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// // Routes
// app.use("/", indexRoutes);
// app.use("/admin", adminRoutes);
// app.use("/auth", authRoutes);

// // 404
// app.use((req, res) => {
//   res.status(404).render("auth/login", { title: "Login" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
