import { type Track } from "@prisma/client";
import { api } from "~/trpc/server";
import { CardImage } from "~/app/_components/CardImage";
import Link from "next/link";

export const TrackList = async ({
  map_name,
  sim_name,
}: {
  map_name: string;
  sim_name: string;
}) => {
  const tracks: Track[] = await api.tracks.get_tracks.query({ map_name });
  if (tracks)
    return (
      <div className="m-4 flex grow flex-wrap gap-4">
        {tracks.map((track) => {
          return (
            <Link
              key={String(track.id)}
              href={"/" + sim_name + "/" + map_name + "/" + track.name}
            >
              <CardImage image={track.image} name={track.name} />
            </Link>
          );
        })}
      </div>
    );
  else return null;
};
