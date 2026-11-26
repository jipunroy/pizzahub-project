
import Link from "next/link";
import {
  Pizza, Leaf, Beef, ChefHat, Utensils, Coffee
} from "lucide-react";

const categories = [
  { name: "Classic Pizza", icon: Pizza, color: "bg-red-50", slug: "classic" },
  { name: "Vegetarian", icon: Leaf, color: "bg-green-50", slug: "vegetarian" },
  { name: "Meat Lovers", icon: Beef, color: "bg-orange-50", slug: "meat-lovers" },
  { name: "Specialty Pizza", icon: ChefHat, color: "bg-yellow-50", slug: "specialty" },
  { name: "Sides & Snacks", icon: Utensils, color: "bg-purple-50", slug: "sides" },
  { name: "Drinks & Desserts", icon: Coffee, color: "bg-blue-50", slug: "beverages" },
];

export default function Categories() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-[#e84635]">
            Explore Our Menu
          </p>
          <h2 className="text-3xl font-black text-[#242321] sm:text-4xl">
            What Are You Craving?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-gray-500">
            From timeless classics to exciting new flavors,
            find the perfect bite for every mood.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ name, icon: Icon, color, slug }) => (
            <Link
              key={slug}
              href={`/menu?category=${slug}`}
              className="group rounded-2xl border border-[#eee4d8] bg-[#fff8ef] p-6 text-center transition duration-300 hover:-translate-y-2 hover:border-[#e84635] hover:shadow-lg"
            >
              <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${color}`}>
                <Icon size={30} className="text-[#e84635]" />
              </div>
              <h3 className="text-sm font-bold text-[#242321]">
                {name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
