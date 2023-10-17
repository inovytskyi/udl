import { type Track } from "@prisma/client";
import { api } from "~/trpc/server";
import { CardImage } from "~/app/_components/CardImage";

export const TrackList = async ({ map_name }: { map_name: string }) => {
  const tracks: Track[] = await api.tracks.get_tracks.query({ map_name });
  if (tracks)
    return (
      <div className="m-4 flex grow flex-wrap gap-4">
        {tracks.map((track) => {
          return (
            <CardImage
              image={track.image}
              key={String(track.id)}
              name={track.name}
            />
          );
        })}
      </div>
    );
  else return null;
};
