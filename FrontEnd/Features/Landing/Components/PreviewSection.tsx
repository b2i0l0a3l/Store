export default function PreviewSection() {
  return (
    <section id="preview" className="relative px-6 pb-32">
      <div className="max-w-6xl mx-auto">
        <div
          className="glass-card p-3 shadow-2xl"
          style={{ boxShadow: "0 40px 120px rgba(59,130,246,0.18)" }}
        >
          <div
            className="flex items-center gap-2 px-4 py-3 border-b mb-3"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
            <div className="flex-1 mx-4">
              <div
                className="max-w-xs mx-auto h-6 rounded-md flex items-center px-3 gap-2 text-xs text-slate-600"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                storeos.app/dashboard
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 min-h-64">
            <div className="col-span-1 rounded-xl p-3 space-y-2" style={{ background: "rgba(8,14,30,0.8)" }}>
              <div className="h-8 rounded-lg mb-4" style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(6,182,212,0.2))",
              }} />
              {["Selling", "Dashboard", "Products", "Clients", "Orders", "Debts", "Payments"].map((item, i) => (
                <div key={item} className="h-8 rounded-lg flex items-center px-3 gap-2 text-xs" style={{
                  background: i === 1 ? "linear-gradient(135deg, rgba(59,130,246,0.4), rgba(6,182,212,0.3))" : "rgba(255,255,255,0.03)",
                  color: i === 1 ? "#93c5fd" : "#475569",
                }}>
                  <div className="w-3 h-3 rounded-sm" style={{
                    background: i === 1 ? "#60a5fa" : "rgba(255,255,255,0.1)",
                  }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="col-span-3 space-y-3">
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "Revenue", val: "$12,450", color: "#3b82f6" },
                  { label: "Orders", val: "284", color: "#06b6d4" },
                  { label: "Clients", val: "96", color: "#8b5cf6" },
                  { label: "Products", val: "312", color: "#10b981" },
                ].map((c) => (
                  <div key={c.label} className="rounded-xl p-3" style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <div className="text-xs mb-1" style={{ color: "#475569" }}>{c.label}</div>
                    <div className="text-lg font-bold" style={{ color: c.color }}>{c.val}</div>
                    <div className="mt-1 h-1 rounded-full" style={{ background: `${c.color}30` }}>
                      <div className="h-1 rounded-full" style={{ width: "65%", background: c.color }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-4 h-32 flex items-end gap-1.5" style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}>
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm transition-all" style={{
                    height: `${h}%`,
                    background: i % 3 === 0 ? "linear-gradient(to top, #3b82f6, #06b6d4)" : "rgba(59,130,246,0.2)",
                  }} />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3 space-y-2" style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <div className="text-xs font-medium" style={{ color: "#64748b" }}>Recent Orders</div>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-6 rounded-md" style={{ background: "rgba(255,255,255,0.03)" }} />
                  ))}
                </div>
                <div className="rounded-xl p-3 space-y-2" style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <div className="text-xs font-medium" style={{ color: "#64748b" }}>Top Products</div>
                  {[80, 55, 35].map((w, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-4 rounded-sm flex-1" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <div className="h-4 rounded-sm" style={{
                          width: `${w}%`,
                          background: "linear-gradient(to right, #3b82f6, #06b6d4)",
                        }} />
                      </div>
                      <span className="text-xs" style={{ color: "#475569" }}>{w}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px mt-0 mx-12 animate-pulse-glow" style={{
          background: "linear-gradient(to right, transparent, rgba(59,130,246,0.6), rgba(6,182,212,0.6), transparent)",
        }} />
      </div>
    </section>
  );
}
