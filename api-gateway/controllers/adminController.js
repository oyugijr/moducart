import apiClient from "../utils/apiClient.js";

/* Dashboard renderer: collect basic metrics from services */
export const renderDashboard = async (req, res, next) => {
  try {
    const [productsRes, ordersRes] = await Promise.allSettled([
      apiClient.get("/catalog/products"),
      apiClient.get("/orders")
    ]);

    const productsCount = productsRes.status === "fulfilled" ? (Array.isArray(productsRes.value) ? productsRes.value.length : 0) : 0;
    const ordersCount = ordersRes.status === "fulfilled" ? (Array.isArray(ordersRes.value) ? ordersRes.value.length : 0) : 0;
    // Provide a recent orders array for the dashboard view
    const orders = ordersRes.status === "fulfilled" && Array.isArray(ordersRes.value) ? ordersRes.value : [];

    const stats = {
      products: productsCount,
      orders: ordersCount,
      users: 0,
      revenue: 0
    };

    // Collect service errors to show a friendly message in the UI
    const serviceErrors = [];
    if (productsRes.status === 'rejected') {
      console.warn('Catalog service error:', productsRes.reason?.message || productsRes.reason);
      serviceErrors.push(productsRes.reason?.message || 'Catalog service unavailable');
    }
    if (ordersRes.status === 'rejected') {
      console.warn('Ordering service error:', ordersRes.reason?.message || ordersRes.reason);
      serviceErrors.push(ordersRes.reason?.message || 'Ordering service unavailable');
    }

    res.render("admin/dashboard", { title: "Dashboard", stats, orders, user: req.session.user, serviceErrors });
  } catch (err) {
    next(err);
  }
};

export const renderManageProducts = async (req, res, next) => {
  try {
    const products = await apiClient.get("/catalog/products");
    res.render("admin/manage-products", { title: "Manage Products", products });
  } catch (err) {
    next(err);
  }
};

export const renderManageOrders = async (req, res, next) => {
  try {
    const orders = await apiClient.get("/orders");
    res.render("admin/manage-orders", { title: "Manage Orders", orders });
  } catch (err) {
    next(err);
  }
};

export const renderManageUsers = (req, res) => {
  // user management would query auth/user service; show empty list for now
  res.render("admin/manage-users", { title: "Users", users: [] });
};

export const renderSettings = (req, res) => {
  res.render("admin/settings", { title: "Settings" });
};

export const renderReports = (req, res) => {
  res.render("admin/reports", { title: "Reports" });
};
