import bcrypt from "bcryptjs";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

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

// Simple in-memory user store for testing/demo purposes
const USERS = [];

export const handleRegister = async (req, res) => {
  try {
    const { firstName, lastName, phone, username, email, password, confirmPassword } = req.body;
    const recaptcha = req.body['g-recaptcha-response'];

    if (!username || !email || !password) {
      return res.render('auth/register', { title: 'Register', error: 'Missing required fields' });
    }
    if (password !== confirmPassword) {
      return res.render('auth/register', { title: 'Register', error: 'Passwords do not match' });
    }

    const secret = process.env.RECAPTCHA_SECRET;
    if (!secret) {
      return res.render('auth/register', { title: 'Register', error: 'reCAPTCHA not configured on server (RECAPTCHA_SECRET missing)' });
    }

    if (!recaptcha) {
      return res.render('auth/register', { title: 'Register', error: 'Please complete the reCAPTCHA' });
    }

    // Verify with Google
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const params = new URLSearchParams();
    params.append('secret', secret);
    params.append('response', recaptcha);
    params.append('remoteip', req.ip);

    const verifyRes = await axios.post(verifyUrl, params);
    const data = verifyRes.data;
    if (!data.success) {
      console.warn('reCAPTCHA verification failed', data);
      return res.render('auth/register', { title: 'Register', error: 'reCAPTCHA verification failed' });
    }

    // Basic uniqueness check
    if (USERS.find(u => u.username === username || u.email === email)) {
      return res.render('auth/register', { title: 'Register', error: 'User with that email or username already exists' });
    }

    const hash = bcrypt.hashSync(password, 10);
    const newUser = { id: USERS.length + 1, username, email, firstName, lastName, phone, passwordHash: hash };
    USERS.push(newUser);

    // Create session for new user
    req.session.user = { username: newUser.username, name: `${newUser.firstName || ''} ${newUser.lastName || ''}`.trim(), role: 'user' };
    return res.redirect('/admin/dashboard');
  } catch (err) {
    console.error('Registration error', err);
    return res.render('auth/register', { title: 'Register', error: 'Registration failed' });
  }
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
