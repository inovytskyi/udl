
import NavBar from "./_components/NavBar";
import { SimulatorList } from "./_components/SimulatorList";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            <SimulatorList />
          </div>
        </div>
      </main>
    </>
  );
}
