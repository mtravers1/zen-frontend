'use client'

import ProtectedRouteWrapper from "@/components/ProtectedRouteWrapper";
import InsightsPage from "@/pages/dashboard/Insights";

export default function Insights() {
  return (
    <ProtectedRouteWrapper>
      <InsightsPage />
    </ProtectedRouteWrapper>
  )
}
