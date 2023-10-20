import CardList from "~/app/_components/CardLIst";
import { loadMaps } from "~/app/_service/loadHelper";

export default function Maps({ params }: { params: { sim: string } }) {
  const simulator = decodeURI(params.sim);
  const maps = loadMaps(simulator);
  if (maps && maps.length > 0)
    return (
      <>
        <CardList data={maps} path={"/tracks/"} />
      </>
    );
  else return null;
}
