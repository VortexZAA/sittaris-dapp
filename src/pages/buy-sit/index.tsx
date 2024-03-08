import Image from "next/image";
import { Inter } from "next/font/google";
import MainLayout from "@/layout/mainLayout";
import TitleComp from "@/components/title";
import ApexChart from "@/components/charts/mixed";
import Parametre from "@/components/parameter";
import ParametreVertical from "@/components/parameterVertical";
import { AppDetails } from "@/components/appDetails";
import ZoneApexChart from "@/components/charts/zoneChart";
import { useState } from "react";
import { DownIcon, ZoneDropDown } from "@/components/charts";
import { Zones } from "@/data/zones";
import { SwitchIcon } from "@/components/icons";
import { Token } from "@/components/token";
import Dropdown from "@/components/tailwind/Dropdown";
import { TetherTokenIcon, UsdcIcon } from "@/components/icons/tokens";
import InputText from "@/components/tailwind/input";

const inter = Inter({ subsets: ["latin"] });

const tokens = [
  {
    symbol: "USDT",
    icon: <TetherTokenIcon className="w-6 h-6" />,
    key: "SIT",
  },
  {
    symbol: "USDC",
    icon: <UsdcIcon className="w-6 h-6" />,
    key: "USD",
  },
];

export default function Home() {
  const [zone, setZone] = useState({
    label: "Zone 1",
    key: "plants/P25829",
  });
  const [token, setToken] = useState(tokens[0]);
  return (
    <MainLayout title="Home">
      <TitleComp
        title="title of this newsletter section"
        description="Lorem ipsum dolor sit amet consectetur. Nibh rhoncus cras ultricies diam arcu venenatis gravida purus. Massa consectetur purus risus tincidunt volutpat in cursus. Quam mi facilisis purus vel in. Elit est non elit scelerisque id accumsan purus tellus."
      />
      <div className=" px-3 flex flex-col gap-6">
        <h3 className={`${"font-fontspringBold"} font-semibold`}>
          Buy SIT Token
        </h3>
        <div className="px-0 flex w-full gap-3 md:gap-6 lg:gap-10 2xl:gap-16">
          <div className="w-1/2  gap-6 flex ">
            <div className="w-1/3">
              <Image
                src="/assets/img/treecircle.svg"
                alt="buy sit"
                className="w-full"
                width={500}
                height={500}
              />
            </div>
            <div className="w-2/3 h-fit flex flex-col gap-6">
              <div className="card" >
                <h4>Amount of Payment</h4>
                <div className="flex gap-4 items-center">
                  <InputText type="text"  addClass="text-right" placeholder="0.00" />
                  <Dropdown
                    offset={[0, 4]}
                    placement={`bottom-end`}
                    btnClassName="block p-0  dark:text-white w-fit "
                    button={
                      <div className="flex dark:text-white items-center justify-between hover:text-[#03AE5A] gap-3 md:gap-6 2xl:gap-8 border rounded dark:border-white/10  border-black/10 py-2 px-3 h-11 w-full">
                        <div className="flex gap-2 items-center">
                          {token.icon}
                          {token?.symbol}
                        </div>
                        <DownIcon className="w-3 h-fit" />
                      </div>
                    }
                  >
                    <div className="flex flex-col gap-0 bg-black/50 backdrop-blur-sm border-black/60 dark:border-white/40 border  text-white rounded-lg ">
                      {tokens.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => setToken(item)}
                          className="flex items-center gap-2 first:border-0 border-t py-3 px-6  hover:text-[#03AE5A]"
                        >
                          {item.icon}
                          <span>{item?.symbol}</span>
                        </button>
                      ))}
                    </div>
                  </Dropdown>
                </div>
              </div>
              <div className="card"></div>
            </div>
          </div>

          <div className="w-1/2 flex flex-col gap-4">
            <AppDetails addClass=" dark:text-white/70 text-black/70" />
            <ParametreVertical
              addClass=" dark:text-white/70 text-black/70"
              plantKey={zone.key}
            />
            <ZoneApexChart
              key={zone.key}
              zoneData={zone}
              height={280}
              seriesNames={true}
              align="left"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
