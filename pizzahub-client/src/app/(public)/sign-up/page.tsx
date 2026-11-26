
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

export default function SignUpPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"customer" | "vendor">("customer");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      toast.error("Password needs 6 characters, uppercase and lowercase letters");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        
      });

      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }

      toast.success("Account created successfully!");

      const { data } = await authClient.getSession();

      const actualRole = (
        data?.user as { role?: string } | undefined
      )?.role;

      router.replace(
        actualRole === "vendor"
          ? "/dashboard/vendor"
          : "/dashboard/customer"
      );
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error("Google signup failed");
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex min-h-[75vh] items-center justify-center bg-[#fff8ef] px-4 py-16">
        <div className="w-full max-w-xl rounded-3xl bg-white p-7 shadow-xl sm:p-12">
          <div className="mb-7 text-center">
            <Pizza className="mx-auto mb-4 text-[#e84635]" size={45} />

            <h1 className="text-3xl font-black text-[#242321]">
              Join PizzaHub
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Create your account and discover delicious pizza.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Full Name
              </label>

              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-[#e84635]"
              />
            </div>

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
                placeholder="Minimum 6 characters"
                className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-[#e84635]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Account Type
              </label>

              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as "customer" | "vendor")
                }
                className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 outline-none focus:border-[#e84635]"
              >
                <option value="customer">Customer</option>
                <option value="vendor">Vendor (Restaurant Owner)</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-[#e84635] hover:bg-[#c93426]"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Account"
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
            className="h-12 w-full rounded-xl"
            onClick={handleGoogleSignUp}
          >
            Continue with Google
          </Button>

          <p className="mt-7 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-bold text-[#e84635]">
              Sign In
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
