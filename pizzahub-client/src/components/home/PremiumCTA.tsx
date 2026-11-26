
import Link from "next/link";
import { ArrowRight, Store } from "lucide-react";

export default function PremiumCTA() {
  return (
    <section className="bg-[#fff8ef] py-16">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-[32px] bg-[#e84635] px-7 py-16 text-center text-white sm:px-16">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-white/10" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <Store className="mx-auto mb-5" size={42} />

            <h2 className="text-3xl font-black sm:text-5xl">
              Own a Pizza Restaurant?
            </h2>

            <p className="mx-auto mt-5 max-w-lg leading-8 text-white/80">
              Join PizzaHub, publish your menu and connect
              with customers looking for their next favorite pizza.
            </p>

            <Link
              href="/sign-up"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-[#e84635] transition hover:bg-[#fff0df]"
            >
              Become a Vendor
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
