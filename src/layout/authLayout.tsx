import Sidebar from "@/components/auth/sidebar";
import Header from "@/components/header";
import Loader from "@/components/tailwind/loader";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Suspense, use, useEffect, useState } from "react";

export default function AuthLayout({
  children,
  title,
  bgStatus = true,
}: {
  children: React.ReactNode;
  title: string;
  bgStatus?: boolean;
}) {
  const titleRender = `${title} | 0xwilds`;
  
  return (
    <>
      <Head>
        <title>{titleRender}</title>
      </Head>
      <main
        className={`flex flex-col animate-fadeIn500ms min-h-[100dvh] w-full max-w-[100vw] items-center justify-start pt-20    relative  ${
          bgStatus ? "bg-bgGradientCourses" : "bgGradient"
        } `}
      >
        <Header />
        <div className="z-10 flex w-full h-full min-h-[calc(100vh-5rem)] gap-6 relative px-4 md:px-6">
          <Image
            src="/images/coursesbg.png"
            alt="Background"
            width={500}
            height={500}
            className="bottom-0 w-1/3 xl:w-1/4 h-fit absolute z-0 left-0"
          />
          <Sidebar />
          <div className="flex w-full h-full z-10 relative">
            <Suspense  fallback={<Loader />}>{children}</Suspense>
          </div>
        </div>
      </main>
    </>
  );
}
