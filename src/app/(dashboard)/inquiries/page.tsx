'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import InquiriesPage from "@/pages/dashboard/Inquiries";

export default function Inquiries() {
  return (
    <StaffRouteWrapper>
      <InquiriesPage />
    </StaffRouteWrapper>
  )
}
