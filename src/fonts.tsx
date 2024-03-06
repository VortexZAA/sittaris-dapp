import localFont from "next/font/local";

export const FontspringBold = localFont({
  src: [
    {
      path: "/fonts/demo-fonts/demo-termina-demi.otf",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
});

export const Fontspring = localFont({
  src: [
    {
      path: "/fonts/demo-fonts/demo-termina-regular.otf",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
});
export const FontspringLight = localFont({
  src: [
    {
      path: "/fonts/demo-fonts/demo-termina-light.otf",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
});

export const Satoshi = localFont({
    src: "/fonts/Satoshi-Variable.ttf",
    display: 'swap',
  });