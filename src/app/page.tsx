import { type Simulator } from "@prisma/client";
import { NavBar } from "./_components/NavBar";
import { TreePath } from "./_components/TreePath";
import { api } from "~/trpc/server";
import Link from "next/link";
import { CardImage } from "./_components/CardImage";

export default async function Simulators() {
  const simulators: Simulator[] = await api.tracks.get_simulators.query();
  if (simulators)
    return (
      <>
        <div className="m-4 flex grow flex-wrap gap-4">
          {simulators.map((sim) => {
            return (
              <Link key={sim.id} href={"/maps/" + sim.name}>
                <CardImage image={sim.image} name={sim.name} />
              </Link>
            );
          })}
        </div>
      </>
    );
  else return null;
}
