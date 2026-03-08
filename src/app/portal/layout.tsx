'use client'

import ProtectedRouteWrapper from "@/components/ProtectedRouteWrapper";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRouteWrapper>
      {children}
    </ProtectedRouteWrapper>
  )
}
