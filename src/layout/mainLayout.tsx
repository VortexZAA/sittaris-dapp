import Header from "@/components/header";
import Head from "next/head";
import Image from "next/image";

export default function MainLayout({
  children,
  title,
  bgStatus = true,
}: {
  children: React.ReactNode;
  title: string;
  bgStatus?: boolean;
}) {
  const titleRender = `${title} | Sittaris dApp`;
  return (
    <>
      <Head>
        <title>{titleRender}</title>
      </Head>
      <main
        className={`flex min-h-[100dvh] h-full w-full flex-col items-center justify-end px-4 md:px-6  relative dark:bgGradient bg-white dark:text-white text-black pt-20 ${""} `}
      >
        <Header />
        <div className="flex w-full min-h-[80vh] z-10">{children}</div>
        <footer className="w-full  flex flex-col items-start gap-6 justify-center z-20 pb-6">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={42}
            height={60}
            className="h-16 w-fit"
          />
          <div className="grid grid-cols-3 w-full px-6">
            {footerData.map((item) => (
              <div key={item.id} className="flex flex-col gap-4">
                <h3>{item.title}</h3>
                <div className="flex gap-2 flex-col ">
                  {item.children.map((child) => (
                    <a
                      key={child.id}
                      href={child.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {child.title}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </footer>
      </main>
    </>
  );
}

const footerData = [
  {
    id:1,
    title: "Product",
    children: [
      {
        id: 1,
        title: "FAQ",
        link: "/faq",
      },
      {
        id: 2,
        title: "Whitepaper",
        link: "/whitepaper",
      },
      {
        id: 3,
        title:"Brand Identity",
        link: "/brand-identity"
      }
    ],
  },
  {
    id:2,
    title:"Social",
    children: [
      {
        id: 1,
        title: "X",
        link: "https://twitter.com/sittaris",
      },
      {
        id: 2,
        title: "Telegram",
        link: "https://t.me/sittaris",
      },
      {
        id: 3,
        title: "Linkedin",
        link: "https://www.linkedin.com/company/sittaris",
      },
      {
        id: 4,
        title: "Discord",
        link: "https://discord.com/sittaris",
      },
      {
        id: 5,
        title: "Instagram",
        link: "https://instagram.com/sittaris",
      },
      {
        id: 6,
        title: "Medium",
        link: "https://medium.com/sittaris",
      },
    ],
  },
  {
    id:3,
    title:"Contact",
    children: [
      {
        id: 1,
        title: "company@mail.com",
        link: "mailto:company@mail.com",
      }
    ],
  }


]
