
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

type SessionUser = {
  id: string;
  name?: string;
  email: string;
  role?: string;
};

type PendingMenu = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
  imageUrl?: string;
  createdAt?: string;
};

export default function AdminDashboard() {
  const router = useRouter();

  const [user, setUser] = useState<SessionUser | null>(null);
  const [menus, setMenus] = useState<PendingMenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadMenus = useCallback(async () => {
    try {
      setError("");
      const response = await apiFetch<PendingMenu[]>(
        "/api/admin/pending-menus"
      );
      setMenus(response.data ?? []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load pending menus."
      );
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function initializeDashboard() {
      try {
        const sessionResult = await authClient.getSession();

        const currentUser = sessionResult.data?.user as
          | SessionUser
          | undefined;

        if (!active) return;

        if (sessionResult.error || !currentUser) {
          router.replace("/sign-in");
          return;
        }

        if (currentUser.role !== "admin") {
          router.replace("/dashboard/customer");
          return;
        }

        setUser(currentUser);

        const response = await apiFetch<PendingMenu[]>(
          "/api/admin/pending-menus"
        );

        if (!active) return;

        setMenus(response.data ?? []);
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load admin dashboard."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    initializeDashboard();

    return () => {
      active = false;
    };
  }, [router]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setMessage("");
    await loadMenus();
    setRefreshing(false);
  };

  const handleMenuAction = async (
    id: string,
    action: "approve" | "reject"
  ) => {
    try {
      setActionId(id);
      setError("");
      setMessage("");

      await apiFetch(
        `/api/admin/menus/${id}/${action}`,
        { method: "PATCH" }
      );

      setMenus((previous) =>
        previous.filter((menu) => menu._id !== id)
      );

      setMessage(
        action === "approve"
          ? "Menu approved successfully."
          : "Menu rejected successfully."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Menu action failed."
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
          Loading Admin Dashboard...
        </p>
      </main>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#fffaf5]">
      {/* Header */}
      <header className="bg-[#25140f] px-6 py-6 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-400">
              PizzaHub Administration
            </p>
            <h1 className="mt-2 text-3xl font-bold">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-300">
              Welcome, {user.name || user.email}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl bg-orange-600 px-5 py-3 font-semibold transition hover:bg-orange-700"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10">
        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Pending Menus
            </p>
            <h2 className="mt-3 text-4xl font-bold text-orange-600">
              {menus.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Admin Account
            </p>
            <h2 className="mt-3 text-xl font-bold text-[#25140f]">
              Active
            </h2>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Menu Management
            </p>
            <h2 className="mt-3 text-xl font-bold text-[#25140f]">
              Approval Center
            </h2>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Pending Menu Section */}
        <section className="mt-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#25140f]">
                Pending Menu Approvals
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Review vendor menu submissions before publishing.
              </p>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="rounded-xl border border-orange-300 px-5 py-2.5 font-semibold text-orange-700 transition hover:bg-orange-50 disabled:opacity-50"
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {menus.length === 0 ? (
            <div className="rounded-2xl border border-orange-100 bg-white px-6 py-16 text-center">
              <h3 className="text-xl font-bold text-[#25140f]">
                No Pending Menus
              </h3>
              <p className="mt-2 text-gray-500">
                All submitted menu items have been reviewed.
              </p>
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
                    <div className="relative aspect-[4/3] overflow-hidden bg-orange-50">
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
                        <div className="flex h-full items-center justify-center">
                          <span className="text-gray-400">
                            No Image Available
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-xl font-bold text-[#25140f]">
                          {menu.name}
                        </h3>

                        <span className="whitespace-nowrap font-bold text-orange-600">
                          ৳{menu.price}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-gray-600">
                        {menu.description || "No description provided."}
                      </p>

                      {menu.category && (
                        <p className="mt-3 text-sm text-gray-500">
                          Category: {menu.category}
                        </p>
                      )}

                      {menu.createdAt && (
                        <p className="mt-1 text-xs text-gray-400">
                          Submitted:{" "}
                          {new Date(menu.createdAt).toLocaleDateString()}
                        </p>
                      )}

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            handleMenuAction(menu._id, "approve")
                          }
                          disabled={actionId !== null}
                          className="rounded-xl bg-green-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                        >
                          {actionId === menu._id
                            ? "Processing..."
                            : "Approve"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleMenuAction(menu._id, "reject")
                          }
                          disabled={actionId !== null}
                          className="rounded-xl bg-red-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                        >
                          {actionId === menu._id
                            ? "Processing..."
                            : "Reject"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
