'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import TasksPage from "@/pages/dashboard/workflow/Tasks";

export default function Tasks() {
  return (
    <StaffRouteWrapper>
      <TasksPage />
    </StaffRouteWrapper>
  )
}
