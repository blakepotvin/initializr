"use client";

import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Image from "next/image";
import GithubSignin from "./components/GithubSignin";

import { motion } from "framer-motion"

export default function Home() {
  return (
    <div id="main" className="h-screen w-screen flex flex-col justify-center items-center gap-12">

      <motion.div initial={{y:100, opacity: 0}} animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 1 }} className="text-8xl font-bold text-center max-w-4xl">Build Better <code>npm</code> Projects, with <span className="text-blue-700">Fig.</span></motion.div>

      <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 1, delay: 1 }} className="text-3xl font-light text-center max-w-3xl text-gray-400">Easily configure and push your next NPM project, all <span className="font-bold">without leaving your browser.</span></motion.div>

      <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 1, delay: 1 }} className="text-xl font-light text-center max-w-3xl text-gray-400">Fig is a web-based NPM project initializer, helping you make your projects quicker. Simply input a Project Name, choose a Framework, and select which Packages you'd like to use, and we'll build your project, create a Git repository, and push your code. It's as easy as that!</motion.div>
      <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 1, delay: 2 }} ><GithubSignin /></motion.div>

      <p className="text-xs font-light absolute bottom-4">Built with ❤️ for <a href="https://spartahack-9.devpost.com/?ref_feature=challenge&ref_medium=your-open-hackathons&ref_content=Submissions+open">SpartaHack 9</a></p>
    </div>
  );
}
