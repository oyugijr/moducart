import app from "./app";
import { connectDB } from "./config/db";
import { Discount } from "./models/Discount";
import { startGrpcServer } from "./grpc/discountGrpcServer";

const PORT = process.env.PORT || 4000;

(async () => {
  await connectDB();
  await Discount.sync(); // auto-create table if not exists

  app.listen(PORT, () => {
    console.log(`🚀 REST API running on http://localhost:${PORT}`);
  });

  startGrpcServer();
})();
