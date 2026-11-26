
import Link from "next/link";

const stats = [
  {
    label: "Total Orders",
    value: "12",
    icon: "🍕",
    note: "All-time orders",
  },
  {
    label: "Active Orders",
    value: "02",
    icon: "🛵",
    note: "On the way to you",
  },
  {
    label: "Completed",
    value: "10",
    icon: "✓",
    note: "Successfully delivered",
  },
];

const orders = [
  {
    id: "#PH-1024",
    name: "Margherita Pizza",
    date: "Nov 25, 2026",
    price: "৳650",
    status: "Preparing",
    color: "bg-amber-100 text-amber-800",
    emoji: "🍕",
  },
  {
    id: "#PH-1021",
    name: "Pepperoni Pizza",
    date: "Nov 23, 2026",
    price: "৳850",
    status: "Delivered",
    color: "bg-green-100 text-green-800",
    emoji: "🍕",
  },
  {
    id: "#PH-1018",
    name: "Italian Pasta",
    date: "Nov 20, 2026",
    price: "৳520",
    status: "Delivered",
    color: "bg-green-100 text-green-800",
    emoji: "🍝",
  },
];

const recommendations = [
  {
    name: "Margherita Pizza",
    description: "Fresh basil · Mozzarella · Tomato",
    price: "৳650",
    emoji: "🍕",
    bg: "bg-orange-50",
  },
  {
    name: "Pepperoni Pizza",
    description: "Pepperoni · Mozzarella · Herbs",
    price: "৳850",
    emoji: "🍕",
    bg: "bg-red-50",
  },
  {
    name: "Italian Pasta",
    description: "Creamy sauce · Parmesan · Herbs",
    price: "৳520",
    emoji: "🍝",
    bg: "bg-yellow-50",
  },
];

export default function CustomerDashboard() {
  return (
    <main className="min-h-screen bg-[#fff8ef] text-[#242321]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-[#eee3d7] bg-white p-6 lg:flex lg:flex-col">
          <Link href="/" className="mb-12 flex items-center gap-2">
            <span className="text-3xl">🍕</span>
            <span className="text-2xl font-black tracking-tight">
              Pizza<span className="text-[#e84635]">Hub</span>
            </span>
          </Link>

          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#999087]">
            Customer Menu
          </p>

          <nav className="space-y-2">
            <Link
              href="/dashboard/customer"
              className="flex items-center gap-3 rounded-xl bg-[#e84635] px-4 py-3 font-semibold text-white"
            >
              <span>▦</span> Dashboard
            </Link>

            <Link
              href="/menu"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-[#68615a] transition hover:bg-[#fff0df] hover:text-[#c93426]"
            >
              <span>🍕</span> Browse Menu
            </Link>

            <Link
              href="/dashboard/customer/orders"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-[#68615a] transition hover:bg-[#fff0df] hover:text-[#c93426]"
            >
              <span>📦</span> My Orders
            </Link>

            <Link
              href="/dashboard/customer/profile"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-[#68615a] transition hover:bg-[#fff0df] hover:text-[#c93426]"
            >
              <span>👤</span> My Profile
            </Link>
          </nav>

          <div className="mt-auto rounded-2xl bg-[#fff0df] p-5">
            <span className="text-3xl">🇮🇹</span>
            <h3 className="mt-3 font-bold">Made with Italian love</h3>
            <p className="mt-2 text-sm leading-6 text-[#77716b]">
              Fresh ingredients, authentic flavors and happiness in every bite.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block text-sm font-bold text-[#c93426]"
            >
              Explore PizzaHub →
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <section className="min-w-0 flex-1">
          {/* Top Navbar */}
          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#eee3d7] bg-[#fff8ef]/95 px-5 py-4 backdrop-blur-md md:px-8">
            <div>
              <p className="text-xs font-medium text-[#999087]">
                CUSTOMER PORTAL
              </p>
              <h2 className="text-lg font-extrabold">My Dashboard</h2>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="hidden rounded-full border border-[#eee3d7] bg-white px-4 py-2 text-sm font-semibold transition hover:border-[#e84635] sm:block"
              >
                Visit Website
              </Link>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e84635] font-bold text-white">
                C
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-8 p-5 md:p-8">
            {/* Welcome Banner */}
            <section className="relative overflow-hidden rounded-3xl bg-[#493326] p-7 text-white md:p-10">
              <div className="relative z-[1] max-w-xl">
                <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold tracking-wider text-[#ffcf9b]">
                  BENVENUTO! 🇮🇹
                </span>

                <h1 className="mt-6 text-3xl font-black leading-tight md:text-5xl">
                  Welcome back,
                  <br />
                  Pizza Lover!
                </h1>

                <p className="mt-4 max-w-md text-sm leading-7 text-white/70 md:text-base">
                  Your next delicious Italian experience is just a few clicks
                  away. Fresh pizza, made with love.
                </p>

                <Link
                  href="/menu"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#e84635] px-6 py-3 font-bold text-white transition hover:bg-[#c93426]"
                >
                  Order Now <span>→</span>
                </Link>
              </div>

              <div className="pointer-events-none absolute -right-5 -top-12 text-[190px] opacity-15 md:right-10 md:text-[260px]">
                🍕
              </div>

              <div className="absolute -bottom-20 right-32 h-48 w-48 rounded-full bg-[#e84635]/20 blur-3xl" />
            </section>

            {/* Stats */}
            <section>
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e84635]">
                  Your Activity
                </p>
                <h2 className="mt-1 text-2xl font-black">Order Overview</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-[#eee3d7] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-[#77716b]">
                        {stat.label}
                      </p>
                      <span className="text-2xl">{stat.icon}</span>
                    </div>

                    <h3 className="mt-4 text-4xl font-black">{stat.value}</h3>
                    <p className="mt-2 text-sm text-[#999087]">
                      {stat.note}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Orders */}
            <section className="overflow-hidden rounded-2xl border border-[#eee3d7] bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eee3d7] p-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#e84635]">
                    Order History
                  </p>
                  <h2 className="mt-1 text-xl font-black">Recent Orders</h2>
                </div>

                <Link
                  href="/dashboard/customer/orders"
                  className="text-sm font-bold text-[#e84635] hover:underline"
                >
                  View All →
                </Link>
              </div>

              <div className="divide-y divide-[#eee3d7]">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-wrap items-center justify-between gap-4 p-5 transition hover:bg-[#fffaf5] md:px-6"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff0df] text-2xl">
                        {order.emoji}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-bold">{order.name}</h3>
                        <p className="mt-1 text-xs text-[#999087]">
                          {order.id} · {order.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-extrabold">{order.price}</span>
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-bold ${order.color}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recommended Menu */}
            <section>
              <div className="mb-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e84635]">
                    Handpicked for you
                  </p>
                  <h2 className="mt-1 text-2xl font-black">
                    You Might Love
                  </h2>
                </div>

                <Link
                  href="/menu"
                  className="text-sm font-bold text-[#e84635] hover:underline"
                >
                  Full Menu →
                </Link>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {recommendations.map((item) => (
                  <article
                    key={item.name}
                    className="overflow-hidden rounded-2xl border border-[#eee3d7] bg-white transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div
                      className={`flex h-40 items-center justify-center ${item.bg}`}
                    >
                      <span className="text-8xl drop-shadow-sm">
                        {item.emoji}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-extrabold">{item.name}</h3>
                      <p className="mt-2 text-xs leading-5 text-[#999087]">
                        {item.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-lg font-black text-[#e84635]">
                          {item.price}
                        </span>

                        <Link
                          href="/menu"
                          className="rounded-full bg-[#493326] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#e84635]"
                        >
                          Order Now +
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-[#eee3d7] py-6 text-center text-xs text-[#999087]">
              © 2026 PizzaHub · Crafted with Italian passion 🍕
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
