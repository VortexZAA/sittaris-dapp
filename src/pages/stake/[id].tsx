import Image from "next/image";
import { Inter } from "next/font/google";
import MainLayout from "@/layout/mainLayout";
import TitleComp from "@/components/title";
import ApexChart from "@/components/charts/mixed";
import Parametre from "@/components/parameter";
import ParametreVertical from "@/components/parameterVertical";
import { AppDetails } from "@/components/appDetails";
import { Token } from "@/components/token";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const [zoneID, setZoneID] = useState<number | null>(null);
  useEffect(() => {
    setZoneID(Number(id));
  }, [id,router.query]);
  console.log(zoneID);
  
  return (
    <MainLayout title="Home">
      <TitleComp
        title="title of this newsletter section"
        description="Lorem ipsum dolor sit amet consectetur. Nibh rhoncus cras ultricies diam arcu venenatis gravida purus. Massa consectetur purus risus tincidunt volutpat in cursus. Quam mi facilisis purus vel in. Elit est non elit scelerisque id accumsan purus tellus."
      />
      <div className=" px-3 flex flex-col gap-6">
        <h3 className={`${"font-fontspringBold"} font-semibold`}>Stake</h3>
        <div className=" flex gap-10  w-full ">
          <div className="px-6 w-2/3 border-[3px] text-base border-black/20 dark:border-white/20 rounded-[18px]">
           {zoneID &&  <ApexChart key={zoneID} height={280} zoneId={zoneID} seriesNames={true} /> }
          </div>
          <div className="w-1/3 flex flex-col gap-10 py-3 ">
            <ParametreVertical />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="card">
            <div className="flex gap-3 items-center w-full justify-between">
              <h4>Total Staking SIT Token</h4>
              <Token amount={12500} />
            </div>
            <div className="flex gap-6">
              <div>
                <h5 className="dark:text-white/50 text-black/50">
                  Unstaking Period
                </h5>
                <span>21 Days</span>
              </div>
              <div>
                <h5 className="dark:text-white/50 text-black/50">Reward</h5>
                <Token
                  amount={"SIT"}
                  addClass="!text-sm"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex gap-3 items-center w-full justify-between">
              <h4>Current Staking Data</h4>
              <Token amount={3000} />
            </div>
            <div className="flex gap-3 items-center w-full justify-between">
              <div className="border rounded dark:border-white/10 border-black/10 px-3 py-1">
                30 Days
              </div>
              <div className="flex gap-3">
                <button className="outlineBtn">Unstake</button>
                <button className="inlineBtn">Stake</button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex gap-3 items-center w-full justify-between">
              <h4>Rewards</h4>
              <Token amount={10000} />
            </div>
            <div className="flex justify-between items-center gap-6">
              <div>
                <h5 className="dark:text-white/50 text-black/50">
                  Reward Distribution Time:
                </h5>
                <span>29 Days 08 Hours 49 Minutes 12 Seconds</span>
              </div>
              <button className="inlineBtn">Claim</button>
            </div>
          </div>
          <div className="card">
            <div className="flex gap-3 items-center w-full justify-between">
              <h4>Unstaking</h4>
              <Token amount={10000} />
            </div>
            <div className="flex justify-between items-center gap-6">
              <div>
                <h5 className="dark:text-white/50 text-black/50">
                  Remaining Time:
                </h5>
                <span>17 Days 08 Hours 49 Minutes 12 Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
