'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import ProposalsELsPage from "@/pages/dashboard/billing/ProposalsELs";

export default function Proposals() {
  return (
    <StaffRouteWrapper>
      <ProposalsELsPage />
    </StaffRouteWrapper>
  )
}
