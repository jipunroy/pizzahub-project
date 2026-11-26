
import { Search, ShoppingBag, ClipboardCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Explore",
    description: "Browse delicious pizzas from local restaurants.",
  },
  {
    icon: ShoppingBag,
    number: "02",
    title: "Place Your Order",
    description: "Choose your favorite pizza and submit your order.",
  },
  {
    icon: ClipboardCheck,
    number: "03",
    title: "Track Your Order",
    description: "Follow your order status from your dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container-custom">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-[#e84635]">
            Simple & Easy
          </p>
          <h2 className="text-3xl font-black text-[#242321] sm:text-4xl">
            Your Pizza Journey
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {steps.map(({ icon: Icon, number, title, description }) => (
            <div key={number} className="relative text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#e84635]/10 text-[#e84635]">
                <Icon size={34} />
              </div>
              <span className="text-sm font-black text-[#e84635]">{number}</span>
              <h3 className="mt-2 text-xl font-bold text-[#242321]">{title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-gray-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
