import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: "ORD001",
    customer: { name: "Olivia Martin", email: "olivia@example.com", avatar: "OM" },
    status: "Completed",
    amount: "$1,999.00",
    date: "2024-01-15",
  },
  {
    id: "ORD002",
    customer: { name: "Jackson Lee", email: "jackson@example.com", avatar: "JL" },
    status: "Processing",
    amount: "$39.00",
    date: "2024-01-14",
  },
  {
    id: "ORD003",
    customer: { name: "Isabella Nguyen", email: "isabella@example.com", avatar: "IN" },
    status: "Completed",
    amount: "$299.00",
    date: "2024-01-13",
  },
  {
    id: "ORD004",
    customer: { name: "William Kim", email: "william@example.com", avatar: "WK" },
    status: "Pending",
    amount: "$99.00",
    date: "2024-01-12",
  },
  {
    id: "ORD005",
    customer: { name: "Sofia Davis", email: "sofia@example.com", avatar: "SD" },
    status: "Completed",
    amount: "$2,499.00",
    date: "2024-01-11",
  },
]

const statusColors: Record<string, string> = {
  Completed: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  Processing: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  Pending: "bg-chart-3/10 text-chart-3 border-chart-3/20",
}

export function RecentActivity() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Orders</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-muted-foreground">Order</TableHead>
              <TableHead className="text-muted-foreground">Customer</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-right text-muted-foreground">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id} className="border-border">
                <TableCell className="font-medium text-foreground">{activity.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt={activity.customer.name} />
                      <AvatarFallback className="text-xs">
                        {activity.customer.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {activity.customer.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {activity.customer.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={statusColors[activity.status]}
                  >
                    {activity.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium text-foreground">
                  {activity.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
