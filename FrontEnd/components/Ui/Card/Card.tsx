import React from "react";

interface CardSectionProps {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
  accentColor?: string;
}

 function CardSection({
  title,
  icon: IconComponent,
  children,
  accentColor = "from-blue-500 to-cyan-500",
}: CardSectionProps) {
  return (
    <div className="group relative flex flex-col bg-slate-900/95 border border-white/10 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(59,130,246,0.15)] hover:border-blue-500/30">
      <div className={`h-1.5 w-full bg-gradient-to-r ${accentColor}`} />

      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="flex items-center gap-3 px-6 pt-5 pb-3">
        <div
          className={`p-2.5 rounded-xl bg-gradient-to-br ${accentColor} shadow-md`}
        >
          <IconComponent className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-[1.1rem] font-bold text-slate-100 tracking-tight">{title}</h2>
      </div>

      <div className="flex-1 px-6 pb-6 text-slate-300">{children}</div>
    </div>
  );
}

export default CardSection;