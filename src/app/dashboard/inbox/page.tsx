'use client'

import ProtectedRouteWrapper from "@/components/ProtectedRouteWrapper";
import InboxPage from "@/pages/dashboard/Inbox";

export default function Inbox() {
  return (
    <ProtectedRouteWrapper>
      <InboxPage />
    </ProtectedRouteWrapper>
  )
}
