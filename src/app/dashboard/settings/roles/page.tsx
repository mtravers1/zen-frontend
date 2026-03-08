'use client'

import DirectorRouteWrapper from "@/components/DirectorRouteWrapper";
import RolesPermissionsPage from "@/pages/dashboard/settings/RolesPermissions";

export default function RolesPermissions() {
  return (
    <DirectorRouteWrapper>
      <RolesPermissionsPage />
    </DirectorRouteWrapper>
  )
}
