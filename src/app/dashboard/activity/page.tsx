'use client'

import StaffRouteWrapper from "@/components/StaffRouteWrapper";
import ActivityFeedPage from "@/pages/dashboard/ActivityFeed";

export default function Activity() {
  return (
    <StaffRouteWrapper>
      <ActivityFeedPage />
    </StaffRouteWrapper>
  )
}
