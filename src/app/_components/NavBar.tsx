import Image from "next/image";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

async function NavBar() {
  const session = await getServerAuthSession();
  return (
    <nav className="flex flex-nowrap items-center justify-start gap-2 border-b-2 border-blue-800 bg-[#2e026d] p-2 text-slate-200">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/drone_logo.svg" alt="UDL Logo" width="32" height="32" />
        UDL
      </Link>
      <div className="flex grow flex-nowrap items-center justify-end gap-2">
        <div>{session ? session.user.name : null}</div>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full bg-white/10 px-8 py-2 font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
