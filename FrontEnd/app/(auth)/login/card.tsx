export default function LoginFormCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8">
      {children}
    </div>
  );
}