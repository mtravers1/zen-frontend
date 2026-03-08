'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import InternalDocumentsPage from "@/pages/dashboard/documents/InternalDocuments";

export default function InternalDocuments() {
  return (
    <StaffRouteWrapper>
      <InternalDocumentsPage />
    </StaffRouteWrapper>
  )
}
