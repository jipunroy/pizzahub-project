
import Link from "next/link";
import { Pizza } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#fff8ef] px-5 text-center">
      <Pizza size={70} className="mb-6 text-[#e84635]" />

      <h1 className="text-7xl font-black text-[#e84635]">404</h1>

      <h2 className="mt-5 text-2xl font-bold text-[#242321]">
        Oops! This Slice Is Missing.
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        The page you are looking for does not exist or may have moved.
      </p>

      <Link
  href="/menu"
  className="inline-flex items-center justify-center rounded-full bg-[#e84635] px-6 py-3 text-white hover:bg-[#c93426]"
>
  Back to Home
</Link>
    </main>
  );
}
