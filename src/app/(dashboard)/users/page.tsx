'use client'

import DirectorRouteWrapper from "@/components/DirectorRouteWrapper";
import UsersPage from "@/pages/dashboard/Users";

export default function Users() {
  return (
    <DirectorRouteWrapper>
      <UsersPage />
    </DirectorRouteWrapper>
  )
}
