import CardList from "~/app/_components/CardLIst";
import { loadTracks } from "~/app/_service/loadHelper";

export default function Tracks({ params }: { params: { map: string } }) {
  const map = decodeURI(params.map);
  const tracks = loadTracks(map);
  if (tracks.length > 0)
    return (
      <>
        <CardList data={tracks} path={"/records/"} />
      </>
    );
  else return null;
}
