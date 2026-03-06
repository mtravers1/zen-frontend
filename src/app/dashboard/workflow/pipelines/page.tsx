'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import WorkflowPipelinesPage from "@/pages/dashboard/workflow/Pipelines";

export default function WorkflowPipelines() {
  return (
    <StaffRouteWrapper>
      <WorkflowPipelinesPage />
    </StaffRouteWrapper>
  )
}
