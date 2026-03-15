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
    <div className="group relative flex flex-col bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-500 ">
      <div className={`h-1 w-full bg-linear-to-r ${accentColor}`} />

      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex items-center gap-3 px-6 pt-5 pb-3">
        <div
          className={`p-2 rounded-lg bg-linear-to-br ${accentColor} shadow-lg`}
        >
          <IconComponent className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
      </div>

      <div className="flex-1 px-6 pb-6">{children}</div>
    </div>
  );
}

export default CardSection;