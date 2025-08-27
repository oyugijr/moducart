import grpc from "@grpc/grpc-js";
import { discountProto } from "../config/grpc";
import { DiscountService } from "../services/discountService";

const server = new grpc.Server();

server.addService(discountProto.discount.DiscountService.service, {
  async GetDiscount(call: any, callback: any) {
    const { productId } = call.request;
    const discount = await DiscountService.getDiscount(productId);

    if (!discount) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "Discount not found",
      });
    }

    callback(null, {
      productId: discount.productId,
      discountPercentage: discount.discountPercentage,
      description: discount.description,
    });
  },
});

export const startGrpcServer = () => {
  const port = process.env.GRPC_PORT || "50051";
  server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log(`🚀 gRPC server running on port ${port}`);
  });
};
