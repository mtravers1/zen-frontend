'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import JobRecurrencesPage from "@/pages/dashboard/workflow/JobRecurrences";

export default function Recurrences() {
  return (
    <StaffRouteWrapper>
      <JobRecurrencesPage />
    </StaffRouteWrapper>
  )
}
