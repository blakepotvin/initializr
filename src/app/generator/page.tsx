import Package from "../components/Package";

export default function Page() {
  return (
    <>
      <div className="flex h-screen p-8">
        <div className="w-1/2 flex justify-items-center items-center">
          <h1 className="text-xl">Let&apos;s select a framework</h1>
        </div>
        <div className="w-1/2">
          <div className="grid grid-cols-2 p-4 gap-8 h-full">
            <div className="w-full h-full bg-red-500 rounded-lg"></div>
            <div className="w-full h-full bg-blue-500 rounded-lg"></div>
            <div className="w-full h-full bg-green-500 rounded-lg"></div>
            <div className="w-full h-full bg-yellow-500 rounded-lg"></div>
          </div>
        </div>
      </div>
      <div className="flex h-screen p-10">
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
            <Package name="test" description="test desc"/>
        </div>
      </div>
    </>
  );
}
