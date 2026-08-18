import { FiArrowUpRight } from "react-icons/fi";
import { recentOrders } from "./dashboard.data";

export default function RecentOrders() {
  return (
    <section className="rounded-2xl border border-[#eadfe2] bg-white p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-black">Recent orders</h3>
        <FiArrowUpRight className="text-[#b91c4a]" />
      </div>
      <div className="space-y-4">
        {recentOrders.map(([id, name, amount]) => (
          <div
            key={id}
            className="flex items-center justify-between border-b border-[#f3ece9] pb-3 last:border-0"
          >
            <div>
              <p className="text-sm font-bold">{name}</p>
              <p className="text-xs text-[#a799a0]">{id}</p>
            </div>
            <span className="text-sm font-bold">{amount}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
