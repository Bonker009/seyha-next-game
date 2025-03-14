import type { Metadata } from "next"
import ZustandClientPage from "./zustand-client-page"

export const metadata: Metadata = {
  title: "Zustand State Management",
  description: "Learn how to use Zustand for state management in React applications.",
}

export default function ZustandPage() {
  return <ZustandClientPage />
}

