import { salesData, salesDays } from "./dashboard.data";

export default function SalesOverview() {
  return (
    <section className="rounded-2xl border border-[#eadfe2] bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-black">Sales overview</h3>
          <p className="mt-1 text-xs text-[#a799a0]">
            Revenue performance over the last 7 days
          </p>
        </div>
        <span className="rounded-lg bg-[#fbf7f2] px-3 py-2 text-xs font-bold text-[#756875]">
          This week
        </span>
      </div>
      <div className="flex h-56 items-end gap-3 sm:gap-6">
        {salesData.map((height, index) => (
          <div
            key={salesDays[index]}
            className="flex flex-1 flex-col items-center gap-3"
          >
            <div
              className={`w-full max-w-12 rounded-t-lg ${index === 5 ? "bg-[#b91c4a]" : "bg-[#f1cbd5]"}`}
              style={{ height: `${height}%` }}
            />
            <span className="text-xs text-[#a799a0]">{salesDays[index]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
