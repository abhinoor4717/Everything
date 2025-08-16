"use client";

import { useEffect } from "react";
import { AuthenticateWithRedirectCallback, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SsoCallbackPage() {
  return <AuthenticateWithRedirectCallback />
}
