//convert to tsx nextjs
import Synaptiq from "@/services/synaptiq";
import dynamic from "next/dynamic";
import React, { Component, useEffect, useState } from "react";
import Dropdown from "../tailwind/Dropdown";
import { Granularities } from "@/types";
import { PeriodData } from "@/data/period";
import AnimateHeight from "react-animate-height";
import { useAppSelector } from "@/hook/redux/hooks";
import { selectData } from "@/redux/auth/auth";
import { InfoIcon } from "../icons";
/* import Chart from "react-apexcharts"; */
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// convert to functional component

const ApexChart = () => {
  const { darkMode } = useAppSelector(selectData);
  const [token, setToken] = useState("");
  const [line, setLineData]: any = useState([]);
  const [column, setColumnData]: any = useState([]);
  const [parameterData, setParameterData] = useState({
    energy: "0",
    specific: "0",
    income: "N/A",
    meter: "N/A",
  });
  const [period, setPeriod] = useState({
    label: "Yesterday",
    key: "yesterday",
  });
  const [parameterPeriod, setParameterPeriod] = useState({
    label: "Yesterday",
    key: "yesterday",
  });
  const [granularities, setGranularities] = useState({
    label: "Hour",
    key: "1-hours",
  });
  const [activeParametre, setActiveParametre] = useState(false);

  const synaptiq = Synaptiq();

  async function getSumData() {
    try {
      let NewToken;
      if (!token) {
        let res = await synaptiq.login();
        NewToken = res.token;
        setToken(res.token);
      } else {
        NewToken = token;
      }
      const start_date = PeriodData.find(
        (item) => item.key === parameterPeriod.key
      )?.start_date?.toISOString();
      const end_date = PeriodData.find(
        (item) => item.key === parameterPeriod.key
      )?.end_date?.toISOString();
      let gran = PeriodData.find((item) => item.key === parameterPeriod.key);
      let specific = await synaptiq.getIndicatorData(
        NewToken,
        gran?.["default-granularity"] || "1-hours",
        "energy.specific",
        start_date || "",
        end_date || ""
      );
      let sumSpecific = specific.data.reduce(
        (acc: any, item: any) => acc + item[1][0][0],
        0
      );
      console.log("sumSpecific", sumSpecific.toFixed(2));
      setParameterData((prev: any) => ({
        ...prev,
        specific: sumSpecific.toFixed(2),
      }));
      let energy = await synaptiq.getIndicatorData(
        NewToken,
        gran?.["default-granularity"] || "1-hours",
        "energy.generation",
        start_date || "",
        end_date || ""
      );
      let sumEnergy = energy.data.reduce(
        (acc: any, item: any) => acc + item[1][0][0],
        0
      );
      console.log("sumEnergy", sumEnergy.toFixed(2));
      setParameterData((prev: any) => ({
        ...prev,
        energy: sumEnergy.toFixed(2),
      }));
    } catch (error) {
      console.log("error", error);
    }
  }

  async function getData() {
    try {
      let NewToken;
      if (!token) {
        let res = await synaptiq.login();
        NewToken = res.token;
        setToken(res.token);
      } else {
        NewToken = token;
      }
      const start_date = PeriodData.find(
        (item) => item.key === period.key
      )?.start_date?.toISOString();
      const end_date = PeriodData.find(
        (item) => item.key === period.key
      )?.end_date?.toISOString();
      let column = await synaptiq.getIndicatorData(
        NewToken,
        granularities.key,
        "energy.generation",
        start_date || "",
        end_date || ""
      );

      setLineData(column || []);
      let line = await synaptiq.getIndicatorData(
        NewToken,
        granularities.key,
        "irradiation.actual",
        start_date || "",
        end_date || ""
      );
      setColumnData(line);
    } catch (error: any) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    getData();
  }, [granularities]);
  useEffect(() => {
    getSumData();
  }, [parameterPeriod]);

  const series = [
    {
      name: "Energy (kWh)",
      type: "column",
      data: column?.data
        ? column.data.map((item: any) => item[1][0][0]?.toFixed(0) || 0)
        : [],
    },
    {
      name: "Irradiation (Wh/m2)",
      type: "line",
      data: line?.data
        ? line.data.map((item: any) => item[1][0][0]?.toFixed(0) || 0)
        : [],
    },
  ];
  const options: any = {
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: false,
          zoom: true,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: true,
        },
      },
    },

    stroke: {
      width: [0, 4],
    },
    title: {
      text: "",
    },
    dataLabels: {
      enabled: false,
      style: {
        colors: ["#F44336", "#E91E63", "#9C27B0"],
      },
    },
    labels: line?.data ? line.data.map((item: any) => item[0]) : [],
    xaxis: {
      type: "datetime",
    },
    colors: ["#0F5429", "#F69320", "#9C27B0"],
    theme: {
      mode: darkMode ? "dark" : "light",
    },
    fill: {
      colors: ["#0F5429", "#F69320", "#9C27B0"],
    },
    markers: {
      colors: ["#0F5429", "#F69320", "#9C27B0"],
    },
    yaxis: [
      {
        title: {
          text: "",
        },
      },
      {
        opposite: true,
        title: {
          text: "",
        },
      },
    ],
  };

  return (
    <div className="w-full apexChart flex flex-col text-black dark:text-white pt-20 ">
      <div className="w-full flex flex-col">
        <div className="flex items-center gap-3 w-full justify-between">
          <button
            onClick={() => setActiveParametre(!activeParametre)}
            className="flex items-center gap-2"
          >
            Parameter{" "}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transform transition-all ${
                !activeParametre ? "rotate-180" : ""
              }`}
            >
              <path
                d="M12 10L8 6L4 10"
                stroke="#F6911D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <PeriodDropDown
            period={parameterPeriod}
            setPeriod={setParameterPeriod}
            placement="bottom-end"
          />
        </div>
        <AnimateHeight height={activeParametre ? "auto" : 0}>
          <div className="w-full grid grid-cols-2 gap-3 py-3 text-black/60 dark:text-white/60">
            {[
              {
                label: "Energy (Meter)",
                value: parameterData.meter,
                scale: "",
              },
              {
                label: "Energy Specific (Obsolete)",
                value: parameterData.specific,
                scale: "kWh/kWp",
              },
              {
                label: "Energy (kWh)",
                value: parameterData.energy,
                scale: "kWh",
              },
              { label: "Income", value: parameterData.income, scale: "" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex gap-1">
                  {item.label}
                  <button className=" hover:text-black transition-colors dark:hover:text-white">
                    <InfoIcon />
                  </button>
                </div>
                <div>
                  {item.value} {item.scale}
                </div>
              </div>
            ))}
          </div>
        </AnimateHeight>
      </div>
      <div className="w-full flex items-center gap-3 text-black/80 dark:text-white/80">
        <div className="flex items-center gap-2 ">
          Period: <PeriodDropDown period={period} setPeriod={setPeriod} />{" "}
        </div>
        <div className="flex items-center gap-2 ">
          Granularity:
          <GranularitiesDropDown
            period={period}
            setPeriod={setPeriod}
            granularities={granularities}
            setGranularities={setGranularities}
          />
        </div>
      </div>
      <Chart
        options={options}
        series={series}
        type="line"
        height={350}
        width={"100%"}
      />
    </div>
  );
};

export default ApexChart;

function PeriodDropDown({
  period,
  setPeriod,
  placement = "bottom-start",
}: {
  period: any;
  setPeriod: Function;
  placement?: string;
}) {
  return (
    <Dropdown
      offset={[0, 4]}
      placement={`${placement}`}
      btnClassName="block p-2  dark:text-white "
      button={
        <div className="flex items-center hover:text-[#03AE5A] gap-2">
          {period.label}
          <DownIcon />
        </div>
      }
    >
      <div className="flex flex-col py-2 gap-2 bg-black/15 backdrop-blur-sm border-black/60 dark:border-white/60 border text-white rounded-lg">
        {PeriodData.map((item, index) => (
          <button
            key={index}
            onClick={() =>
              setPeriod({
                label: item.label,
                key: item.key,
              })
            }
            className={`flex items-center gap-2 px-2 hover:text-[#03AE5A] ${
              period.key === item.key ? "text-[#03AE5A]" : ""
            } `}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </Dropdown>
  );
}
function GranularitiesDropDown({
  period,
  setPeriod,
  granularities,
  setGranularities,
}: {
  period: any;
  setPeriod: Function;
  granularities: any;
  setGranularities: Function;
}) {
  useEffect(() => {
    console.log("period", period);
    let gran = PeriodData.find((item) => item.key === period.key);
    if (gran?.["default-granularity"]) {
      setGranularities({
        label:
          Granularities[
            gran?.["default-granularity"] as keyof typeof Granularities
          ],
        key: gran?.["default-granularity"],
      });
    }
  }, [period]);

  return (
    <Dropdown
      offset={[0, 4]}
      placement={`${"bottom-start"}`}
      btnClassName="block p-2  dark:text-white "
      button={
        <div className="flex items-center gap-2 hover:text-[#03AE5A]">
          {granularities.label} <DownIcon />
        </div>
      }
    >
      <div className="flex flex-col gap-2 py-2 bg-black/15 backdrop-blur-sm border-black/60 dark:border-white/60 border text-white rounded-lg">
        {PeriodData.find((item) => {
          return item.key === period.key;
        })?.granularities.map((item: any, index) => (
          <button
            key={index}
            onClick={() =>
              setGranularities({
                label: Granularities[item as keyof typeof Granularities],
                key: item,
              })
            }
            className={`flex items-center gap-2 px-2 hover:text-[#03AE5A] rounded-lg hover:bg-white-light/90 dark:hover:bg-dark/60 ${
              granularities.key === item ? "text-[#03AE5A]" : ""
            } `}
          >
            <span>{Granularities[item as keyof typeof Granularities]}</span>
          </button>
        ))}
      </div>
    </Dropdown>
  );
}

const DownIcon = () => {
  return (
    <svg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.146691 0.146447C0.341953 -0.0488157 0.658535 -0.0488157 0.853798 0.146447L4.00024 3.29289L7.14669 0.146447C7.34195 -0.0488157 7.65854 -0.0488157 7.8538 0.146447C8.04906 0.341709 8.04906 0.658291 7.8538 0.853553L4.3538 4.35355C4.15854 4.54882 3.84195 4.54882 3.64669 4.35355L0.146691 0.853553C-0.0485714 0.658291 -0.0485714 0.341709 0.146691 0.146447Z"
        fill="currentColor"
      />
    </svg>
  );
};
