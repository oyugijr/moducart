// import express from "express";
// const router = express.Router();

// router.get("/", (req, res) => {
//   res.redirect("/auth/login");
// });

// export default router;

import express from "express";
const router = express.Router();

// Landing: redirect to storefront or admin login
router.get("/", (req, res) => {
  // Redirect to admin dashboard if logged in, otherwise to login
  if (req.session && req.session.user) {
    return res.redirect("/admin/dashboard");
  }
  return res.redirect("/auth/login");
});

export default router;
