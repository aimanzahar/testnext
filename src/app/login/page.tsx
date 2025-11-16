"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getBrowserAppwrite } from "@/lib/appwriteClient";

export default function LoginPage() {
  const appwrite = getBrowserAppwrite();
  const account = appwrite?.account;
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const disabled = !account || !email || !password || (mode === "signup" && !name);

  const clearExistingSession = async () => {
    if (!account) return;
    try {
      // Remove any existing session to avoid "session is active" errors.
      await account.deleteSession("current");
    } catch {
      // ignore if no session
    }
  };

  const handleSubmit = () => {
    if (!account) {
      setError("Missing Appwrite client configuration.");
      return;
    }
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        await clearExistingSession();
        if (mode === "signup") {
          await account.create("unique()", email, password, name);
          await account.createEmailPasswordSession(email, password);
        } else {
          await account.createEmailPasswordSession(email, password);
        }
        setSuccess("Signed in. Redirecting…");
        // Give the session cookie a moment to settle, then navigate home.
        setTimeout(() => router.push("/"), 400);
      } catch (err: any) {
        setError(err?.message ?? "Unable to complete the request.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-6 py-12 text-zinc-900">
      <div className="mx-auto flex max-w-md flex-col gap-6 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-emerald-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700">MealShare</p>
            <h1 className="text-2xl font-semibold">Access your account</h1>
          </div>
          <a
            href="/"
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            ← Home
          </a>
        </div>

        <div className="flex items-center gap-3 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-100">
          Appwrite endpoint: {process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "not set"}
        </div>

        <div className="flex gap-2 text-sm font-medium">
          <button
            className={`flex-1 rounded-full border px-3 py-2 transition ${
              mode === "login"
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-zinc-200 text-zinc-700 hover:border-emerald-200"
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 rounded-full border px-3 py-2 transition ${
              mode === "signup"
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-zinc-200 text-zinc-700 hover:border-emerald-200"
            }`}
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
        </div>

        {mode === "signup" && (
          <label className="space-y-1 text-sm">
            <span className="font-semibold text-zinc-800">Full name</span>
            <input
              className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
            />
          </label>
        )}

        <label className="space-y-1 text-sm">
          <span className="font-semibold text-zinc-800">Email</span>
          <input
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
          />
        </label>

        <label className="space-y-1 text-sm">
          <span className="font-semibold text-zinc-800">Password</span>
          <input
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            type="password"
          />
        </label>

        <button
          disabled={disabled || isPending}
          onClick={handleSubmit}
          className="rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-500/30 transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
        </button>

        {error && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {success}
          </div>
        )}

        <p className="text-xs text-zinc-500">
          Accounts are stored in the shared Appwrite project. Use the same
          credentials as the Android app or create a new test user here.
        </p>
      </div>
    </div>
  );
}
