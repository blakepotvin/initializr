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
    <div id="first" className="h-screen w-screen flex flex-col justify-center items-center ">
                  
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 0.7, y: 0 }} transition={{ ease: "easeOut", duration: 0.5, delay: 1 }} className="w-screen z-auto flex flex-row justify-center mt-24">
                <span className="text-blue-500 text-8xl font-bold text-center mb-24">Fig.</span>
            </motion.div>
            <motion.div initial={{ y: 100 , opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeOut", duration: 1, delay: 2 }} className="text-xl font-light text-center text-gray-400 z-auto mb-8">Let's get started with a <span className="font-bold">Project Name:</span></motion.div>
            

            <motion.div initial={{ y: 100 , opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 1, delay: 2 }} className="text-xl font-light text-center text-gray-400 z-auto w-full flex flex-row justify-center"><input className="w-[800px] h-36 bg-transparent backdrop-blur-xl border-white text-4xl text-center"></input><button className="text-white bg-blur w-64 h-24 bg-black"><Link activeClass="active" to={"second"} smooth={true} duration={1000}>{"Continue"}</Link></button></motion.div>
            
    </div>  
    <div id="second" className="h-screen w-screen flex">
        <div className="w-1/2 flex justify-items-center items-center justify-center">
            <h1 className="text-6xl text-left max-w-2xl font-bold text-slate-200">Great name! Now, let&apos;s select a framework</h1>
        </div>
        <div className="w-1/2">
            <div className="grid grid-cols-2 p-4 gap-8 h-full">
                <div className="flex flex-col justify-center items-center w-full h-full backdrop-blur-2xl border-neutral-100 border hover:scale-105 hover:z-50 transition-all rounded-lg">
                          <Link activeClass="active" to={"third"} smooth={true} duration={1000}><img width={200} height={200} src="https://cdn1.iconfinder.com/data/icons/soleicons-fill-vol-1/64/reactjs_javascript_library_atom_atomic_react-512.png"></img></Link>
                </div>
                      <div className="flex flex-col justify-center items-center w-full h-full backdrop-blur-2xl border-neutral-100 border hover:scale-105 hover:z-50 transition-all rounded-lg">
                          <Link activeClass="active" to={"third"} smooth={true} duration={1000}><img width={200} height={200} src="https://assets.stickpng.com/images/58482acecef1014c0b5e4a1e.png"></img></Link>

                </div>
                      <div className="flex flex-col justify-center items-center w-full h-full backdrop-blur-2xl border-neutral-100 border hover:scale-105 hover:z-50 transition-all rounded-lg">
                          <Link activeClass="active" to={"third"} smooth={true} duration={1000}><img width={200} height={200} src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png"></img></Link>

                </div>
                      <div className="flex flex-col justify-center items-center w-full h-full backdrop-blur-2xl border-neutral-100 border hover:scale-105 hover:z-50 transition-all rounded-lg">
                          <Link activeClass="active" to={"third"} smooth={true} duration={1000}><img width={200} height={200} src="https://www.datocms-assets.com/75941/1657707878-nextjs_logo.png"></img></Link>

                </div>
            </div>
        </div>
    </div>
    <div id="third" className="h-screen w-screen">

    </div>
      {/* <div className="flex h-screen p-8">
        
      </div> */}
      {/* <div className="flex h-screen p-10">
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
      </div> */}
    </>
  );
}
