'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import PaymentsPage from "@/pages/dashboard/billing/Payments";

export default function Payments() {
  return (
    <StaffRouteWrapper>
      <PaymentsPage />
    </StaffRouteWrapper>
  )
}
