import { type Simulator } from "@prisma/client";
import { api } from "~/trpc/server";
import {CardImage} from "~/app/_components/CardImage";

export const SimulatorList = async () => {
  const simulators: Simulator[] = await api.tracks.get_simulators.query();
  if (simulators)
    return (
      <div className="flex gap-4">
        {simulators.map((sim) => {
          return <CardImage image={sim.image} key={String(sim.id)} name={sim.name} />
        })}
      </div>
    );
  else return null;
};
