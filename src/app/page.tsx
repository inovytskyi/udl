
import NavBar from "./_components/NavBar";
import { SimulatorList } from "./_components/SimulatorList";

export default function Home() {
  return (
    <>
        <main className="flex flex-col min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white ">
        <NavBar />
        <div className="flex items-center justify-center grow">
        <SimulatorList />
        </div>
        </main>
    </>
  );
}
