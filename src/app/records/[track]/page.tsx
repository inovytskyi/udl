import { Suspense } from "react";
import { CardImage } from "~/app/_components/CardImage";
import { PostForm } from "~/app/_components/PostForm";
import { RecordsView } from "~/app/_components/RecordsView";
import { Spinner } from "~/app/_components/Spinner";
import { loadSingleTrack } from "~/app/_service/loadHelper";
import { getServerAuthSession } from "~/server/auth";

export default async function Records({
  params,
}: {
  params: { track: string };
}) {
  const session = await getServerAuthSession();
  const track_name = decodeURI(params.track);
  const track = loadSingleTrack(track_name);
  if (track) {
    return (
      <>
        <div className="m-4 flex flex-wrap gap-4">
          <CardImage name={track.name} image={track.image} />
          <Suspense fallback={<Spinner />}>
            <RecordsView trackname={track_name} />
          </Suspense>
          {!!session && <PostForm trackname={track_name} />}
        </div>
      </>
    );
  } else return null;
}
