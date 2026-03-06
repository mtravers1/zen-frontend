'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import TrainingManager from "@/pages/dashboard/TrainingManager";

export default function TrainingPage() {
  return (
    <StaffRouteWrapper>
      <TrainingManager />
    </StaffRouteWrapper>
  )
}
