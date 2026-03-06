'use client'

import ProtectedRouteWrapper from "@/components/ProtectedRouteWrapper";
import ClientPortalLayout from "@/components/portal/ClientPortalLayout";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRouteWrapper>
      <ClientPortalLayout>
        {children}
      </ClientPortalLayout>
    </ProtectedRouteWrapper>
  )
}
