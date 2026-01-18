"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", revenue: 4000, orders: 2400 },
  { month: "Feb", revenue: 3000, orders: 1398 },
  { month: "Mar", revenue: 2000, orders: 9800 },
  { month: "Apr", revenue: 2780, orders: 3908 },
  { month: "May", revenue: 1890, orders: 4800 },
  { month: "Jun", revenue: 2390, orders: 3800 },
  { month: "Jul", revenue: 3490, orders: 4300 },
  { month: "Aug", revenue: 4000, orders: 2400 },
  { month: "Sep", revenue: 3000, orders: 1398 },
  { month: "Oct", revenue: 5000, orders: 6800 },
  { month: "Nov", revenue: 4780, orders: 5908 },
  { month: "Dec", revenue: 5890, orders: 6800 },
]

export function OverviewChart() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Overview</CardTitle>
        <CardDescription>Monthly revenue and orders for 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "hsl(var(--chart-1))",
            },
            orders: {
              label: "Orders",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-orders)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-orders)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                className="text-xs text-muted-foreground"
                tick={{ fill: 'currentColor' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                className="text-xs text-muted-foreground"
                tick={{ fill: 'currentColor' }}
                tickFormatter={(value: number) => `$${value}`}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                strokeWidth={2}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="var(--color-orders)"
                strokeWidth={2}
                fill="url(#colorOrders)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
