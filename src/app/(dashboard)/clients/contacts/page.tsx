'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import ContactsPage from "@/pages/dashboard/clients/Contacts";

export default function Contacts() {
  return (
    <StaffRouteWrapper>
      <ContactsPage />
    </StaffRouteWrapper>
  )
}
