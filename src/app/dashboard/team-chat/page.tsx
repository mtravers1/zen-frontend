'use client'

import ProtectedRouteWrapper from "@/components/ProtectedRouteWrapper";
import TeamChatPage from "@/pages/dashboard/TeamChat";

export default function TeamChat() {
  return (
    <ProtectedRouteWrapper>
      <TeamChatPage />
    </ProtectedRouteWrapper>
  )
}
