
import Link from "next/link";
import { Pizza, Mail, MapPin, Phone, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#242321] text-white">
      <div className="container-custom grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="mb-5 flex items-center gap-2">
            <Pizza className="text-[#f2a541]" size={30} />

            <span className="text-2xl font-black">
              Pizza<span className="text-[#f2a541]">Hub</span>
            </span>
          </Link>

          <p className="max-w-xs text-sm leading-7 text-gray-400">
            Bringing happiness to your doorstep with freshly baked,
            delicious pizzas from your favorite local restaurants.
          </p>

          <div className="mt-5 flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition hover:text-[#f2a541]"
            >
              <Globe size={20} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition hover:text-[#f2a541]"
            >
              <Globe size={20} />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-lg font-bold transition hover:text-[#f2a541]"
            >
              𝕏
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-bold">Quick Links</h3>

          <div className="flex flex-col gap-3 text-sm text-gray-400">
            <Link href="/">Home</Link>
            <Link href="/menu">Browse Menu</Link>
            <Link href="/sign-in">Sign In</Link>
            <Link href="/sign-up">Create Account</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-bold">Categories</h3>

          <div className="flex flex-col gap-3 text-sm text-gray-400">
            <Link href="/menu?category=classic">Classic Pizza</Link>
            <Link href="/menu?category=vegetarian">Vegetarian Pizza</Link>
            <Link href="/menu?category=meat-lovers">Meat Lovers</Link>
            <Link href="/menu?category=sides">Sides & Appetizers</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-bold">Contact Us</h3>

          <div className="flex flex-col gap-4 text-sm text-gray-400">
            <p className="flex items-center gap-3">
              <MapPin className="text-[#f2a541]" size={18} />
              Dhaka, Bangladesh
            </p>

            <p className="flex items-center gap-3">
              <Phone className="text-[#f2a541]" size={18} />
              +880 1700-000000
            </p>

            <p className="flex items-center gap-3">
              <Mail className="text-[#f2a541]" size={18} />
              hello@pizzahub.example
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom py-6 text-center text-sm text-gray-500">
        © 2026 PizzaHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
