'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import MessagingPage from "@/pages/dashboard/clients/Messaging";

export default function Messaging() {
  return (
    <StaffRouteWrapper>
      <MessagingPage />
    </StaffRouteWrapper>
  )
}
