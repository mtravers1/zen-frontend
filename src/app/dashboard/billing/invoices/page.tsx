'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import InvoicesPage from "@/pages/dashboard/billing/Invoices";

export default function BillingInvoices() {
  return (
    <StaffRouteWrapper>
      <InvoicesPage />
    </StaffRouteWrapper>
  )
}
