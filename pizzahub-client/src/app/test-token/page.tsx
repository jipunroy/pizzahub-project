
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

type SessionData = {
  user?: {
    email?: string;
    role?: string;
  };
} | null;

export default function TestTokenPage() {
  const [session, setSession] = useState<SessionData>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const result = await authClient.getSession();

        console.log("SESSION RESULT:", result);

        setSession(result.data);
      } catch (error) {
        console.error("SESSION ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, []);

  if (loading) {
    return (
      <main className="p-10">
        <p>Checking session...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-2xl font-bold">
        PizzaHub Session Test
      </h1>

      {session?.user ? (
        <div className="mt-4 space-y-2">
          <p className="text-green-600 font-semibold">
            Login session found!
          </p>

          <p>Email: {session.user.email}</p>
          <p>Role: {session.user.role}</p>
        </div>
      ) : (
        <p className="mt-4 text-red-600">
          No active login session found.
        </p>
      )}
    </main>
  );
}
