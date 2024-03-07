import Link from "next/link";
import {
  ArrowLeftGradientIcon,
  CoursesIcon,
  DropdowIcon,
  MoonIcon,
  MyCoursesIcon,
  PastCoursesIcon,
  ProfileIcon,
  SunIcon,
} from "@/components/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import pb from "@/lib/pocketbase";
import { useAppDispatch, useAppSelector } from "@/hook/redux/hooks";
import { darkModeTogle, selectData, toggleMenu } from "@/redux/auth/auth";

export default function Sidebar() {
  const router = useRouter();
  const { currentMenu, darkMode } = useAppSelector(selectData);
  const dispatch = useAppDispatch();

  const pathname = router.pathname;
  const { path } = router.query as { path: string };
  useEffect(() => {
    //dispatch(toggleMenu(localStorage.getItem("currentMenu") || ""));
    const local = localStorage.getItem("darkMode");
    if (local) {
      darkModeToggle(local === "true" ? true : false);
    }
  }, []);
  function darkModeToggle(status: boolean) {
    const html = document.querySelector("html");
    dispatch(darkModeTogle(status));
    localStorage.setItem("darkMode", status ? "true" : "false");
    if (status) {
      html?.classList.add("dark");
    } else {
      html?.classList.remove("dark");
    }
  }

  const sidebar = [
    {
      id: 0,
      title: "Dashboard",
      icon: "",
      path: "/",
    },
    {
      id: 1,
      title: "Personal Information",
      icon: "",
      path: "/personel-info",
    },
    {
      id: 2,
      title: "Stake",
      icon: "",
      path: "/stake",
      children: [
        {
          id: 0,
          title: "Zone 1",
          pathName: "1",
        },
        {
          id: 1,
          title: "Zone 2",
          pathName: "2",
        },
        {
          id: 2,
          title: "Zone 3",
          pathName: "3",
        },
      ],
    },
    {
      id: 3,
      title: "Leaderboard",
      icon: "",
      path: "#",
    },
    {
      id: 4,
      title: "Buy SIT Token",
      icon: "",
      path: "#",
    },
  ];
  //console.log(pathname);
  console.log(currentMenu);
  const isCurrentMenu = (item: any) => {
    return (
      pathname === item.path ||
      (item?.children &&
        item?.children?.filter((course: any) => course.pathName === path)
          .length > 0)
    );
  };
  return (
    <nav
      className={` font-fontspring w-72 flex pt-12 border-r border-sittaris-300/10 px-3 md:px-4`}
    >
      {
        <ul className="flex flex-col gap-8 text-base z-10 text-black/60 dark:text-white/60 h-[85vh] overflow-y-auto w-full pb-12 py-2">
          <li key={"connectwallet"} className="w-full">
            <button className="flex justify-center items-center gap-0 hover:text-black transition-colors dark:hover:text-white border-4 w-full px-2 py-4 rounded-lg border-sittaris-800">
              Connect Wallet
            </button>
          </li>
          <li>
            <div className="flex gap-0 items-center">
              <Link
                href="/profile"
                className={`flex items-center font-fontspringBold font-bold gap-3 textStyle ${
                  pathname === "#"
                    ? " text-purple-600  font-medium"
                    : " dark:hover:text-white hover:text-black"
                } `}
              >
                <span>Public Sale</span>
                <ArrowLeftGradientIcon />
              </Link>
            </div>
          </li>
          {sidebar.map((item) => (
            <li key={item.id}>
              <div className="flex gap-0 items-center">
                <Link
                  onClick={() => {
                    dispatch(toggleMenu(item.title));
                  }}
                  className={`flex items-center border-b-2 border-transparent transition-colors font-normal gap-3 ${
                    isCurrentMenu(item)
                      ? " !border-sittaris-300 text-black dark:text-white  font-medium"
                      : " dark:hover:text-white hover:text-black hover:border-sittaris-300"
                  } `}
                  href={`/${item.path}`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
                {item?.children && (
                  <button
                    onClick={() => dispatch(toggleMenu(item?.title))}
                    className="flex h-full w-6 items-center justify-end"
                  >
                    <DropdowIcon
                      className={`${
                        currentMenu === item.title
                          ? "transform rotate-180"
                          : "transform rotate-0"
                      } transition-all w-4 h-fit`}
                    />
                  </button>
                )}
              </div>
              {item?.children && (
                <AnimateHeight height={currentMenu === item.title ? "auto" : 0}>
                  <ul className="flex flex-col w-full gap-3 pt-3 ">
                    {item?.children &&
                      item?.children?.length > 0 &&
                      item?.children.map((child: any) => {
                        return (
                          <li key={child.id}>
                            <Link
                              href={`${item.path}/${child.pathName}`}
                              className={
                                path === child.pathName
                                  ? "gradientText  text-black dark:white  font-medium"
                                  : "dark:text-white/60 text-black/60  hover:text-black dark:hover:text-white"
                              }
                            >
                              {child.title}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </AnimateHeight>
              )}
            </li>
          ))}
          <li>
            <button className="w-full">
              <input
                type="checkbox"
                id="darkmode-toggle"
                checked={darkMode}
                onChange={(e) => darkModeToggle(e.target.checked)}
              />
              <label htmlFor="darkmode-toggle">
                <MoonIcon />
                <SunIcon />
              </label>
            </button>
          </li>
        </ul>
      }
    </nav>
  );
}
