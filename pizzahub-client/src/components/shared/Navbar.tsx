
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, Pizza, UserRound, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user as
    | {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string;
      }
    | undefined;

  const dashboardPath =
    user?.role === "admin"
      ? "/dashboard/admin"
      : user?.role === "vendor"
        ? "/dashboard/vendor"
        : "/dashboard/customer";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Menu", href: "/menu" },
  ];

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setMobileOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#eee4d8] bg-[#fff8ef]/95 backdrop-blur-xl">
      <nav className="container-custom flex h-[76px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e84635] text-white">
            <Pizza size={25} />
          </div>

          <span className="text-2xl font-black tracking-tight text-[#242321]">
            Pizza<span className="text-[#e84635]">Hub</span>
          </span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[#55504b] transition hover:text-[#e84635]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-[#eee4d8]" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-[#eee4d8] px-4 py-2 text-sm font-semibold text-[#242321] hover:bg-[#f5eadc]">
                <UserRound size={17} />
                {user.name || user.email || "Account"}
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href={dashboardPath} className="block w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href="/profile" className="block w-full">
                    Profile Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleLogout}>
                  <span className="flex items-center gap-2">
                    <LogOut size={16} />
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-md px-4 py-2 text-sm font-medium text-[#242321] transition hover:bg-[#f5eadc]"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="rounded-full bg-[#e84635] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c93426]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-[#242321] md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-[#eee4d8] bg-[#fff8ef] p-5 md:hidden">
          <div className="container-custom flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-semibold text-[#242321]"
              >
                {link.name}
              </Link>
            ))}

            {!isPending &&
              (user ? (
                <>
                  <Link
                    href={dashboardPath}
                    onClick={() => setMobileOpen(false)}
                    className="font-semibold text-[#242321]"
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="font-semibold text-[#242321]"
                  >
                    Profile Settings
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-left font-semibold text-[#e84635]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileOpen(false)}
                    className="font-semibold text-[#242321]"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/sign-up"
                    onClick={() => setMobileOpen(false)}
                    className="w-fit rounded-full bg-[#e84635] px-5 py-2.5 font-semibold text-white"
                  >
                    Get Started
                  </Link>
                </>
              ))}
          </div>
        </div>
      )}
    </header>
  );
}
