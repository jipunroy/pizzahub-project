
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pizza, Loader2 } from "lucide-react";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectUser = async () => {
    const { data } = await authClient.getSession();

    const role = (data?.user as { role?: string } | undefined)?.role;

    if (role === "admin") {
      router.replace("/dashboard/admin");
    } else if (role === "vendor") {
      router.replace("/dashboard/vendor");
    } else {
      router.replace("/dashboard/customer");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Login failed");
        return;
      }

      toast.success("Welcome back to PizzaHub!");
      await redirectUser();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google login failed");
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex min-h-[75vh] items-center justify-center bg-[#fff8ef] px-4 py-16">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">

          <div className="hidden flex-col justify-center bg-[#e84635] p-12 text-white md:flex">
            <Pizza size={55} />
            <h1 className="mt-8 text-4xl font-black">
              Welcome Back!
            </h1>
            <p className="mt-5 leading-8 text-white/80">
              Your favorite pizza is waiting for you.
              Sign in and discover delicious flavors from
              local restaurants.
            </p>
          </div>

          <div className="p-7 sm:p-12">
            <h2 className="text-3xl font-black text-[#242321]">
              Sign In
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Enter your account details to continue.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-[#e84635]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-[#e84635]"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-[#e84635] hover:bg-[#c93426]"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="h-12 w-full rounded-xl"
            >
              Continue with Google
            </Button>

            <p className="mt-7 text-center text-sm text-gray-500">
              Don&apos;t miss our pizza deals!{" "}
              <Link
                href="/sign-up"
                className="font-bold text-[#e84635]"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
