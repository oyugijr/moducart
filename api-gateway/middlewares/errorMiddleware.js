export const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Error:", err?.message || err);
  // If request is AJAX/JSON, return JSON
  if (req.xhr || req.headers.accept?.includes("application/json")) {
    return res.status(500).json({ error: "Internal server error" });
  }
  // otherwise render a friendly page
  return res.status(500).render("auth/login", { title: "Login", error: "Internal server error" });
};
