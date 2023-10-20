import Link from "next/link";
import { CardImage } from "~/app/_components/CardImage";
import { loadTracks } from "~/app/_service/loadHelper";

export default function Tracks({ params }: { params: { map: string } }) {
  const map = decodeURI(params.map);
  const tracks = loadTracks(map);
  if (tracks.length > 0)
    return (
      <>
        <div className="m-4 flex grow flex-wrap gap-4">
          {tracks.map((track) => {
            return (
              <Link key={track.name} href={"/records/" + track.name}>
                <CardImage image={track.image} name={track.name} />
              </Link>
            );
          })}
        </div>
      </>
    );
  else return null;
}
