
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

const pizzas = [
  {
    id: "demo-1",
    name: "Classic Margherita",
    category: "Classic Pizza",
    price: 450,
    image: "photo-1579751626657-72bc17010498",
    restaurant: "Italian Oven",
    location: "Dhanmondi",
  },
  {
    id: "demo-2",
    name: "Pepperoni Feast",
    category: "Meat Lovers",
    price: 650,
    image: "photo-1628840042765-356cda07504e",
    restaurant: "Pizza House",
    location: "Gulshan",
  },
  {
    id: "demo-3",
    name: "Veggie Delight",
    category: "Vegetarian",
    price: 520,
    image: "photo-1571407970349-bc81e7e96d47",
    restaurant: "Green Slice",
    location: "Banani",
  },
  {
    id: "demo-4",
    name: "Cheese Burst",
    category: "Specialty",
    price: 590,
    image: "photo-1513104890138-7c749659a591",
    restaurant: "Cheesy Corner",
    location: "Uttara",
  },
  {
    id: "demo-5",
    name: "BBQ Chicken",
    category: "Meat Lovers",
    price: 720,
    image: "photo-1565299624946-b28f40a0ae38",
    restaurant: "Fire Oven",
    location: "Mirpur",
  },
  {
    id: "demo-6",
    name: "Italian Supreme",
    category: "Specialty",
    price: 790,
    image: "photo-1571407970349-bc81e7e96d47",
    restaurant: "La Piazza",
    location: "Mohammadpur",
  },
];

export default function FeaturedMenu() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-[#e84635]">
              Customer Favorites
            </p>

            <h2 className="text-3xl font-black text-[#242321] sm:text-4xl">
              Our Popular Pizzas
            </h2>

            <p className="mt-3 text-gray-500">
              Discover flavors worth coming back for.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex w-fit items-center justify-center rounded-full border border-[#e84635] px-5 py-2.5 font-semibold text-[#e84635] transition hover:bg-[#e84635] hover:text-white"
          >
            Browse All
            <ArrowRight className="ml-2" size={17} />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pizzas.map((pizza) => (
            <article
              key={pizza.id}
              className="group overflow-hidden rounded-2xl border border-[#eee4d8] bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={`https://images.unsplash.com/${pizza.image}?w=800&h=600&fit=crop`}
                  alt={pizza.name}
                  width={800}
                  height={600}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#e84635]">
                  {pizza.category}
                </span>
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-[#242321]">
                    {pizza.name}
                  </h3>

                  <span className="whitespace-nowrap font-black text-[#e84635]">
                    ৳{pizza.price}
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  {pizza.restaurant}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-[#eee4d8] pt-4">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={14} />
                    {pizza.location}
                  </span>

                  <Link
                    href="/menu"
                    className="inline-flex items-center justify-center rounded-full bg-[#e84635] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c93426]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          Sample design data. Live restaurant listings will be connected in Phase 4.
        </p>
      </div>
    </section>
  );
}
