import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, Clock, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FirmBalancePage = () => {
  const balance = {
    available: 2450.00,
    pending: 350.00,
    credits: 100.00,
  };

  const transactions = [
    { id: 1, date: "2024-01-28", description: "Referral bonus", amount: 100.00, type: "credit" },
    { id: 2, date: "2024-01-25", description: "SMS credits purchase", amount: -50.00, type: "debit" },
    { id: 3, date: "2024-01-20", description: "Balance top-up", amount: 500.00, type: "credit" },
    { id: 4, date: "2024-01-15", description: "E-signature usage", amount: -25.00, type: "debit" },
    { id: 5, date: "2024-01-10", description: "Balance top-up", amount: 1000.00, type: "credit" },
  ];

  return (
    <>
      <DashboardPageHeader
        title="Firm balance"
        description="Manage your account balance and credits"
        icon={<Wallet className="w-5 h-5 text-primary" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Available Balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">${balance.available.toFixed(2)}</span>
            </div>
            <Button className="mt-4 w-full" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Funds
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Pending
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">${balance.pending.toFixed(2)}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Funds being processed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Bonus Credits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">${balance.credits.toFixed(2)}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              From referrals & promotions
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Recent balance activity and transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="text-muted-foreground">
                    {new Date(tx.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {tx.type === "credit" ? (
                        <ArrowDownLeft className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-red-600" />
                      )}
                      {tx.description}
                    </div>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${tx.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                    {tx.type === "credit" ? "+" : ""}{tx.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default FirmBalancePage;

