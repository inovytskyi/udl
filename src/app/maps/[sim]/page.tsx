import Link from "next/link";
import { CardImage } from "~/app/_components/CardImage";
import { loadMaps } from "~/app/_service/loadHelper";

export default function Maps({ params }: { params: { sim: string } }) {
  const simulator = decodeURI(params.sim);
  const maps = loadMaps(simulator);
  if (maps && maps.length > 0)
    return (
      <>
        <div className="m-4 flex grow flex-wrap gap-4">
          {maps.map((map) => {
            return (
              <Link key={map.name} href={"/tracks/" + map.name}>
                <CardImage image={map.image} name={map.name} />
              </Link>
            );
          })}
        </div>
      </>
    );
  else return null;
}
