import Image from "next/image";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

type Props = {
  sim?: string;
  map?: string;
  track?: string;
};
export async function NavBar(props: Props) {
  const session = await getServerAuthSession();
  const logPath = session ? "/api/auth/signout" : "/api/auth/signin";
  const callbackUrl = "/";

  return (
    <nav className="flex flex-nowrap items-center justify-start gap-2 border-b-2 border-blue-800 bg-[#2e026d] p-2 text-slate-200">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/drone_logo.svg"
          alt="UDL Logo"
          width="32"
          height="32"
          className="h-8 w-8"
        />
        UDL
      </Link>
      <div className="flex grow flex-nowrap items-center justify-end gap-2">
        <div>{session ? session.user.name : null}</div>
        <Link
          href={{ pathname: logPath, query: { callbackUrl: callbackUrl } }}
          className="text-whiterounded-full rounded-md bg-blue-500  px-7 py-1 
          font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </nav>
  );
}
