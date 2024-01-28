"use client";
import Package from "@/app/components/Package";
import { animate, motion } from "framer-motion";
import {Link} from "react-scroll";
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

const Packages = [
  {"name": "Lodash", "description": "A modern JavaScript utility library delivering modularity, performance & extras.", "framework": "react"},
  {"name": "React Router", "description": "Declarative routing for React", "framework": "react"},
  {"name": "Query", "description": "Hooks for fetching, caching and updating asynchronous data in React", "framework": "react"},
  {"name": "Helmet", "description": "A document head manager for React", "framework": "react"},
  {"name": "React Hook Form", "description": "Performant, flexible and extensible forms with easy-to-use validation", "framework": "react"},
  {"name": "Icons", "description": "Include popular icons in your React projects easily with react-icons, which utilizes ES6 imports that allows you to include only the icons that your project is using.", "framework": "react"},
  {"name": "React Toastify", "description": "React-Toastify allows you to add notifications to your app with ease.", "framework": "react"},
];

export default function Page() {
  const router = useRouter();
  // const searchParams: URLParams = useSearchParams();
  const [framework, setFramework] = useState<string>("");
  const [packages, setPackages] = useState<Package[]>([]);
  const [displayedPackages, setDisplayedPackages] = useState([]);
  const ref = useRef<HTMLDivElement>(null);



  // const updateSearchParameters = (newParams: URLParams) => {
  //   console.log(newParams)
  //   const newUrl = new URL(window.location.href);
  //   Object.keys(newParams).forEach((key) =>
  //     newUrl.searchParams.set(key, newParams[key])
  //   );
  //   router.replace(newUrl.toString());
  //   handleScrollToElement();
  // };

  const handlePost = () => {
    console.log("entered")
    fetch("https://gladly-adequate-muskrat.ngrok-free.app/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_token: "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",
        repo_name: "new_test_repo",
        deps: []
      })
    }).then((res) => res.json()).then((data) => console.log(data)).catch((err) => console.log(err))
  }

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
    // lockScroll();
    fetch("/api/packages")
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   console.log(framework)
  //   const element = document.getElementById("packages");
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //   }
  //   setDisplayedPackages(
  //     packages.filter(
  //       (pkg) => pkg.framework === framework
  //     ) as never[]
  //   );
  // }, [framework]);

  return (
    <>
      <div
        id="first"
        className="h-screen w-screen flex flex-col justify-center items-center "
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 1 }}
          className="w-screen z-auto flex flex-row justify-center mt-24"
        >
          <span className="text-blue-500 text-8xl font-bold text-center mb-24">
            Fig.
          </span>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 1, delay: 2 }}
          className="text-xl font-light text-center text-gray-400 z-auto mb-8"
        >
          Let&apos;s get started with a{" "}
          <span className="font-bold">Project Name:</span>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 1, delay: 2 }}
          className="text-xl font-light text-center text-gray-400 z-auto w-full flex flex-row justify-center"
        >
          <input className="w-[800px] h-36 bg-transparent backdrop-blur-xl border-white text-4xl text-center"></input>
          <button className="text-white bg-blur w-64 h-24 bg-black">
            <Link
              activeClass="active"
              to={"second"}
              smooth={true}
              duration={1000}
            >
              {"Continue"}
            </Link>
          </button>
        </motion.div>
      </div>
      <div id="second" className="h-screen w-screen flex">
        <div className="w-1/2 flex justify-items-center items-center justify-center">
          <h1 className="text-6xl text-left max-w-2xl font-bold text-slate-200">
            Great name! Now, let&apos;s select a framework
          </h1>
        </div>
        <div className="w-1/2">
          <div className="grid grid-cols-2 p-4 gap-8 h-full">
            <button onClick={() => setFramework("react")} className="flex flex-col justify-center items-center w-full h-full backdrop-blur-2xl border-neutral-100 border hover:scale-105 hover:z-50 transition-all rounded-lg">
              <Link
                activeClass="active"
                to={"third"}
                smooth={true}
                duration={1000}
              >
                <img
                  width={200}
                  height={200}
                  src="https://cdn1.iconfinder.com/data/icons/soleicons-fill-vol-1/64/reactjs_javascript_library_atom_atomic_react-512.png"
                ></img>
              </Link>
            </button >
            <button onClick={() => setFramework("vue")} className="flex flex-col justify-center items-center w-full h-full backdrop-blur-2xl border-neutral-100 border hover:scale-105 hover:z-50 transition-all rounded-lg">
              <Link
                activeClass="active"
                to={"third"}
                smooth={true}
                duration={1000}
              >
                <img
                  width={200}
                  height={200}
                  src="https://assets.stickpng.com/images/58482acecef1014c0b5e4a1e.png"
                ></img>
              </Link>
            </button>
            <button onClick={() => setFramework("svelte")} className="flex flex-col justify-center items-center w-full h-full backdrop-blur-2xl border-neutral-100 border hover:scale-105 hover:z-50 transition-all rounded-lg">
              <Link
                activeClass="active"
                to={"third"}
                smooth={true}
                duration={1000}
              >
                <img
                  width={200}
                  height={200}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png"
                ></img>
              </Link>
            </button>
            <button onClick={() => setFramework("nextjs")} className="flex flex-col justify-center items-center w-full h-full backdrop-blur-2xl border-neutral-100 border hover:scale-105 hover:z-50 transition-all rounded-lg">
              <Link
                activeClass="active"
                to={"third"}
                smooth={true}
                duration={1000}
              >
                <img
                  width={200}
                  height={200}
                  src="https://www.datocms-assets.com/75941/1657707878-nextjs_logo.png"
                ></img>
              </Link>
            </button>
          </div>
        </div>
      </div>
      {/* <div id="third" className="h-screen w-screen flex p-10"> */}
          
      <div id="third" className="w-screen flex h-screen p-10">
        <div className="w-1/2 flex justify-center justify-items-center flex-col gap-12 max-w-2xl">
          <h1 className="text-2xl w-full text-white">
            Now, let&apos;s select some packages:
          </h1>
          <p className="text-gray-200 text-lg text-bold max-w-lg">
            Packages add additional functionality to your project, select the
            ones you&apos;d like to use and click Next when you&apos;re done!
          </p>
          <button className="w-64 h-16 bg-blue-500 text-2xl" onClick={() => console.log("test")}>Submit</button>
        </div>
        <div className="w-1/2 mt-4 mx-4 rounded-md">
          {Packages.map((pkg) => <div className="mt-2 mb-2 hover:scale-105" key={1}><Package  name={pkg.name} description={pkg.description}></Package></div>)}
        </div>
      </div>  

    </>
  );
}
