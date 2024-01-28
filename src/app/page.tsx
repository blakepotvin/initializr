import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Image from "next/image";
import GithubSignin from "./components/GithubSignin";

export default function Home() {
  return (
    <div id="main">
      <div className="w-[800px] h-96 relative mt-56 ml-48">
        <div>
          <span className="text-white text-6xl font-bold font-['Source Serif Pro']">
            Welcome to{" "}
          </span>
          <span className="text-purple-400 text-6xl font-bold font-['Source Serif Pro']">
            Fig
          </span>
          <Image
            alt="fig logo"
            width={210}
            height={167}
            className="rotate-[-10.01deg] absolute -top-32 right-52"
            src="/fig-logo.svg"
          />
        </div>
        <div className="w-[500px] pt-12 text-neutral-500 text-2xl font-['Source Serif Pro']">
          Fig helps you navigate and generate NPM projects with ease. Just pick
          a project name, select your framework and dependencies, and we&apos;ll
          take care of the rest!
        </div>
        <GithubSignin />
      </div>
    </div>
  );
}
