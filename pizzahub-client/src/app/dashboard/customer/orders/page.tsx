"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Order = {
  _id: string;
  items?: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount?: number;
  status?: string;
  createdAt?: string;
};

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await apiFetch<Order[]>(
          "/api/orders/my-orders"
        );

        setOrders(response.data || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load orders"
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) {
    return <div className="p-8">Loading orders...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">My Orders</h1>

      {orders.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          <h2 className="text-xl font-semibold">
            No orders yet!
          </h2>
          <p className="mt-2 text-gray-500">
            Your pizza orders will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-xl border p-5 shadow-sm"
            >
              <div className="flex flex-wrap justify-between gap-3">
                <h2 className="font-semibold">
                  Order #{order._id.slice(-6)}
                </h2>

                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700">
                  {order.status || "Pending"}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {order.items?.map((item, index) => (
                  <p key={index}>
                    {item.name} × {item.quantity}
                  </p>
                ))}
              </div>

              <div className="mt-4 border-t pt-4">
                <p className="font-semibold">
                  Total: ${order.totalAmount ?? 0}
                </p>

                {order.createdAt && (
                  <p className="mt-1 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}