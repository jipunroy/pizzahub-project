
import { Clock, Heart, Award, Truck } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Freshly Prepared",
    description: "Every pizza is prepared fresh with quality ingredients.",
  },
  {
    icon: Heart,
    title: "Made With Love",
    description: "We care about every bite and every customer experience.",
  },
  {
    icon: Award,
    title: "Quality Restaurants",
    description: "Discover delicious menus from local restaurant partners.",
  },
  {
    icon: Truck,
    title: "Easy Ordering",
    description: "Find your favorite pizza and place an order with ease.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-[#fff8ef]">
      <div className="container-custom">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-[#e84635]">
            Why PizzaHub
          </p>
          <h2 className="text-3xl font-black text-[#242321] sm:text-4xl">
            More Than Just Pizza
          </h2>
          <p className="mt-4 leading-7 text-gray-500">
            A better way to discover local restaurants and enjoy
            your favorite pizza.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-[#eee4d8] bg-white p-7 transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e84635]/10 text-[#e84635]">
                <Icon size={27} />
              </div>
              <h3 className="mb-3 text-lg font-bold text-[#242321]">
                {title}
              </h3>
              <p className="text-sm leading-7 text-gray-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
