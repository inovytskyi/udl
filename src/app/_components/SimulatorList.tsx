import { type Simulator } from "@prisma/client";
import { api } from "~/trpc/server";
import { CardImage } from "~/app/_components/CardImage";
import Link from "next/link";

export const SimulatorList = async () => {
  const simulators: Simulator[] = await api.tracks.get_simulators.query();
  if (simulators)
    return (
      <div className="m-4 flex grow flex-wrap gap-4">
        {simulators.map((sim) => {
          return (
            <Link key={sim.id} href={"/" + sim.name}>
              <CardImage image={sim.image} name={sim.name} />
            </Link>
          );
        })}
      </div>
    );
  else return null;
};
