export default function RegisterFormCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-900/95 border border-white/10 rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.5)] ring-1 ring-blue-500/5 p-8">
      {children}
    </div>
  );
}
