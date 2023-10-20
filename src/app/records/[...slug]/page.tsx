"use client";
import { CardImage } from "~/app/_components/CardImage";
import { PostForm } from "~/app/_components/PostForm";
import { Spinner } from "~/app/_components/Spinner";
import { SessionProvider, useSession } from "next-auth/react";
import { api } from "~/trpc/react";

function Records({ params }: { params: { slug: string } }) {
  const track_name = decodeURI(params.slug);
  const track = api.tracks.get_track.useQuery({ track_name });
  const records = api.records.get_records.useQuery(
    { trackname: track_name },
    { enabled: !!track.data?.id },
  );
  if (records.isError) return <div>Error: {records.error.message}</div>;
  if (track.isError) return <div>Error: {track.error.message}</div>;
  if (records.isLoading || track.isLoading) return <Spinner />;
  if (records.isSuccess && track.isSuccess && track.data)
    return (
      <>
        <div className="m-4 flex gap-4">
          <CardImage name={track.data.name} image={track.data.image} />

          {records.data.length == 0 && <span>No records</span>}
          <ul>
            {!!records &&
              records.data.map((value) => {
                return (
                  <li key={value.id}>
                    <span>{value.user.name}</span>-
                    <span>{value.time + "ms"}</span>
                  </li>
                );
              })}
          </ul>
        </div>
        <SessionProvider>
          <PostForm track={track.data} />
        </SessionProvider>
      </>
    );
  else return null;
}
export default Records;
