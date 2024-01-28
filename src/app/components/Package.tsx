import { useState } from "react";

type PackageProps = {
  name: string;
  description: string;
};
export default function Package(props: PackageProps) {
  const [clicked, setClicked] = useState(true);
  
  return (
    <div className={clicked ? "bg-slate-300 text-black" : "bg-blue-500 text-white"}>
    <div className="w-full min-h-20 flex justify-start items-center flex-col p-3" onClick={() => setClicked(!clicked)}>
        <h1 className="text-left">{props.name}</h1>
        <p>{props.description}</p>
      </div>
    </div>
  );
}
