import { EyeIcon } from "@/components/icons";
import { use, useEffect, useState } from "react";

export default function InputText2({
  label,
  type = "text",
  ...props
}: {
  label: string;
  type?: string;
  [x: string]: any;
}) {
  const [typeInput, setType] = useState(type);
  useEffect(() => {
    setType(type);
  }, [type]);
  return (
    <div className="flex flex-col w-full gap-2">
      <label className="text-sm text-white/60 font-normal">{label}</label>
      <div className="flex w-full items-center relative text-white h-11">
        <input
          className=" bg-white/10 backdrop-blur-md rounded-md h-full w-full flex items-center px-4 py-2 focus:outline-none border-2 border-white/5 focus:border-blue-500"
          type={typeInput}
          {...props}
        />
        {type === "password" && (
          <button type="button"
            onClick={() =>
              setType(typeInput === "password" ? "text" : "password")
            }
            className="focus:outline-none text-white/80 hover:text-white absolute right-3 z-10"
          >
            <EyeIcon className="w-6 h-fit" />
          </button>
        )}
      </div>
    </div>
  );
}
