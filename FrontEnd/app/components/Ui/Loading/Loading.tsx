export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      {/* Spinner */}
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-700/40" />
        {/* Spinning gradient arc */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-cyan-500 animate-spin" />
        {/* Inner glow dot */}
        <div className="absolute inset-3 rounded-full bg-linear-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm animate-pulse" />
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-semibold text-slate-300 tracking-wide animate-pulse">
          Loading...
        </p>
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
