'use client'

import DirectorRouteWrapper from "@/components/DirectorRouteWrapper";
import ClientSignupPage from "@/pages/dashboard/settings/ClientSignup";

export default function ClientSignup() {
  return (
    <DirectorRouteWrapper>
      <ClientSignupPage />
    </DirectorRouteWrapper>
  )
}
