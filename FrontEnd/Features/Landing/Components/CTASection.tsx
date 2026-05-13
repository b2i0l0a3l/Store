import Link from "next/link";

export default function CTASection() {
  return (
    <section className="px-6 pb-32">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-12 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.15) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <div className="text-5xl mb-5">🚀</div>
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Ready to run your store?
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
              Sign in to your account or create a new one and take full
              control of your business today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="btn-glow text-base">
                Create Account — It&apos;s Free
              </Link>
              <Link href="/login" className="btn-outline text-base">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
