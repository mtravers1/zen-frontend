'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import AssignmentsPage from "@/pages/dashboard/clients/Assignments";

export default function Assignments() {
  return (
    <StaffRouteWrapper>
      <AssignmentsPage />
    </StaffRouteWrapper>
  )
}
