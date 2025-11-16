"use client";

import Link from "next/link";
import { AuthButtons } from "@/components/AuthButtons";
import { AppwriteUser } from "@/lib/useAppwriteUser";

type NavProps = {
  onToggleDashboard: () => void;
  showDashboard: boolean;
  user: AppwriteUser | null;
  loading: boolean;
  logout: () => void;
  isPending: boolean;
};

export function HeaderNav({
  onToggleDashboard,
  showDashboard,
  user,
  loading,
  logout,
  isPending,
}: NavProps) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-lime-400 text-lg font-semibold text-white shadow-lg shadow-emerald-500/30">
            MS
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-700">MealShare</p>
            <p className="text-xs text-zinc-500">Food sharing & hunger relief</p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-zinc-700">
          <a className="hover:text-emerald-700" href="#features">
            Features
          </a>
          <a className="hover:text-emerald-700" href="#roles">
            Roles
          </a>
          <a className="hover:text-emerald-700" href="#flow">
            How it Works
          </a>
          <a className="hover:text-emerald-700" href="#impact">
            Impact
          </a>
          {user && (
            <button
              onClick={onToggleDashboard}
              className="rounded-full border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50"
            >
              {showDashboard ? "View Landing" : "My Dashboard"}
            </button>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {!user && !loading && (
            <>
              <a
                className="hidden rounded-full border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-50 sm:inline-flex"
                href="https://github.com/aimanzahar/MealShare"
                target="_blank"
                rel="noreferrer"
              >
                View Code
              </a>
              <a
                className="hidden rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:translate-y-[-1px] sm:inline-flex"
                href="https://github.com/aimanzahar/MealShare"
                target="_blank"
                rel="noreferrer"
              >
                Get the App
              </a>
            </>
          )}
          <AuthButtons
            user={user}
            loading={loading}
            logout={logout}
            isPending={isPending}
          />
        </div>
      </div>
    </header>
  );
}
