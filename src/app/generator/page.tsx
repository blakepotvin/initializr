"use client";
import Package from "@/app/components/Package";
import { animate } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type URLParams = {
  framework: string;
  [key: string]: string; // Add index signature
};

type Package = {
  name: string;
  description: string;
  framework: string;
};

function lockScroll() {
  document.body.style.overflow = "hidden";
}

export default function Page() {
  const router = useRouter();
  const searchParams: URLParams = useSearchParams();
  const [packages, setPackages] = useState<Package[]>([]);
  const [displayedPackages, setDisplayedPackages] = useState([]);
  const ref = useRef<HTMLDivElement>(null);

  const updateSearchParameters = (newParams: URLParams) => {
    const newUrl = new URL(window.location.href);
    Object.keys(newParams).forEach((key) =>
      newUrl.searchParams.set(key, newParams[key])
    );
    router.replace(newUrl.toString());
    handleScrollToElement();
  };

  const handleScrollToElement = () => {
    if (ref.current) {
      const position = ref.current.offsetTop; // Get the top position of the element
      smoothScrollTo(position);
    }
  };

  // Instead of a custom hook, we define a function that takes care of the animation
  const smoothScrollTo = (position: number) => {
    animate(window.scrollY, position, {
      type: "tween",
      duration: 0.8,
      onUpdate: (value) => window.scrollTo(0, value),
    });
  };

  useEffect(() => {
    lockScroll();
    setPackages(
      await fetch("/api/packages")
        .then((res) => res.json())
        .catch((err) => console.log(err))
    );
  }, []);

  useEffect(() => {
    const element = document.getElementById("packages");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setDisplayedPackages(
      packages.filter((pkg) => pkg.framework === searchParams.framework)
    );
  }, [searchParams]);

  return (
    <>
      <div className="flex h-screen p-8">
        <div className="w-1/2 flex justify-items-center items-center">
          <h1 className="text-xl">Let&apos;s select a framework</h1>
        </div>
        <div className="w-1/2">
          <div className="grid grid-cols-2 p-4 gap-8 h-full">
            <button
              onClick={() => updateSearchParameters({ framework: "react" })}
            >
              <div className="w-full h-full bg-red-500 rounded-lg"></div>
            </button>
            <button
              onClick={() => updateSearchParameters({ framework: "vue" })}
            >
              <div className="w-full h-full bg-blue-500 rounded-lg"></div>
            </button>
            <button
              onClick={() => updateSearchParameters({ framework: "angular" })}
            >
              <div className="w-full h-full bg-green-500 rounded-lg"></div>
            </button>
            <button
              onClick={() => updateSearchParameters({ framework: "svelte" })}
            >
              <div className="w-full h-full bg-yellow-500 rounded-lg"></div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex h-screen p-10" ref={ref}>
        <div className="w-1/2 flex justify-items-center flex-col">
          <h1 className="text-xl w-full">
            Now, let&apos;s select some packages:
          </h1>
          <p className="text-gray-400 text-lg">
            Packages add additional functionality to your project, select the
            ones you&apos;d like to use and click Next when you&apos;re done!
          </p>
        </div>
        <div className="w-1/2 mt-4 mx-4 bg-red-500 rounded-md">
          <Package name="test" description="test desc" />
        </div>
      </div>
    </>
  );
}
