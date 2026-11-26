
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
};

type Order = {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
};

type MenuItem = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
};

type UserInfo = {
  name: string;
  email: string;
};

export default function CustomerDashboard() {
  const router = useRouter();

  const [user, setUser] = useState<UserInfo | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        const { data: sessionData, error: sessionError } =
          await authClient.getSession();

        if (sessionError || !sessionData?.user) {
          router.replace("/sign-in");
          return;
        }

        const currentUser = sessionData.user as {
          name: string;
          email: string;
          role?: string;
        };

        if (currentUser.role !== "customer") {
          router.replace(
            currentUser.role === "vendor"
              ? "/dashboard/vendor"
              : "/dashboard/admin"
          );
          return;
        }

        if (!active) return;

        setUser({
          name: currentUser.name,
          email: currentUser.email,
        });

        const [orderResponse, menuResponse] = await Promise.all([
          apiFetch<Order[]>("/api/orders/my-orders"),
          apiFetch<MenuItem[]>("/api/menu", {}, false),
        ]);

        if (!active) return;

        setOrders(orderResponse.data);
        setMenu(menuResponse.data.slice(0, 3));
      } catch (err) {
        if (!active) return;

        setError(
          err instanceof Error
            ? err.message
            : "Could not load dashboard"
        );
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [router]);

  const activeOrders = orders.filter((order) =>
    ["pending", "confirmed", "preparing", "ready"].includes(
      order.status
    )
  );

  const completedOrders = orders.filter(
    (order) => order.status === "delivered"
  );

  const formatPrice = (price: number) =>
    `৳${price.toLocaleString("en-BD")}`;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-BD", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff8ef]">
        <p className="font-bold text-[#e84635]">
          Preparing your PizzaHub dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8ef] text-[#242321]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-[#eee3d7] bg-white p-6 lg:flex lg:flex-col">
          <Link href="/" className="mb-12 flex items-center gap-2">
            <span className="text-3xl">🍕</span>
            <span className="text-2xl font-black">
              Pizza<span className="text-[#e84635]">Hub</span>
            </span>
          </Link>

          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#999087]">
            Customer Menu
          </p>

          <nav className="space-y-2">
            <Link
              href="/dashboard/customer"
              className="block rounded-xl bg-[#e84635] px-4 py-3 font-semibold text-white"
            >
              ▦ Dashboard
            </Link>
            <Link
              href="/menu"
              className="block rounded-xl px-4 py-3 hover:bg-[#fff0df]"
            >
              🍕 Browse Menu
            </Link>
            <Link
              href="/dashboard/customer/orders"
              className="block rounded-xl px-4 py-3 hover:bg-[#fff0df]"
            >
              📦 My Orders
            </Link>
          </nav>

          <div className="mt-auto rounded-2xl bg-[#fff0df] p-5">
            <span className="text-3xl">🇮🇹</span>
            <h3 className="mt-3 font-bold">
              Made with Italian love
            </h3>
            <p className="mt-2 text-sm text-[#77716b]">
              Fresh ingredients and authentic flavors.
            </p>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-[#eee3d7] px-5 py-4 md:px-8">
            <div>
              <p className="text-xs text-[#999087]">
                CUSTOMER PORTAL
              </p>
              <h2 className="text-lg font-extrabold">
                My Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden text-sm font-semibold sm:block">
                {user?.name}
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e84635] font-bold text-white">
                {user?.name?.charAt(0).toUpperCase() || "C"}
              </div>
              <button
                onClick={async () => {
                  await authClient.signOut();
                  router.replace("/sign-in");
                }}
                className="text-sm font-semibold text-[#e84635]"
              >
                Sign Out
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-8 p-5 md:p-8">
            <section className="rounded-3xl bg-[#493326] p-7 text-white md:p-10">
              <span className="text-sm text-[#ffcf9b]">
                BENVENUTO! 🇮🇹
              </span>

              <h1 className="mt-5 text-3xl font-black md:text-5xl">
                Welcome back,
                <br />
                {user?.name || "Pizza Lover"}!
              </h1>

              <p className="mt-4 text-white/70">
                Your next delicious Italian experience is waiting.
              </p>

              <Link
                href="/menu"
                className="mt-7 inline-block rounded-full bg-[#e84635] px-6 py-3 font-bold text-white"
              >
                Order Now →
              </Link>
            </section>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
                <button
                  onClick={() => window.location.reload()}
                  className="ml-3 font-bold underline"
                >
                  Retry
                </button>
              </div>
            )}

            <section>
              <p className="text-xs font-bold uppercase tracking-widest text-[#e84635]">
                Your Activity
              </p>
              <h2 className="mt-1 text-2xl font-black">
                Order Overview
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  {
                    label: "Total Orders",
                    value: orders.length,
                    icon: "🍕",
                  },
                  {
                    label: "Active Orders",
                    value: activeOrders.length,
                    icon: "🛵",
                  },
                  {
                    label: "Completed",
                    value: completedOrders.length,
                    icon: "✓",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-[#eee3d7] bg-white p-6"
                  >
                    <div className="flex justify-between">
                      <p className="text-[#77716b]">
                        {stat.label}
                      </p>
                      <span className="text-2xl">
                        {stat.icon}
                      </span>
                    </div>
                    <h3 className="mt-4 text-4xl font-black">
                      {stat.value}
                    </h3>
                  </div>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-[#eee3d7] bg-white">
              <div className="border-b border-[#eee3d7] p-6">
                <p className="text-xs font-bold text-[#e84635]">
                  ORDER HISTORY
                </p>
                <h2 className="mt-1 text-xl font-black">
                  Recent Orders
                </h2>
              </div>

              {orders.length === 0 ? (
                <div className="p-8 text-center text-[#77716b]">
                  No orders yet. Your first pizza is waiting!
                </div>
              ) : (
                <div className="divide-y divide-[#eee3d7]">
                  {orders.slice(0, 5).map((order) => (
                    <div
                      key={order._id}
                      className="flex flex-wrap items-center justify-between gap-4 p-5"
                    >
                      <div>
                        <h3 className="font-bold">
                          {order.items
                            .map((item) => item.name)
                            .join(", ")}
                        </h3>
                        <p className="mt-1 text-xs text-[#999087]">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-extrabold">
                          {formatPrice(order.totalAmount)}
                        </span>
                        <span className="rounded-full bg-[#fff0df] px-3 py-1.5 text-xs font-bold capitalize text-[#9b5520]">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <p className="text-xs font-bold uppercase tracking-widest text-[#e84635]">
                Handpicked for you
              </p>
              <h2 className="mt-1 text-2xl font-black">
                You Might Love
              </h2>

              {menu.length === 0 ? (
                <p className="mt-5 rounded-xl bg-white p-6 text-[#77716b]">
                  No approved menu items available right now.
                </p>
              ) : (
                <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {menu.map((item) => (
                    <article
                      key={item._id}
                      className="overflow-hidden rounded-2xl border border-[#eee3d7] bg-white"
                    >
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-40 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-40 items-center justify-center bg-[#fff0df] text-7xl">
                          🍕
                        </div>
                      )}

                      <div className="p-5">
                        <h3 className="text-lg font-extrabold">
                          {item.name}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-xs text-[#999087]">
                          {item.description || "Freshly prepared for you."}
                        </p>
                        <p className="mt-5 font-black text-[#e84635]">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <footer className="border-t border-[#eee3d7] py-6 text-center text-xs text-[#999087]">
              © 2026 PizzaHub · Crafted with Italian passion 🍕
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
