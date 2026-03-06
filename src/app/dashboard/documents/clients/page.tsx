'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import ClientDocumentsPage from "@/pages/dashboard/documents/ClientDocuments";

export default function ClientDocuments() {
  return (
    <StaffRouteWrapper>
      <ClientDocumentsPage />
    </StaffRouteWrapper>
  )
}
