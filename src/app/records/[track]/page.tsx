import { Suspense } from "react";
import { CardImage } from "~/app/_components/CardImage";
import { RecordsView } from "~/app/_components/RecordsView";
import { loadSingleTrack } from "~/app/_service/loadHelper";

export default function Records({ params }: { params: { track: string } }) {
  const track_name = decodeURI(params.track);
  const track = loadSingleTrack(track_name);
  if (track) {
    return (
      <>
        <div className="m-4 flex gap-4">
          <CardImage name={track.name} image={track.image} />
          <Suspense fallback={<div>Loading...</div>}>
            <RecordsView trackname={track_name} />
          </Suspense>
        </div>
      </>
    );
  } else return null;
}
