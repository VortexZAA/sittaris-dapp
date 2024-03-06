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
import { Fontspring } from "@/fonts";
export default function Sidebar() {
  const router = useRouter();
  const { currentMenu, darkMode } = useAppSelector(selectData);
  const [courses, setCourses] = useState<any[]>([]);
  const dispatch = useAppDispatch();

  async function getCourses() {
    try {
      const courses = await pb.collection("courses").getFullList({
        filter: `end_date >= "${new Date().toISOString()}"`,
      });
      setCourses(courses);
    } catch (error) {
      console.log(error);
    }
  }
  const pathname = router.pathname;
  const { path } = router.query as { path: string };
  useEffect(() => {
    getCourses();
    //dispatch(toggleMenu(localStorage.getItem("currentMenu") || ""));
    const local = localStorage.getItem("darkMode");
    if (local ) {
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
      path: "#",
    },
    {
      id: 1,
      title: "Stake",
      icon: "",
      path: "#",
      children: [
        {
          id: 0,
          title: "Stake",
          pathName: "stake",
        },
        {
          id: 1,
          title: "Unstake",
          pathName: "unstake",
        },
        {
          id: 2,
          title: "Staking History",
          pathName: "staking-history",
        },
      ],
    },
    {
      id: 2,
      title: "Leaderboard",
      icon: "",
      path: "#",
    },
    {
      id: 3,
      title: "Buy SIT Token",
      icon: "",
      path: "#",
    },
  ];
  //console.log(pathname);
  console.log(currentMenu);
  const isCurrentMenu = (item: any) => {
    return (
      pathname.replace("/", "") === item.path ||
      (item?.children &&
        item?.children?.filter((course: any) => course.pathName === path)
          .length > 0)
    );
  };
  return (
    <nav className={` ${Fontspring.className} w-64 flex pt-12 border-r border-sittaris-300/10 px-3 md:px-4`}>
      {
        <ul className="flex flex-col gap-8 text-base z-10 text-black/60 dark:text-white/60 h-[80vh] overflow-y-auto pr-3 pb-6">
          <li key={"connectwallet"} className="w-full" >
            <button className="flex gap-0 items-center border-4 w-full px-2 py-4 rounded-lg border-sittaris-800">
              Connect Wallet
            </button>
          </li>
          <li>
            <div className="flex gap-0 items-center">
              <Link
                href="/profile"
                className={`flex items-center font-bold gap-3 textStyle ${
                  pathname === "/profile"
                    ? " text-purple-600  font-medium"
                    : " hover:text-white"
                } `}
              >
                
                <span>Profile</span>
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
                  className={`flex items-center font-normal gap-3 ${
                    isCurrentMenu(item)
                      ? "gradientText text-purple-600  font-medium"
                      : " hover:text-white"
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
                  <ul className="flex flex-col w-full gap-3 pt-3 text-">
                    {item?.children &&
                      item?.children?.length > 0 &&
                      item?.children.map((course: any) => {
                        return (
                          <li key={course.id}>
                            <Link
                              href={`/courses/${course.pathName}`}
                              className={
                                path === course.pathName
                                  ? "gradientText text-purple-600  font-medium"
                                  : "text-white/60 hover:text-white"
                              }
                            >
                              {course.title}
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
