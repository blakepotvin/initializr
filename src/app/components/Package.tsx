type PackageProps = {
  name: string;
  description: string;
};
export default function Package(props: PackageProps) {
  return (
    <div className="w-full min-h-20 bg-blue-500">
    <div className="flex justify-start items-center flex-col p-3">
        <h1 className="text-left">{props.name}</h1>
        <p>{props.description}</p>
      </div>
    </div>
  );
}
