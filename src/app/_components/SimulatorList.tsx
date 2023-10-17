import { type Simulator } from "@prisma/client";
import { api } from "~/trpc/server";

export const SimulatorList = async () => {
  const simulators: Simulator[] = await api.tracks.get_simulators.query();
  if (simulators)
    return (
      <div>
        {simulators.map((sim) => {
          return <div key={sim.id}>{sim.name}</div>;
        })}
      </div>
    );
  else return null;
};
