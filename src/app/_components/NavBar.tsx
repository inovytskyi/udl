import Image from "next/image";

function NavBar() {
  return (
    <nav className="flex flex-nowrap items-center justify-start gap-2 border-b-2 border-blue-800 bg-[#2e026d] p-2 text-slate-200">
      <Image src="/drone_logo.svg" alt="UDL Logo" width="32" height="32" />
      <div className="">NavBar</div>
    </nav>
  );
}

export default NavBar;
