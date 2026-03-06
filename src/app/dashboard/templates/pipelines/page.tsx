'use client'

import DirectorRouteWrapper from "@/components/DirectorRouteWrapper";
import PipelinesPage from "@/pages/dashboard/templates/Pipelines";

export default function Pipelines() {
  return (
    <DirectorRouteWrapper>
      <PipelinesPage />
    </DirectorRouteWrapper>
  )
}
