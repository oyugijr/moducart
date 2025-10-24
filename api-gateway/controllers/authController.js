import bcrypt from "bcryptjs";

/*
  For the admin dashboard we implement simple auth:
  - In production replace with real user DB and hashed passwords
  - Here we use a seed admin account stored in-memory for simplicity
*/

const ADMIN_USER = {
  username: "admin@moducart.local",
  // password: "ModuCart123!" hashed
  passwordHash: bcrypt.hashSync("ModuCart123!", 10),
  name: "ModuCart Admin"
};

export const renderLogin = (req, res) => {
  res.render("auth/login", { title: "Login", error: null });
};

export const renderRegister = (req, res) => {
  res.render("auth/register", { title: "Register" });
};

export const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.render("auth/login", { title: "Login", error: "Missing credentials" });

    // Validate against seed admin
    if (username === ADMIN_USER.username && bcrypt.compareSync(password, ADMIN_USER.passwordHash)) {
      // create session
      req.session.user = { username: ADMIN_USER.username, name: ADMIN_USER.name, role: "admin" };
      return res.redirect("/admin/dashboard");
    }

    return res.render("auth/login", { title: "Login", error: "Invalid username or password" });
  } catch (err) {
    console.error(err);
    return res.render("auth/login", { title: "Login", error: "Login failed" });
  }
};

export const handleLogout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/auth/login");
  });
};
