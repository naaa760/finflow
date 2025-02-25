"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false);
    }
  }, [isLoaded]);

  const navigateToDashboard = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  };

  return {
    isAuthenticated: isSignedIn,
    isLoading: !isLoaded || isLoading,
    user,
    navigateToDashboard,
  };
}
