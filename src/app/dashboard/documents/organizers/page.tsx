'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import OrganizersPage from "@/pages/dashboard/documents/Organizers";

export default function Organizers() {
  return (
    <StaffRouteWrapper>
      <OrganizersPage />
    </StaffRouteWrapper>
  )
}
