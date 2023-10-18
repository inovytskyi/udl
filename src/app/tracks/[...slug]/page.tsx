import { type Track } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CardImage } from "~/app/_components/CardImage";
import { NavBar } from "~/app/_components/NavBar";
import { TreePath } from "~/app/_components/TreePath";
import { api } from "~/trpc/server";

export default async function Tracks({ params }: { params: { slug: string } }) {
  const map = decodeURI(params.slug);
  const tracks: Track[] = await api.tracks.get_tracks.query({ map_name: map });
  if (tracks.length > 0)
    return (
      <>
        <div className="m-4 flex grow flex-wrap gap-4">
          {tracks.map((track) => {
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
