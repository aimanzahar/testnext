"use client";

import { useEffect, useMemo, useState } from "react";
import { HeaderNav } from "@/components/HeaderNav";
import { useAppwriteUser } from "@/lib/useAppwriteUser";
import { Listing } from "@/types/listing";

type Props = {
  listings: Listing[];
};

const featureCards = [
  {
    title: "AI Chatbot Assistant",
    body: "DeepSeek-powered assistant answers donation questions, safety tips, and onboarding flows in real time.",
    badge: "New",
  },
  {
    title: "Reservation Flow",
    body: "End-to-end reservation lifecycle (Pending → Confirmed → Completed) with duplicate prevention and live status.",
    badge: "Core",
  },
  {
    title: "Rich Listings",
    body: "Create listings with up to 10 photos, expiry tracking, smart categories, and pickup windows donors control.",
    badge: "Experience",
  },
  {
    title: "Map & Nearby",
    body: "Interactive map + list toggle shows nearby surplus food with clustering, filters, and distance hints.",
    badge: "Location",
  },
  {
    title: "Role-Based Dashboards",
    body: "Tailored views for Donors, Receivers, and Volunteers with stats, quick actions, and task tracking.",
    badge: "Personalized",
  },
  {
    title: "Impact by Design",
    body: "Built around SDG 2 (Zero Hunger) and SDG 12 (Responsible Consumption) to curb food waste.",
    badge: "Mission",
  },
];

const roles = [
  {
    name: "Donors",
    summary: "Share surplus meals in minutes.",
    items: [
      "One-tap listing with photos & expiry reminders",
      "Control reservations and pickup confirmations",
      "Impact stats: meals donated & food saved",
    ],
  },
  {
    name: "Receivers",
    summary: "Find nearby, safe-to-eat meals fast.",
    items: [
      "Reserve instantly with clear status updates",
      "Navigation to pickup + contact info",
      "Money saved and nutrition trackers",
    ],
  },
  {
    name: "Volunteers",
    summary: "Bridge donors to receivers.",
    items: [
      "Delivery and sorting tasks with urgency cues",
      "Route-friendly pickup planning",
      "Hours logged and people helped stats",
    ],
  },
];

const highlights = [
  { label: "UN SDG Focus", value: "SDG 2 & SDG 12" },
  { label: "Tech Stack", value: "Android · Kotlin · HMS · Appwrite" },
  { label: "Data Trust", value: "Status-colored chips & validation" },
  { label: "Visual Polish", value: "Material 3, gradients, shimmer" },
];

export function HomeClient({ listings }: Props) {
  const { user, loading, logout, isPending } = useAppwriteUser();
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    if (user) setShowDashboard(true);
  }, [user]);

  const impactCards = useMemo(
    () => [
      {
        label: "Meals donated",
        value: user ? "42" : "—",
        caption: user ? "Last 30 days" : "Login to see",
      },
      {
        label: "Receivers helped",
        value: user ? "18" : "—",
        caption: user ? "Across 4 districts" : "Login to see",
      },
      {
        label: "Food saved",
        value: user ? "128 kg" : "—",
        caption: user ? "Est. landfill diversion" : "Login to see",
      },
      {
        label: "Volunteer hours",
        value: user ? "24 h" : "—",
        caption: user ? "Coordinated pickups" : "Login to see",
      },
    ],
    [user]
  );

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50 text-zinc-900">
      <div className="pointer-events-none absolute inset-0 opacity-60 blur-3xl">
        <div className="absolute left-10 top-10 h-56 w-56 rounded-full bg-emerald-200/50" />
        <div className="absolute right-6 top-24 h-64 w-64 rounded-full bg-amber-200/50" />
        <div className="absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/60" />
      </div>

      <HeaderNav
        user={user}
        loading={loading}
        logout={logout}
        isPending={isPending}
        showDashboard={showDashboard}
        onToggleDashboard={() => setShowDashboard((prev) => !prev)}
      />

      <main className="relative z-0 mx-auto flex max-w-6xl flex-col gap-20 px-6 pb-24 pt-10 sm:pt-16">
        {showDashboard && user ? (
          <Dashboard listings={listings} impactCards={impactCards} userName={user.name || user.email || "MealShare User"} />
        ) : (
          <Landing listings={listings} />
        )}

        {!showDashboard && (
          <>
            <FeaturesSection />
            <LiveListings listings={listings} />
            <RolesSection />
            <FlowSection />
            <ImpactSection />
          </>
        )}

        {showDashboard && (
          <>
            <DashboardReservations listings={listings} />
            <ImpactSection />
          </>
        )}
      </main>
    </div>
  );
}

function Landing({ listings }: { listings: Listing[] }) {
  return (
    <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div className="flex flex-col gap-6">
        <div className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 ring-1 ring-emerald-200">
          Zero Hunger • Responsible Consumption
        </div>
        <h1 className="text-balance text-4xl font-semibold leading-[1.05] text-zinc-900 sm:text-5xl">
          Share surplus food, match receivers fast, track every pickup.
        </h1>
        <p className="text-lg leading-7 text-zinc-600 sm:max-w-2xl">
          MealShare links donors, receivers, and volunteers with real-time
          listings, reservation workflows, and a DeepSeek AI assistant—so
          good food is eaten, not wasted.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:translate-y-[-1px]"
            href="https://github.com/aimanzahar/MealShare"
            target="_blank"
            rel="noreferrer"
          >
            Download / Clone
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-50"
            href="#features"
          >
            Explore Features
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white/80 p-4 text-sm shadow-sm ring-1 ring-emerald-100/60 backdrop-blur"
            >
              <p className="text-xs uppercase tracking-wide text-emerald-700">
                {item.label}
              </p>
              <p className="mt-2 font-semibold text-zinc-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 -rotate-3 rounded-[28px] bg-gradient-to-br from-emerald-500/40 via-lime-300/40 to-amber-200/50 blur-xl" />
        <div className="relative overflow-hidden rounded-[28px] bg-white/90 p-6 shadow-2xl ring-1 ring-emerald-100 backdrop-blur">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-emerald-700">
              Live Reservation Timeline
            </p>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Real time
            </span>
          </div>
          <div className="mt-5 space-y-4">
            {[
              {
                title: "Prepared Meals · 3 km away",
                status: "Pending",
                tone: "text-amber-700 bg-amber-50 ring-amber-200",
              },
              {
                title: "Baked Goods · 1.1 km",
                status: "Confirmed",
                tone: "text-emerald-700 bg-emerald-50 ring-emerald-200",
              },
              {
                title: "Produce Box · 5 km",
                status: "Completed",
                tone: "text-sky-700 bg-sky-50 ring-sky-200",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-white px-4 py-3 shadow-sm"
              >
                <div>
                  <p className="font-semibold text-zinc-900">{card.title}</p>
                  <p className="text-sm text-zinc-500">
                    Pickup window · 4:30 – 6:00 PM
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${card.tone}`}
                >
                  {card.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-lime-500 px-5 py-4 text-white shadow-lg shadow-emerald-500/40">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">AI Copilot</p>
              <span className="text-xs uppercase tracking-wide opacity-80">
                DeepSeek
              </span>
            </div>
            <p className="mt-2 text-sm text-emerald-50">
              “How do I mark a reservation as completed?” → Guided steps and
              best practices in chat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            What&apos;s inside
          </p>
          <h2 className="text-3xl font-semibold text-zinc-900">
            Built for real-world food rescue operations.
          </h2>
        </div>
        <p className="max-w-xl text-sm text-zinc-600">
          MealShare connects Huawei & Google location services, Appwrite realtime backend, and Material 3 polish—optimized for donors, receivers, and volunteers to act fast.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featureCards.map((card) => (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-emerald-100/60 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-lime-400 opacity-0 transition group-hover:opacity-100" />
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {card.badge}
              </span>
              <span className="text-lg">🍽️</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              {card.title}
            </h3>
            <p className="mt-2 text-sm text-zinc-600">{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LiveListings({ listings }: { listings: Listing[] }) {
  return (
    <section className="space-y-6 rounded-[28px] bg-white/80 p-8 shadow-sm ring-1 ring-emerald-100" id="live">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Live on MealShare
          </p>
          <h2 className="text-3xl font-semibold text-zinc-900">
            Available food near you (real data).
          </h2>
        </div>
        <p className="max-w-xl text-sm text-zinc-600">
          Pulled directly from Appwrite at request time. Status badges reflect the live reservation state shared with the Android app.
        </p>
      </div>

      {listings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/60 p-6 text-sm text-emerald-800">
          No live listings returned yet. Add food in the Android app or seed documents in Appwrite collection <code className="font-mono">food_listings</code>.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((item) => (
            <div
              key={item.$id}
              className="flex h-full flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-emerald-100/70"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {item.category || "Listing"}
                </span>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                  {item.status || "AVAILABLE"}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold text-zinc-900">
                  {item.title || "Untitled meal"}
                </p>
                <p className="text-sm text-zinc-600">
                  {item.description || "Shared meal listing from MealShare."}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-zinc-700">
                {item.quantity && (
                  <span className="rounded-full bg-zinc-100 px-3 py-1">
                    Qty: {item.quantity}
                  </span>
                )}
                {item.location?.address && (
                  <span className="rounded-full bg-zinc-100 px-3 py-1">
                    {item.location.address}
                  </span>
                )}
                {item.donorName && (
                  <span className="rounded-full bg-zinc-100 px-3 py-1">
                    Donor: {item.donorName}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>
                  {item.$createdAt
                    ? new Date(item.$createdAt).toLocaleString()
                    : "Recently added"}
                </span>
                <span className="font-semibold text-emerald-700">
                  Tap in app to reserve
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function RolesSection() {
  return (
    <section
      id="roles"
      className="grid gap-6 rounded-[28px] bg-gradient-to-br from-white via-emerald-50 to-lime-50 p-8 shadow-inner ring-1 ring-emerald-100"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Role-based journeys
          </p>
          <h2 className="text-3xl font-semibold text-zinc-900">
            Tailored dashboards for every helper.
          </h2>
        </div>
        <p className="max-w-xl text-sm text-zinc-600">
          Personalized entry points keep each role focused—donors publish, receivers claim, volunteers deliver—without stepping on each other.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {roles.map((role) => (
          <div
            key={role.name}
            className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-emerald-100/80"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-900">
                {role.name}
              </h3>
              <span className="text-emerald-600">●</span>
            </div>
            <p className="text-sm text-zinc-600">{role.summary}</p>
            <ul className="space-y-2 text-sm text-zinc-700">
              {role.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function FlowSection() {
  return (
    <section id="flow" className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          How it works
        </p>
        <h2 className="text-3xl font-semibold text-zinc-900">
          From surplus to smiles in three steps.
        </h2>
        <p className="max-w-xl text-sm text-zinc-600">
          MealShare pairs Appwrite realtime updates with Huawei & Google location kits so every reservation, pickup, and delivery stays in sync across roles.
        </p>
        <div className="space-y-3">
          {[
            {
              title: "List or find food",
              body: "Donors post items with photos, expiry, and pickup slots. Receivers browse nearby with filters and urgency badges.",
            },
            {
              title: "Reserve & confirm",
              body: "One-tap reservations trigger status tracking, notifications, and duplicate-prevention safeguards.",
            },
            {
              title: "Pickup & track impact",
              body: "Volunteers deliver, donors mark complete, and everyone sees meals saved plus carbon-friendly wins.",
            },
          ].map((step, idx) => (
            <div key={step.title} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-emerald-100/80">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                  {idx + 1}
                </span>
                <div>
                  <p className="text-base font-semibold text-zinc-900">
                    {step.title}
                  </p>
                  <p className="text-sm text-zinc-600">{step.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[28px] bg-white/90 p-6 shadow-xl ring-1 ring-emerald-100 backdrop-blur">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-emerald-700">Discover Map</p>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Live
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-zinc-700">
          <div className="rounded-2xl bg-emerald-50/80 p-4 ring-1 ring-emerald-100">
            <p className="text-xs uppercase tracking-wide text-emerald-700">
              Cluster map
            </p>
            <p className="mt-1 font-semibold text-zinc-900">
              Tap to expand hotspots and zero in on pickup times.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-50/80 p-4 ring-1 ring-amber-100">
            <p className="text-xs uppercase tracking-wide text-amber-700">
              Filters
            </p>
            <p className="mt-1 font-semibold text-zinc-900">
              Category, distance, expiry urgency, newest, nearest.
            </p>
          </div>
          <div className="rounded-2xl bg-sky-50/80 p-4 ring-1 ring-sky-100">
            <p className="text-xs uppercase tracking-wide text-sky-700">
              List ↔ Map toggle
            </p>
            <p className="mt-1 font-semibold text-zinc-900">
              Keep list and map in sync as users navigate.
            </p>
          </div>
          <div className="rounded-2xl bg-lime-50/80 p-4 ring-1 ring-lime-100">
            <p className="text-xs uppercase tracking-wide text-lime-700">
              GPS & routing
            </p>
            <p className="mt-1 font-semibold text-zinc-900">
              Huawei + Google location kits with safety-first prompts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section
      id="impact"
      className="rounded-[28px] bg-zinc-900 px-8 py-10 text-white shadow-2xl"
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
            Why it matters
          </p>
          <h2 className="text-3xl font-semibold text-white">
            Food shouldn&apos;t be trash. MealShare keeps it moving.
          </h2>
          <p className="text-sm leading-6 text-zinc-300">
            Aligned with the UN Sustainable Development Goals, MealShare reduces waste, speeds redistribution, and empowers local helpers with role-aware tools, AI guidance, and real-time logistics.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Meals saved tracker", value: "Live impact stats" },
            { label: "Volunteer optimization", value: "Route-friendly tasks" },
            { label: "Safety & trust", value: "Status chips + validation" },
            { label: "Inclusive UX", value: "Animations & accessibility" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="text-xs uppercase tracking-wide text-emerald-200">
                {item.label}
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          href="https://github.com/aimanzahar/MealShare"
          target="_blank"
          rel="noreferrer"
        >
          Open GitHub
        </a>
        <a
          className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
          href="mailto:team@mealshare.app"
        >
          Partner with us
        </a>
        <p className="text-xs text-zinc-400">
          Ready for Android • Backend: Appwrite • Maps: HMS + Google
        </p>
      </div>
    </section>
  );
}

function Dashboard({
  listings,
  impactCards,
  userName,
}: {
  listings: Listing[];
  impactCards: { label: string; value: string; caption: string }[];
  userName: string;
}) {
  const upcoming = listings.slice(0, 3);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[32px] bg-white/90 p-8 shadow-xl ring-1 ring-emerald-100">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              Welcome back
            </p>
            <h1 className="text-3xl font-semibold text-zinc-900">
              {userName}
            </h1>
            <p className="text-sm text-zinc-500">
              Track reservations, manage listings, and monitor impact in real time.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50">
              New Listing
            </button>
            <button className="rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 px-4 py-2 text-sm font-semibold text-white shadow shadow-emerald-500/40">
              Open Reservations
            </button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {impactCards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4"
            >
              <p className="text-xs uppercase tracking-wide text-emerald-700">
                {card.label}
              </p>
              <p className="mt-3 text-3xl font-semibold text-zinc-900">
                {card.value}
              </p>
              <p className="text-xs text-zinc-500">{card.caption}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] bg-white/90 p-6 shadow-lg ring-1 ring-emerald-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                Listings
              </p>
              <h2 className="text-xl font-semibold text-zinc-900">
                Active food ready for pickup
              </h2>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              {listings.length} live
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {upcoming.length === 0 && (
              <p className="text-sm text-zinc-500">
                No listings pulled yet. Add items via the Android app or Appwrite console.
              </p>
            )}
            {upcoming.map((item) => (
              <div
                key={item.$id}
                className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-white px-4 py-3 shadow-sm"
              >
                <div>
                  <p className="font-semibold text-zinc-900">
                    {item.title || "Untitled meal"}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {item.location?.address || "Pickup TBD"}
                  </p>
                </div>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                  {item.status || "AVAILABLE"}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] bg-white/90 p-6 shadow-lg ring-1 ring-emerald-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                Pickup routes
              </p>
              <h2 className="text-xl font-semibold text-zinc-900">
                Smart volunteer suggestions
              </h2>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Beta
            </span>
          </div>
          <div className="mt-4 space-y-4 text-sm text-zinc-600">
            <p>
              We prioritize routes based on expiry urgency, distance, and volunteer load. Integrate with HMS + Google maps to dispatch tasks instantly.
            </p>
            <ul className="space-y-2">
              {["Cluster donations within 5 km", "Auto-assign volunteers with idle hours", "Sync pickup times with receivers"].map(
                (item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardReservations({ listings }: { listings: Listing[] }) {
  const reservationStates = ["Pending", "Confirmed", "Completed"];

  return (
    <section className="rounded-[28px] bg-white/90 p-8 shadow-lg ring-1 ring-emerald-100">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Reservations
          </p>
          <h2 className="text-2xl font-semibold text-zinc-900">
            Today&apos;s pickup flow
          </h2>
        </div>
        <button className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50">
          Manage reservations
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {reservationStates.map((status) => (
          <div
            key={status}
            className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4"
          >
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              {status}
            </p>
            <p className="mt-2 text-3xl font-semibold text-zinc-900">
              {listings.filter(
                (listing) =>
                  (listing.status || "AVAILABLE").toUpperCase() ===
                  status.toUpperCase()
              ).length || 0}
            </p>
            <p className="text-xs text-zinc-500">Live across your listings</p>
          </div>
        ))}
      </div>
    </section>
  );
}
