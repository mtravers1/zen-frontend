'use client'

import DirectorRouteWrapper from "@/components/DirectorRouteWrapper";
import TeamPlansPage from "@/pages/dashboard/settings/TeamPlans";

export default function TeamPlans() {
  return (
    <DirectorRouteWrapper>
      <TeamPlansPage />
    </DirectorRouteWrapper>
  )
}
