import DashboardHeader from "@/components/dashboard/dashboard-header";
import RecentOrders from "@/components/dashboard/recent-orders";
import SalesOverview from "@/components/dashboard/sales-overview";
import StatsSection from "@/components/dashboard/stats-section";

export default function AdminDashboard() {
  return <div className="space-y-8"><DashboardHeader /><StatsSection /><div className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]"><SalesOverview /><RecentOrders /></div></div>;
}
