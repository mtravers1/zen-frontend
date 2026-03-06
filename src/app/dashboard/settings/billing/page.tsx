'use client'

import DirectorRouteWrapper from "@/components/DirectorRouteWrapper";
import BillingSettingsPage from "@/pages/dashboard/settings/BillingSettings";

export default function BillingSettings() {
  return (
    <DirectorRouteWrapper>
      <BillingSettingsPage />
    </DirectorRouteWrapper>
  )
}
