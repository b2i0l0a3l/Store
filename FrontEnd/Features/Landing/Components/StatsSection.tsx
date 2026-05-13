const stats = [
  { value: "9+", label: "Feature Modules" },
  { value: "100%", label: "Offline Ready" },
  { value: "<1s", label: "Page Load Time" },
  { value: "∞", label: "Transactions" },
];

export default function StatsSection() {
  return (
    <section id="stats" className="px-6 pb-32">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="stat-badge animate-count-up">
            <div className="text-4xl font-extrabold gradient-text mb-1">
              {s.value}
            </div>
            <div className="text-sm text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
