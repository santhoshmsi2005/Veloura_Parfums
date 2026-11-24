import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/product/$productId")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/products/$productId",
      params: { productId: params.productId },
    });
  },
});
