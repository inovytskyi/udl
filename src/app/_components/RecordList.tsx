import { type Track, type Record, User } from "@prisma/client";
import { api } from "~/trpc/server";
import { CardImage } from "./CardImage";
import { getServerAuthSession } from "~/server/auth";
import { PostForm } from "./PostForm";

export const RecordList = async ({ track_name }: { track_name: string }) => {
  const track: Track | null = await api.tracks.get_track.query({ track_name });
  if (track) {
    const session = await getServerAuthSession();
    const records = await api.records.get_records.query({
      trackname: track_name,
    });
    return (
      <div className="m-4 flex grow flex-wrap gap-4">
        <CardImage name={track.name} image={track.image} />

        {records.length == 0 && <span>No records</span>}
        <ul>
          {!!records &&
            records.map((value) => {
              return (
                <li key={value.id}>
                  <span>{value.user.name}</span>-
                  <span>{value.time + "ms"}</span>
                </li>
              );
            })}
        </ul>
        {!!session && !!session.user && (
          <PostForm track={track} user_id={session.user.id} />
        )}
      </div>
    );
  } else return <></>;
};
