import Image from "next/image";
import { Inter } from "next/font/google";
import MainLayout from "@/layout/mainLayout";
import { Fontspring, FontspringBold, FontspringLight } from "@/fonts";
import TitleComp from "@/components/title";
import ApexChart from "@/components/charts/mixed";
import Parametre from "@/components/parameter";
import ParametreVertical from "@/components/parameterVertical";
import { AppDetails } from "@/components/appDetails";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <MainLayout title="Home">
      <TitleComp
        title="title of this newsletter section"
        description="Lorem ipsum dolor sit amet consectetur. Nibh rhoncus cras ultricies diam arcu venenatis gravida purus. Massa consectetur purus risus tincidunt volutpat in cursus. Quam mi facilisis purus vel in. Elit est non elit scelerisque id accumsan purus tellus."
      />
      <div className=" px-3 flex flex-col gap-6">
        <h3 className={`${FontspringBold.className} font-semibold`}>
          Dashboard
        </h3>
        <div className="px-6 border-[3px] border-white/60 rounded-[18px]">
          <ApexChart seriesNames={true} />
        </div>
        <div className="grid grid-cols-2 gap-6 text-base font-medium ">
          <div className="flex w-full border-r pr-6 border-white/60">
            <AppDetails />
          </div>
          <ParametreVertical />
        </div>
      </div>
    </MainLayout>
  );
}
