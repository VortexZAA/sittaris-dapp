import { FontspringBold, FontspringLight } from "@/fonts";

export default function TitleComp({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className={`${FontspringLight.className} titleBack font-satoshi
       flex items-center gap-6 w-full p-6`}
    >
      <div className="w-1/3">
        <h1 className={`text-3xl ${FontspringBold.className}`}>
          {title}
        </h1>
      </div>
      <p className="w-2/3 flex text-base font-normal">
        {description}
      </p>
    </div>
  );
}
