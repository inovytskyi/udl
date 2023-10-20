"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CardImage } from "~/app/_components/CardImage";
import { Spinner } from "~/app/_components/Spinner";
import { api } from "~/trpc/react";

export default function Tracks({ params }: { params: { slug: string } }) {
  const map = decodeURI(params.slug);
  const tracks = api.tracks.get_tracks.useQuery({ map_name: map });
  if (tracks.isError) return <div>Error: {tracks.error.message}</div>;
  if (tracks.isLoading) return <Spinner />;
  if (tracks.isSuccess)
    return (
      <>
        <div className="m-4 flex grow flex-wrap gap-4">
          {tracks.data.map((track) => {
            return (
              <Link key={String(track.id)} href={"/records/" + track.name}>
                <CardImage image={track.image} name={track.name} />
              </Link>
            );
          })}
        </div>
      </>
    );
  else redirect("/");
}
