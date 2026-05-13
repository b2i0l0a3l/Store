export default function BackgroundEffects() {
  return (
    <>
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-60" />
      <div className="noise-overlay" />

      <div
        className="fixed top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full animate-float-slow pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed bottom-[-150px] right-[-100px] w-[500px] h-[500px] rounded-full animate-float-slower pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 65%)",
        }}
      />
    </>
  );
}
