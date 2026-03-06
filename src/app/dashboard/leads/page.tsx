'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import LeadsPage from "@/pages/dashboard/Leads";

export default function Leads() {
  return (
    <StaffRouteWrapper>
      <LeadsPage />
    </StaffRouteWrapper>
  )
}
