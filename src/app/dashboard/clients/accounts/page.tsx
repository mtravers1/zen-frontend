'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import AccountsPage from "@/pages/dashboard/clients/Accounts";

export default function Accounts() {
  return (
    <StaffRouteWrapper>
      <AccountsPage />
    </StaffRouteWrapper>
  )
}
