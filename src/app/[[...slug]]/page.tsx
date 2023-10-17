import { MapList } from "../_components/MapList";
import NavBar from "../_components/NavBar";
import { SimulatorList } from "../_components/SimulatorList";
import { TrackList } from "../_components/TrackList";
import { TreePath } from "../_components/TreePath";

export default function Home({ params }: { params: { slug: string[] } }) {
  let level: "simulator" | "map" | "track";
  let simulator = "";
  let map = "";
  if (!params.slug || params.slug.length === 0) {
    level = "simulator";
  } else if (params.slug.length === 1) {
    simulator = decodeURI(params.slug[0]!);
    level = "map";
  } else {
    level = "track";
    map = decodeURI(params.slug[1]!);
    simulator = decodeURI(params.slug[0]!);
  }
  return (
    <>
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white ">
        <NavBar map={map} sim={simulator} />
        <TreePath map={map} sim={simulator} />
        <div className="flex grow">
          {level === "simulator" ? <SimulatorList /> : null}
          {level === "map" ? <MapList sim_name={simulator} /> : null}
          {level === "track" ? <TrackList map_name={map} /> : null}
        </div>
      </main>
    </>
  );
}
