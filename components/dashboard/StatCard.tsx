import { TrendingUp, Bot, ShieldCheck, Activity, Coins } from "lucide-react";

interface Props {
  title: string;
  value: string;
  change: string;
  iconType?: "agents" | "proofs" | "trust" | "stake";
}

export default function StatCard({ title, value, change, iconType }: Props) {
  const getIcon = () => {
    switch (iconType) {
      case "agents":
        return <Bot className="w-5 h-5 text-cyan-400" />;
      case "proofs":
        return <ShieldCheck className="w-5 h-5 text-blue-400" />;
      case "trust":
        return <Activity className="w-5 h-5 text-emerald-400" />;
      case "stake":
        return <Coins className="w-5 h-5 text-purple-400" />;
      default:
        return <TrendingUp className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 glass-card-hover group relative overflow-hidden">
      <div className="flex justify-between items-start">
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{title}</p>
        <div className="p-2.5 rounded-2xl bg-[#050917] border border-cyan-500/15 group-hover:scale-110 transition-transform">
          {getIcon()}
        </div>
      </div>

      <h2 className="text-3xl font-extrabold text-white mt-4 tracking-tight">
        {value}
      </h2>

      <div className="flex items-center gap-1.5 mt-3 text-xs font-semibold text-cyan-400">
        <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-400/20 text-cyan-300">
          {change}
        </span>
        <span className="text-gray-500 font-normal">vs last week</span>
      </div>
    </div>
  );
}