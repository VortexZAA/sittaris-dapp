import { useState } from "react";
import { InfoIcon } from "./icons";

export function AppDetails() {
  const [data, setData] = useState({
    capacity: "115 kW",
    stake: "1.000 SIT",
  });
  return (
    <div className="flex flex-col gap-6 w-full text-base font-semibold">
      <h3 className="text-sittaris-300">Sittaris App Details</h3>
      <div className="flex justify-between items-center w-full">
        <h4>
          Total Current Capacity of Our Facilities{" "}
          <button className=" hover:text-black transition-colors dark:hover:text-white">
            <InfoIcon />
          </button>
        </h4>
        <span className="text-sittaris-800">{data.capacity}</span>
      </div>
      <div className="flex justify-between items-center w-full">
        <h4>
          Total Stake Amount{" "}
          <button className=" hover:text-black transition-colors dark:hover:text-white">
            <InfoIcon />
          </button>
        </h4>
        <span className="text-sittaris-800">{data.stake}</span>
      </div>
    </div>
  );
}
