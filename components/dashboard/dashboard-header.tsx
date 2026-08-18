export default function DashboardHeader() {
  return (
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#b91c4a]">
          Good morning
        </p>
        <h2 className="text-3xl font-black tracking-tight">
          Here&apos;s your store at a glance.
        </h2>
      </div>
      <button className="w-fit rounded-xl bg-[#b91c4a] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#b91c4a]/20 hover:bg-[#8f153a]">
        Download report
      </button>
    </div>
  );
}
