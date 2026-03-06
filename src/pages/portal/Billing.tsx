import { useState } from "react";
import ClientPortalLayout from "@/components/portal/ClientPortalLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const mockInvoices = [
  { id: "INV-042", description: "Monthly CFO Service - January", amount: 2500, status: "unpaid", date: "2024-01-15", due: "2024-02-15" },
  { id: "INV-038", description: "Tax Return Preparation", amount: 1200, status: "paid", date: "2023-12-01", due: "2024-01-01" },
  { id: "INV-035", description: "Business Formation Service", amount: 899, status: "paid", date: "2023-11-15", due: "2023-12-15" },
  { id: "INV-031", description: "Quarterly Bookkeeping Q3", amount: 750, status: "paid", date: "2023-10-01", due: "2023-10-31" },
];

const mockPayments = [
  { id: "PAY-015", invoice: "INV-038", amount: 1200, method: "Credit Card", date: "2023-12-20" },
  { id: "PAY-012", invoice: "INV-035", amount: 899, method: "ACH", date: "2023-12-01" },
  { id: "PAY-009", invoice: "INV-031", amount: 750, method: "Credit Card", date: "2023-10-15" },
];

const PortalBilling = () => {
  const [activeTab, setActiveTab] = useState("invoices");

  const totalOutstanding = mockInvoices.filter(i => i.status === "unpaid").reduce((s, i) => s + i.amount, 0);
  const totalPaid = mockInvoices.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);

  return (
    <ClientPortalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3"><CreditCard className="w-6 h-6 text-primary" />Invoices & Payments</h1>
          <p className="text-muted-foreground">View your billing history and outstanding invoices.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border border-border"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Outstanding</p><p className="text-2xl font-bold text-orange-500">${totalOutstanding.toLocaleString()}</p></CardContent></Card>
          <Card className="border border-border"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total Paid</p><p className="text-2xl font-bold text-green-500">${totalPaid.toLocaleString()}</p></CardContent></Card>
          <Card className="border border-border"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total Invoices</p><p className="text-2xl font-bold">{mockInvoices.length}</p></CardContent></Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList><TabsTrigger value="invoices">Invoices</TabsTrigger><TabsTrigger value="payments">Payment History</TabsTrigger></TabsList>
        </Tabs>

        {activeTab === "invoices" ? (
          <Card className="border border-border">
            <CardContent className="p-0">
              <Table>
                <TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Description</TableHead><TableHead>Date</TableHead><TableHead>Due</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Amount</TableHead><TableHead></TableHead></TableRow></TableHeader>
                <TableBody>
                  {mockInvoices.map(inv => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium">{inv.id}</TableCell>
                      <TableCell>{inv.description}</TableCell>
                      <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                      <TableCell className="text-muted-foreground">{inv.due}</TableCell>
                      <TableCell>
                        <Badge className={inv.status === "paid" ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"}>
                          {inv.status === "paid" ? "Paid" : "Unpaid"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">${inv.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {inv.status === "unpaid" && <Button size="sm" onClick={() => toast.success("Redirecting to payment...")}>Pay Now</Button>}
                          <Button variant="ghost" size="icon" onClick={() => toast.success(`Downloading ${inv.id}...`)}><Download className="w-4 h-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <Card className="border border-border">
            <CardContent className="p-0">
              <Table>
                <TableHeader><TableRow><TableHead>Payment</TableHead><TableHead>Invoice</TableHead><TableHead>Date</TableHead><TableHead>Method</TableHead><TableHead className="text-right">Amount</TableHead><TableHead></TableHead></TableRow></TableHeader>
                <TableBody>
                  {mockPayments.map(pay => (
                    <TableRow key={pay.id}>
                      <TableCell className="font-medium">{pay.id}</TableCell>
                      <TableCell className="text-primary">{pay.invoice}</TableCell>
                      <TableCell className="text-muted-foreground">{pay.date}</TableCell>
                      <TableCell>{pay.method}</TableCell>
                      <TableCell className="text-right font-medium">${pay.amount.toLocaleString()}</TableCell>
                      <TableCell><Button variant="ghost" size="icon" onClick={() => toast.success(`Downloading receipt...`)}><Receipt className="w-4 h-4" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </ClientPortalLayout>
  );
};

export default PortalBilling;
