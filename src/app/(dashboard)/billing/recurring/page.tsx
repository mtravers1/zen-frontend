'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import RecurringInvoicesPage from "@/pages/dashboard/billing/RecurringInvoices";

export default function RecurringInvoices() {
  return (
    <StaffRouteWrapper>
      <RecurringInvoicesPage />
    </StaffRouteWrapper>
  )
}
