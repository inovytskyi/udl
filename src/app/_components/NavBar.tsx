import logoPic from "./_images/drone_logo.svg";
import Image from "next/image";

function NavBar() {
  return (
    <nav className="flex flex-nowrap items-center justify-start gap-2 border-b-2 border-blue-800 bg-[#2e026d] p-2 text-slate-200">
      <Image src={logoPic} alt="UDL Logo" className="h-10 w-10" />
      <div className="">NavBar</div>
    </nav>
  );
}

export default NavBar;
