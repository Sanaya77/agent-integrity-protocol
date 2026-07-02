interface Props {
  title: string;
  value: string;
  change: string;
}

export default function StatCard({
  title,
  value,
  change,
}: Props) {
  return (
    <div className="bg-[#10182B] rounded-2xl p-6 border border-cyan-500/10">

      <p className="text-gray-400">{title}</p>

      <h2 className="text-4xl font-bold mt-3">
        {value}
      </h2>

      <p className="text-cyan-400 mt-2">
        {change}
      </p>

    </div>
  );
}