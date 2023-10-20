"use client";
import Link from "next/link";
import { CardImage } from "~/app/_components/CardImage";
import { api } from "~/trpc/react";
import { redirect } from "next/navigation";
import { Spinner } from "~/app/_components/Spinner";

export default function Maps({ params }: { params: { slug: string } }) {
  const simulator = decodeURI(params.slug);
  const maps = api.tracks.get_maps.useQuery({ sim_name: simulator });
  if (maps.isError) return <div>Error: {maps.error.message}</div>;
  if (maps.isLoading) return <Spinner />;
  if (maps.isSuccess)
    return (
      <>
        <div className="m-4 flex grow flex-wrap gap-4">
          {maps.data.map((map) => {
            return (
              <Link key={String(map.id)} href={"/tracks/" + map.name}>
                <CardImage image={map.image} name={map.name} />
              </Link>
            );
          })}
        </div>
      </>
    );
  else redirect("/");
}
