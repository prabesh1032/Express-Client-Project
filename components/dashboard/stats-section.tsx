import { dashboardStats } from "./dashboard.data";

export default function StatsSection() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map(({ label, value, change, icon: Icon }) => (
        <div
          key={label}
          className="rounded-2xl border border-[#eadfe2] bg-white p-5"
        >
          <div className="mb-5 flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7e8ed] text-[#b91c4a]">
              <Icon size={19} />
            </span>
            <span className="text-xs font-bold text-emerald-600">{change}</span>
          </div>
          <p className="text-sm text-[#756875]">{label}</p>
          <p className="mt-1 text-2xl font-black tracking-tight">{value}</p>
        </div>
      ))}
    </section>
  );
}
