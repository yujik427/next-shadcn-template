import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react"

const kpiData = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Customers",
    value: "2,350",
    change: "+180",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Orders",
    value: "12,234",
    change: "+19%",
    changeType: "positive" as const,
    icon: ShoppingCart,
  },
  {
    title: "Growth Rate",
    value: "+573",
    change: "+201 since last hour",
    changeType: "neutral" as const,
    icon: TrendingUp,
  },
]

export function KPICards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi) => (
        <Card key={kpi.title} className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
            <p
              className={`text-xs ${
                kpi.changeType === "positive"
                  ? "text-chart-2"
                  : "text-muted-foreground"
              }`}
            >
              {kpi.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
