import { type Map } from "@prisma/client";
import { api } from "~/trpc/server";
import { CardImage } from "~/app/_components/CardImage";
import Link from "next/link";

export const MapList = async ({ sim_name }: { sim_name: string }) => {
  const maps: Map[] = await api.tracks.get_maps.query({ sim_name });
  if (maps)
    return (
      <div className="m-4 flex grow flex-wrap gap-4">
        {maps.map((map) => {
          return (
            <Link key={String(map.id)} href={"/" + sim_name + "/" + map.name}>
              <CardImage image={map.image} name={map.name} />
            </Link>
          );
        })}
      </div>
    );
  else return null;
};
