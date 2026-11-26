
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

type MenuItem = {
  _id?: string;
  id?: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
  imageUrl?: string;
};

type MenuResponse = MenuItem[] | { items?: MenuItem[] };

export default function MenuPage() {
  const router = useRouter();

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [orderingId, setOrderingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadMenu() {
      try {
        const response = await apiFetch<MenuResponse>(
          "/api/menu",
          {},
          false
        );

        const result = response.data;
        const items = Array.isArray(result)
          ? result
          : result?.items ?? [];

        if (mounted) {
          setMenuItems(items);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load menu."
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadMenu();

    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const values = menuItems
      .map((item) => item.category)
      .filter((value): value is string => Boolean(value));

    return ["All", ...Array.from(new Set(values))];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        (item.description ?? "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [menuItems, search, category]);

  async function handleOrder(item: MenuItem) {
    const itemId = item._id || item.id;

    if (!itemId || !/^[0-9a-fA-F]{24}$/.test(itemId)) {
      setError("Invalid menu item ID.");
      return;
    }

    const deliveryAddress = window.prompt(
      "Enter your delivery address:"
    );

    if (!deliveryAddress || deliveryAddress.trim().length < 10) {
      setError("Delivery address must be at least 10 characters.");
      return;
    }

    const phone = window.prompt("Enter your phone number:");

    if (!phone || phone.trim().length < 7) {
      setError("Phone number must be at least 7 characters.");
      return;
    }

    try {
      setOrderingId(itemId);
      setError("");

      await apiFetch(
        "/api/orders",
        {
          method: "POST",
          body: JSON.stringify({
            items: [
              {
                menuItemId: itemId,
                quantity: 1,
              },
            ],
            deliveryAddress: deliveryAddress.trim(),
            phone: phone.trim(),
          }),
        },
        true
      );

      router.push("/dashboard/customer/orders");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to place order.";

      if (message.toLowerCase().includes("sign in")) {
        router.push("/sign-in");
        return;
      }

      setError(message);
    } finally {
      setOrderingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#fffaf5]">
      <section className="bg-[#25140f] px-6 py-20 text-center text-white">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
          Fresh From Our Oven
        </p>

        <h1 className="text-4xl font-bold md:text-6xl">
          Our Delicious Menu
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-gray-300">
          Discover handcrafted pizzas made with fresh ingredients
          and authentic Italian flavors.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#25140f]">
              Explore Our Pizzas
            </h2>
            <p className="mt-2 text-gray-600">
              Find your favorite pizza.
            </p>
          </div>

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search pizza..."
            className="w-full rounded-xl border border-orange-200 bg-white px-5 py-3 outline-none focus:border-orange-500 md:max-w-sm"
          />
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                category === item
                  ? "bg-orange-600 text-white"
                  : "border border-orange-200 bg-white text-[#25140f] hover:bg-orange-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center text-gray-600">
            Loading delicious pizzas...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-orange-100 bg-white py-20 text-center">
            <h3 className="text-2xl font-bold text-[#25140f]">
              No pizzas found
            </h3>
            <p className="mt-2 text-gray-500">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => {
              const itemId = item._id || item.id || item.name;
              const imageUrl =
                item.image || item.imageUrl || "/placeholder.png";

              return (
                <article
                  key={itemId}
                  className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-orange-50">
                    <Image
                      src={imageUrl}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    {item.category && (
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-1 text-xs font-bold text-orange-700 shadow">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-bold text-[#25140f]">
                        {item.name}
                      </h3>

                      <span className="whitespace-nowrap text-lg font-bold text-orange-600">
                        ৳{item.price}
                      </span>
                    </div>

                    <p className="mt-3 min-h-12 text-sm leading-6 text-gray-600">
                      {item.description ||
                        "Freshly prepared with quality ingredients."}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleOrder(item)}
                      disabled={orderingId !== null}
                      className="mt-6 w-full rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {orderingId === itemId
                        ? "Placing Order..."
                        : "Order Now"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="bg-[#25140f] px-6 py-12 text-center text-white">
        <h2 className="text-2xl font-bold md:text-3xl">
          Craving Something Delicious?
        </h2>

        <p className="mt-3 text-gray-300">
          Sign in to manage and track your orders.
        </p>

        <Link
          href="/sign-in"
          className="mt-6 inline-block rounded-xl bg-orange-600 px-7 py-3 font-semibold text-white transition hover:bg-orange-700"
        >
          Sign In
        </Link>
      </section>
    </main>
  );
}
