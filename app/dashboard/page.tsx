import { KPICards } from "@/components/dashboard/kpi-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { OverviewChart } from "@/components/dashboard/overview-chart"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your business.
        </p>
      </div>

      <KPICards />

      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <OverviewChart />
        </div>
        <div className="lg:col-span-3">
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
