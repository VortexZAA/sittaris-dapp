import pb from "@/lib/pocketbase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "./tailwind/loader";
import { useAppSelector } from "@/hook/redux/hooks";
import { selectData } from "@/redux/auth/auth";

export default function Header() {
  const [loading, setLoading] = useState(false);
  const { loading: Loading } = useAppSelector(selectData);
  //const router = useRouter();
  useEffect(() => {
    setLoading(Loading);
  }, [Loading]);
  return (
    <>
      {loading && <Loader />}
      <header className=" absolute left-0 top-0 w-full px-3 md:px-6 py-2 z-40">
        <div className="flex items-center justify-between">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={42}
              height={60}
              className="mr-4 h-20 w-fit"
            />
          </Link>
          <div className="flex items-center gap-6 dark:text-white">
            <div className=" flex items-center gap-2">
              <Image
                src={"/assets/tokens/tether.svg"}
                width={16}
                height={16}
                alt=""
              />
              123.000
            </div>
            <div className=" flex items-center gap-2">
              <Image
                src={"/assets/tokens/sittaris.svg"}
                width={16}
                height={16}
                alt=""
              />
              123.000
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
