'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import CalendarPage from "@/pages/dashboard/workflow/Calendar";

export default function Calendar() {
  return (
    <StaffRouteWrapper>
      <CalendarPage />
    </StaffRouteWrapper>
  )
}
