import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { CreditCard, Download, FileText, Calendar, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const downloadInvoice = (id: string, date: string, amount: string, plan: string) => {
  const content = [
    "INVOICE",
    "=======",
    `Invoice #:  ${id}`,
    `Date:       ${new Date(date).toLocaleDateString()}`,
    `Plan:       ${plan}`,
    `Status:     PAID`,
    "",
    `AMOUNT:     ${amount}`,
  ].join("\n");
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `${id}.txt`; a.click();
  URL.revokeObjectURL(url);
};

const BillingSettingsPage = () => {
  const [paymentMethod, setPaymentMethod] = useState({ type: "Visa", last4: "4242", expiry: "12/26" });
  const [updateOpen, setUpdateOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [newExpiry, setNewExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleUpdatePayment = () => {
    if (cardNumber.length < 4) { toast.error("Please enter a valid card number"); return; }
    if (!newExpiry) { toast.error("Please enter an expiry date"); return; }
    if (!cvv) { toast.error("Please enter CVV"); return; }
    setPaymentMethod({ type: "Visa", last4: cardNumber.slice(-4), expiry: newExpiry });
    toast.success("Payment method updated");
    setUpdateOpen(false);
    setCardNumber(""); setNewExpiry(""); setCvv("");
  };

  const nextBilling = {
    date: "February 1, 2024",
    amount: "$294.00",
    plan: "Professional (6 seats)",
  };

  const invoices = [
    { id: "INV-2024-001", date: "2024-01-01", amount: "$294.00", status: "paid" },
    { id: "INV-2023-012", date: "2023-12-01", amount: "$294.00", status: "paid" },
    { id: "INV-2023-011", date: "2023-11-01", amount: "$245.00", status: "paid" },
    { id: "INV-2023-010", date: "2023-10-01", amount: "$245.00", status: "paid" },
  ];

  return (
    <>
      <DashboardPageHeader
        title="Billing"
        description="Manage your subscription and payment methods"
        icon={<CreditCard className="w-5 h-5 text-primary" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Your default payment method for subscriptions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">{paymentMethod.type} •••• {paymentMethod.last4}</p>
                  <p className="text-sm text-muted-foreground">Expires {paymentMethod.expiry}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setUpdateOpen(true)}>Update</Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Billing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Next Billing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{nextBilling.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium">{nextBilling.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="text-xl font-bold">{nextBilling.amount}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Invoice History
          </CardTitle>
          <CardDescription>
            Download past invoices for your records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Paid
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => downloadInvoice(invoice.id, invoice.date, invoice.amount, nextBilling.plan)}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Update Payment Method</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Card Number</Label>
              <Input placeholder="1234 5678 9012 3456" value={cardNumber} onChange={e => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Expiry (MM/YY)</Label>
                <Input placeholder="MM/YY" value={newExpiry} onChange={e => setNewExpiry(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>CVV</Label>
                <Input placeholder="123" value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdatePayment}>Save Card</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BillingSettingsPage;

