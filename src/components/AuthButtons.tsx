"use client";

import { AppwriteUser } from "@/lib/useAppwriteUser";

type Props = {
  user: AppwriteUser | null;
  logout: () => void;
  isPending: boolean;
  loading: boolean;
};

export function AuthButtons({ user, logout, isPending, loading }: Props) {
  if (loading) {
    return (
      <div className="rounded-full bg-white/70 px-4 py-2 text-sm text-zinc-500">
        Checking…
      </div>
    );
  }

  if (!user) {
    return (
      <a
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:translate-y-[-1px]"
        href="/login"
      >
        Login
      </a>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-full bg-white/80 px-3 py-1.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 backdrop-blur">
      <span className="max-w-[160px] truncate whitespace-nowrap">
        {user.name || user.email || "Signed in"}
      </span>
      <button
        onClick={logout}
        disabled={isPending}
        className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow hover:translate-y-[-1px] disabled:opacity-60"
      >
        {isPending ? "…" : "Logout"}
      </button>
    </div>
  );
}
