import apiClient from "../utils/apiClient.js";

/* Dashboard renderer: collect basic metrics from services */
export const renderDashboard = async (req, res, next) => {
  try {
    const [productsRes, ordersRes] = await Promise.allSettled([
      apiClient.get("/catalog/products"),
      apiClient.get("/orders")
    ]);

    // Normalize product and order lists (be defensive about upstream shapes)
    const products = productsRes.status === "fulfilled" && Array.isArray(productsRes.value) ? productsRes.value : [];
    const orders = ordersRes.status === "fulfilled" && Array.isArray(ordersRes.value) ? ordersRes.value : [];

    // Compute dashboard-friendly metrics
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => ((o.status || '').toString().toLowerCase() === 'completed')).length;
    const pendingOrders = totalOrders - completedOrders;
    const totalEarnings = orders.reduce((sum, o) => {
      const n = Number(o.total ?? o.amount ?? o.totalAmount ?? 0) || 0;
      return sum + n;
    }, 0);

    const stats = {
      completedOrders,
      pendingOrders,
      // keep revenue as a number; view will format and add currency prefix
      revenue: Number(totalEarnings.toFixed(2)),
      products: totalProducts
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
