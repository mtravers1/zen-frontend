'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import JobsPage from "@/pages/dashboard/workflow/Jobs";

export default function Jobs() {
  return (
    <StaffRouteWrapper>
      <JobsPage />
    </StaffRouteWrapper>
  )
}
