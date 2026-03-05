'use client'

import ProtectedRouteWrapper from "@/components/ProtectedRouteWrapper";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRouteWrapper>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ProtectedRouteWrapper>
  )
}
