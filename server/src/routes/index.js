const productRouter = require("./product");
const adminRourter = require("./admin");
const accountRouter = require("../routes/account");
const orderRouter = require("../routes/order");
const staffRouter = require("../routes/staff");
const { AuthenticationAccount, checkRole } = require("../app/middleware/Authentication");

function route(app) {
  app.use("/api/product", productRouter);
  app.use("/api/admin", AuthenticationAccount, checkRole("admin"), adminRourter);
  app.use("/api/account", accountRouter);
  app.use("/api/order", AuthenticationAccount, orderRouter);
  app.use("/api/staff", AuthenticationAccount, checkRole("staff"), staffRouter);
}

module.exports = route;
