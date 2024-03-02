import Loading from "./loading";

export default function Loader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/30  z-50 flex justify-center items-center">
      <Loading />
    </div>
  );
}
