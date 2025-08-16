"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGithub } from "react-icons/fa";

import { useSignIn, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn } = useUser();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSignedIn) router.replace("/dashboard");
  }, [isSignedIn, router]);

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner variant="ellipsis" />
      </div>
    );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;
    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
        strategy: "password",
      });

      if (result.status === "complete") {
        console.log("signin completed");
        await setActive({ session: result.createdSessionId });
        router.replace("/dashboard");
      } else {
        setError("Sign in did not complete. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.errors?.[0]?.message || "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>
                Login with your Google or GitHub account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 mb-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    signIn.authenticateWithRedirect({
                      strategy: "oauth_google",
                      redirectUrl: "/sso-callback",
                      redirectUrlComplete: "/dashboard",
                    });
                  }}
                >
                  Login with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => {
                    signIn.authenticateWithRedirect({
                      strategy: "oauth_github",
                      redirectUrl: "/sso-callback",
                      redirectUrlComplete: "/dashboard",
                    });
                  }}
                >
                  <FaGithub className="w-5 h-5" />
                  Login with GitHub
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <form onSubmit={handleSubmit} className="grid gap-6 mt-4">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    onChange={(e) => setEmailAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Spinner variant="ellipsis" className="w-5 h-5" /> : "Login"}
                </Button>
                {error && (
                  <div className="text-red-500 text-sm text-center">{error}</div>
                )}
              </form>
              <div className="text-center text-sm mt-4">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
