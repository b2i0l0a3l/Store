import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-lg w-full text-center">
        {/* Decorative icon */}
        <div className="mx-auto w-28 h-28 rounded-3xl flex items-center justify-center mb-8 bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/20 shadow-lg shadow-amber-500/5">
          <svg className="w-14 h-14 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>

        {/* Success checkmark */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium text-emerald-300"
          style={{
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.2)",
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          تم التسجيل بنجاح
        </div>

        {/* Main message */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
          حسابك في انتظار التفعيل
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed mb-4">
          لقد تم إنشاء حسابك بنجاح! لكنك تحتاج إلى صلاحيات إضافية للوصول إلى لوحة التحكم.
        </p>
        <p className="text-slate-500 text-base leading-relaxed mb-10">
          يرجى التواصل مع <span className="text-blue-400 font-semibold">المسؤول (Admin)</span> ليقوم بتعيين دورك في النظام وتفعيل صلاحياتك.
        </p>

        {/* Info card */}
        <div className="rounded-2xl p-5 mb-8 text-left"
          style={{
            background: "rgba(59,130,246,0.06)",
            border: "1px solid rgba(59,130,246,0.12)",
          }}
        >
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-blue-300 mb-1">ماذا يجب أن أفعل؟</h3>
              <ul className="text-sm text-slate-400 space-y-1.5">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 shrink-0" />
                  تواصل مع مسؤول النظام (Admin)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 shrink-0" />
                  اطلب منه تعيين دورك (Admin أو Staff)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 shrink-0" />
                  بعد التفعيل، سجّل الدخول مرة أخرى
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/landing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              boxShadow: "0 4px 20px rgba(59,130,246,0.3)",
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            الصفحة الرئيسية
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-300 transition-all duration-200 hover:text-white"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}
