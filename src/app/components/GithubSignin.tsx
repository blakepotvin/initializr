"use client";

import { signIn, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function GithubSignin() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignIn = () => signIn();

  const buttonClass =
    "bg-black w-64 h-12 mt-8 flex items-center justify-center rounded-md";

  return (
    <button
      className={buttonClass}
      onClick={session ? () => router.push("/dashboard") : handleSignIn}
      aria-label={session ? "Enter Dashboard" : "Connect with Github"}
    >
      {!session && <FaGithub className="mr-4" />}
      {session ? "Enter Dashboard" : "Connect with Github"}
    </button>
  );
}
