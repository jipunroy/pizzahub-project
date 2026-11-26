
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

type VendorUser = {
  id: string;
  name?: string;
  email: string;
  role?: string;
};

type MenuItem = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
  imageUrl?: string;
  status?: string;
};

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type VendorOrder = {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  deliveryAddress?: string;
  phone?: string;
  createdAt?: string;
};

const initialForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  image: "",
};

export default function VendorDashboard() {
  const router = useRouter();

  const [user, setUser] = useState<VendorUser | null>(null);
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      setError("");

      const [menuResponse, orderResponse] = await Promise.all([
        apiFetch<MenuItem[]>("/api/menu/my-menu"),
        apiFetch<VendorOrder[]>("/api/orders/vendor-orders"),
      ]);

      setMenus(menuResponse.data ?? []);
      setOrders(orderResponse.data ?? []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load dashboard."
      );
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function initialize() {
      try {
        const result = await authClient.getSession();
        const currentUser = result.data?.user as
          | VendorUser
          | undefined;

        if (!active) return;

        if (result.error || !currentUser) {
          router.replace("/sign-in");
          return;
        }

        if (currentUser.role !== "vendor") {
          router.replace("/dashboard/customer");
          return;
        }

        setUser(currentUser);

        const [menuResponse, orderResponse] = await Promise.all([
          apiFetch<MenuItem[]>("/api/menu/my-menu"),
          apiFetch<VendorOrder[]>("/api/orders/vendor-orders"),
        ]);

        if (!active) return;

        setMenus(menuResponse.data ?? []);
        setOrders(orderResponse.data ?? []);
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load dashboard."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    initialize();

    return () => {
      active = false;
    };
  }, [router]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMenuSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        category: form.category.trim(),
        image: form.image.trim(),
      };

      if (!payload.name || !payload.price || payload.price <= 0) {
        setError("Please enter a valid name and price.");
        return;
      }

      if (editingId) {
        await apiFetch(`/api/menu/${editingId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });

        setMessage("Menu updated successfully.");
      } else {
        await apiFetch("/api/menu", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        setMessage("Menu submitted successfully. Awaiting approval.");
      }

      setForm(initialForm);
      setEditingId(null);
      await loadDashboard();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Menu operation failed."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (menu: MenuItem) => {
    setEditingId(menu._id);

    setForm({
      name: menu.name,
      description: menu.description || "",
      price: String(menu.price),
      category: menu.category || "",
      image: menu.image || menu.imageUrl || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this menu?"
    );

    if (!confirmed) return;

    try {
      setActionId(id);
      setError("");
      setMessage("");

      await apiFetch(`/api/menu/${id}`, {
        method: "DELETE",
      });

      setMenus((previous) =>
        previous.filter((menu) => menu._id !== id)
      );

      setMessage("Menu deleted successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete menu."
      );
    } finally {
      setActionId(null);
    }
  };

  const handleOrderStatus = async (
    id: string,
    status: string
  ) => {
    try {
      setActionId(id);
      setError("");
      setMessage("");

      await apiFetch(`/api/orders/vendor-orders/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      setOrders((previous) =>
        previous.map((order) =>
          order._id === id ? { ...order, status } : order
        )
      );

      setMessage("Order status updated.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update order."
      );
    } finally {
      setActionId(null);
    }
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.replace("/sign-in");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf5]">
        <p className="text-lg font-semibold text-orange-600">
          Loading Vendor Dashboard...
        </p>
      </main>
    );
  }

  if (!user || user.role !== "vendor") return null;

  return (
    <main className="min-h-screen bg-[#fffaf5]">
      <header className="bg-[#25140f] px-6 py-6 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-400">
              PizzaHub Vendor
            </p>
            <h1 className="mt-2 text-3xl font-bold">
              Vendor Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-300">
              Welcome, {user.name || user.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-orange-600 px-5 py-3 font-semibold hover:bg-orange-700"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10">
        {message && (
          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Dashboard Stats */}
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Menus</p>
            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {menus.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {orders.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Pending Menus</p>
            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {menus.filter((m) => m.status === "pending").length}
            </h2>
          </div>
        </div>

        {/* Add / Edit Menu */}
        <section className="mt-10 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-[#25140f]">
            {editingId ? "Edit Menu" : "Add New Menu"}
          </h2>

          <form onSubmit={handleMenuSubmit} className="grid gap-4 sm:grid-cols-2">
            <input
              name="name"
              value={form.name}
              onChange={handleFormChange}
              placeholder="Pizza name"
              required
              className="rounded-xl border p-3 outline-none focus:border-orange-500"
            />

            <input
              name="price"
              type="number"
              min="1"
              value={form.price}
              onChange={handleFormChange}
              placeholder="Price (৳)"
              required
              className="rounded-xl border p-3 outline-none focus:border-orange-500"
            />

            <input
              name="category"
              value={form.category}
              onChange={handleFormChange}
              placeholder="Category"
              className="rounded-xl border p-3 outline-none focus:border-orange-500"
            />

            <input
              name="image"
              type="url"
              value={form.image}
              onChange={handleFormChange}
              placeholder="Image URL"
              className="rounded-xl border p-3 outline-none focus:border-orange-500"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleFormChange}
              placeholder="Pizza description"
              rows={3}
              className="rounded-xl border p-3 outline-none focus:border-orange-500 sm:col-span-2"
            />

            <div className="flex flex-wrap gap-3 sm:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Menu"
                    : "Submit Menu"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(initialForm);
                  }}
                  className="rounded-xl border px-6 py-3 font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* My Menus */}
        <section className="mt-10">
          <h2 className="mb-6 text-2xl font-bold text-[#25140f]">
            My Menus
          </h2>

          {menus.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center text-gray-500">
              No menu items found. Add your first pizza!
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {menus.map((menu) => {
                const image = menu.image || menu.imageUrl;

                return (
                  <article
                    key={menu._id}
                    className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm"
                  >
                    <div className="relative aspect-[4/3] bg-orange-50">
                      {image ? (
                        <Image
                          src={image}
                          alt={menu.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-400">
                          No Image Available
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex justify-between gap-3">
                        <h3 className="text-xl font-bold text-[#25140f]">
                          {menu.name}
                        </h3>
                        <span className="font-bold text-orange-600">
                          ৳{menu.price}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-gray-600">
                        {menu.description || "No description"}
                      </p>

                      <p className="mt-3 text-sm text-gray-500">
                        Category: {menu.category || "General"}
                      </p>

                      <p className="mt-2 text-sm font-semibold capitalize text-orange-600">
                        Status: {menu.status || "Unknown"}
                      </p>

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleEdit(menu)}
                          disabled={menu.status === "pending"}
                          className="rounded-xl border border-orange-300 py-2 font-semibold text-orange-700 hover:bg-orange-50 disabled:opacity-40"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(menu._id)}
                          disabled={actionId !== null}
                          className="rounded-xl bg-red-600 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                        >
                          {actionId === menu._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Vendor Orders */}
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-[#25140f]">
            Customer Orders
          </h2>

          {orders.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center text-gray-500">
              No orders received yet.
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <article
                  key={order._id}
                  className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-wrap justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-[#25140f]">
                        Order #{order._id.slice(-6)}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : ""}
                      </p>
                    </div>

                    <span className="font-bold text-orange-600">
                      ৳{order.totalAmount}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    {order.items?.map((item, index) => (
                      <p key={index} className="text-sm text-gray-600">
                        {item.name} × {item.quantity} — ৳
                        {item.price * item.quantity}
                      </p>
                    ))}
                  </div>

                  {order.deliveryAddress && (
                    <p className="mt-3 text-sm text-gray-500">
                      Delivery: {order.deliveryAddress}
                    </p>
                  )}

                  <p className="mt-2 text-sm font-semibold capitalize">
                    Current Status: {order.status}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      onClick={() =>
                        handleOrderStatus(order._id, "confirmed")
                      }
                      disabled={actionId !== null}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() =>
                        handleOrderStatus(order._id, "preparing")
                      }
                      disabled={actionId !== null}
                      className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      Preparing
                    </button>

                    <button
                      onClick={() =>
                        handleOrderStatus(order._id, "out_for_delivery")
                      }
                      disabled={actionId !== null}
                      className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      Out for Delivery
                    </button>

                    <button
                      onClick={() =>
                        handleOrderStatus(order._id, "delivered")
                      }
                      disabled={actionId !== null}
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      Delivered
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
