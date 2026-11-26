
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
  const customerPhotos = [
    "photo-1534528741775-53994a69daeb",
    "photo-1500648767791-00dcc994a43e",
    "photo-1531123897727-8f129e1688ce",
  ];

  return (
    <section className="overflow-hidden bg-[#fff8ef]">
      <div className="container-custom grid min-h-[620px] items-center gap-10 py-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-[#f2a541]/15 px-4 py-2 text-sm font-bold text-[#a96b12]">
            <Star size={16} fill="currentColor" />
            Freshly Baked, Always Delicious
          </div>

          <h1 className="max-w-xl text-5xl font-black leading-[1.12] tracking-tight text-[#242321] sm:text-6xl lg:text-7xl">
            Happiness is
            <span className="block text-[#e84635]">
              A Slice Away.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-8 text-[#77716a]">
            Discover your favorite pizzas from the best local
            restaurants. Fresh ingredients, amazing flavors,
            delivered right to your door.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="inline-flex h-14 items-center justify-center rounded-full bg-[#e84635] px-8 text-base font-semibold text-white transition hover:bg-[#c93426]"
            >
              Explore Menu
              <ArrowRight className="ml-2" size={19} />
            </Link>

            <Link
              href="#how-it-works"
              className="inline-flex h-14 items-center justify-center rounded-full border border-[#e84635] px-8 text-base font-semibold text-[#e84635] transition hover:bg-[#e84635]/5"
            >
              How It Works
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-5">
            <div className="flex -space-x-3">
              {customerPhotos.map((photo) => (
                <Image
                  key={photo}
                  src={`https://images.unsplash.com/${photo}?w=80&h=80&fit=crop`}
                  alt="PizzaHub customer"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>

            <div>
              <p className="font-bold text-[#242321]">
                Pizza lovers&apos; choice
              </p>

              <p className="text-xs text-[#77716a]">
                Discover something delicious
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          <div className="absolute inset-5 rounded-full bg-[#f2a541]/20 blur-3xl" />

          <Image
            src="https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1000&auto=format&fit=crop"
            alt="Freshly baked delicious pizza"
            width={1000}
            height={1000}
            priority
            className="relative z-10 aspect-square w-full rounded-full object-cover shadow-2xl"
          />

          <div className="absolute -bottom-3 left-0 z-20 rounded-2xl bg-white p-4 shadow-xl sm:left-2">
            <p className="text-xs font-medium text-gray-500">
              Made with love
            </p>

            <p className="text-lg font-black text-[#e84635]">
              100% Fresh
            </p>
          </div>

          <div className="absolute -right-1 top-8 z-20 rounded-2xl bg-[#e84635] p-4 text-white shadow-xl">
            <p className="text-xs">Taste the</p>
            <p className="text-xl font-black">Magic!</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
