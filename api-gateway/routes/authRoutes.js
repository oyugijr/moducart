// import express from "express";
// import { loginPage, registerPage, handleLogin } from "../controllers/authController.js";

// const router = express.Router();

// router.get("/login", loginPage);
// router.get("/register", registerPage);
// router.post("/login", handleLogin);

// export default router;

import express from "express";
import { renderLogin, renderRegister, handleLogin, handleLogout } from "../controllers/authController.js";

const router = express.Router();

router.get("/login", renderLogin);
router.post("/login", handleLogin);

router.get("/register", renderRegister);
router.post("/register", async (req, res, next) => {
	// delegate to controller's handler
	try {
		const { handleRegister } = await import("../controllers/authController.js");
		return handleRegister(req, res, next);
	} catch (err) {
		next(err);
	}
});
router.post("/logout", handleLogout);
router.get("/logout", handleLogout);

export default router;
