'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import TimeEntriesPage from "@/pages/dashboard/billing/TimeEntries";

export default function TimeEntries() {
  return (
    <StaffRouteWrapper>
      <TimeEntriesPage />
    </StaffRouteWrapper>
  )
}
