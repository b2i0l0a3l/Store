const features = [
  {
    icon: "🛒",
    title: "Smart Selling",
    desc: "Blazing-fast product search, cart management, and instant checkout — optimized for busy counters.",
    color: "from-blue-500/20 to-cyan-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: "📊",
    title: "Live Dashboard",
    desc: "Real-time charts, low-stock alerts, revenue trends, and top-client rankings — all at a glance.",
    color: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: "📦",
    title: "Inventory Control",
    desc: "Manage products, categories, and stock levels with powerful filtering and bulk actions.",
    color: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: "👥",
    title: "Client Management",
    desc: "Track every customer, manage debts, record payments, and maintain a full transaction history.",
    color: "from-orange-500/20 to-amber-500/10",
    border: "border-orange-500/20",
  },
  {
    icon: "💳",
    title: "Debt & Payments",
    desc: "Full debt lifecycle: create, track, and settle — with automatic balance updates and payment logs.",
    color: "from-rose-500/20 to-pink-500/10",
    border: "border-rose-500/20",
  },
  {
    icon: "🔌",
    title: "Works Offline",
    desc: "Built as a Progressive Web App — keep selling even without internet. Syncs automatically on reconnect.",
    color: "from-cyan-500/20 to-sky-500/10",
    border: "border-cyan-500/20",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="px-6 pb-32">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="badge-pill mb-4 inline-flex">
            Everything you need
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Built for real retail
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Every module designed to reduce friction and give you instant
            insights on your business.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className={`feature-card glass-card p-6 ${f.border}`}
              style={{ borderColor: undefined }}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 bg-gradient-to-br ${f.color}`}
                style={{ border: `1px solid rgba(255,255,255,0.08)` }}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
