
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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
  status?: string;
};

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function loadMenu() {
      try {
        const response = await apiFetch<MenuItem[]>(
          "/api/menu",
          {},
          false
        );

        setMenuItems(response.data || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load menu items."
        );
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        menuItems
          .map((item) => item.category)
          .filter((category): category is string => Boolean(category))
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [menuItems, search, category]);

  return (
    <main className="min-h-screen bg-[#faf7f2] text-[#29221d]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#171411] px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
            Freshly baked, always delicious
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-7xl">
            Discover Your
            <span className="text-orange-500"> Favorite Pizza.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Handcrafted pizzas, fresh ingredients and unforgettable
            flavors. Find your next favorite at PizzaHub.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Back to Home
          </Link>
        </div>
      </section>

      {/* Menu */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 font-semibold text-orange-600">
              OUR MENU
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              Explore Our Pizzas
            </h2>
          </div>

          <input
            type="search"
            placeholder="Search pizzas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-orange-500 md:max-w-sm"
          />
        </div>

        {/* Categories */}
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                category === item
                  ? "bg-orange-500 text-white shadow-md"
                  : "border border-gray-200 bg-white hover:border-orange-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
            <p className="mt-4 text-gray-500">
              Loading delicious pizzas...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredItems.length === 0 && (
          <div className="rounded-2xl bg-white px-6 py-20 text-center shadow-sm">
            <h3 className="text-2xl font-bold">
              No pizzas found
            </h3>

            <p className="mt-3 text-gray-500">
              Try another search or category.
            </p>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && filteredItems.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <article
                key={item._id || item.id || item.name}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-orange-50">
                  {(item.image || item.imageUrl) ? (
                    <img
                      src={item.image || item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-7xl">
                      🍕
                    </div>
                  )}

                  {item.category && (
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-orange-600">
                      {item.category}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold">
                    {item.name}
                  </h3>

                  <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500">
                    {item.description || "Freshly prepared with delicious ingredients."}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-600">
                      ৳{item.price}
                    </span>

                    <Link
                      href="/sign-in"
                      className="rounded-full bg-[#211a16] px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-500"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} PizzaHub. Made with love and pizza.</p>
      </footer>
    </main>
  );
}
