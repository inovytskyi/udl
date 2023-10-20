import Link from "next/link";
import { type Map } from "@prisma/client";
import { CardImage } from "~/app/_components/CardImage";
import { NavBar } from "~/app/_components/NavBar";
import { TreePath } from "~/app/_components/TreePath";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function Maps({ params }: { params: { slug: string } }) {
  const simulator = decodeURI(params.slug);
  const maps: Map[] = await api.tracks.get_maps.query({ sim_name: simulator });
  if (maps.length > 0)
    return (
      <>
        <div className="m-4 flex grow flex-wrap gap-4">
          {maps.map((map) => {
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
