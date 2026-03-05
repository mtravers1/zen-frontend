'use client'

import DirectorRouteWrapper from "@/components/DirectorRouteWrapper";
import SiteBuilderPage from "@/pages/dashboard/settings/SiteBuilder";

export default function SiteBuilder() {
  return (
    <DirectorRouteWrapper>
      <SiteBuilderPage />
    </DirectorRouteWrapper>
  )
}
