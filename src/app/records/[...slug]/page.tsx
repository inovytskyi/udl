import { redirect } from "next/navigation";
import { CardImage } from "~/app/_components/CardImage";
import { NavBar } from "~/app/_components/NavBar";
import { TreePath } from "~/app/_components/TreePath";
import { api } from "~/trpc/server";

async function Records({ params }: { params: { slug: string } }) {
  const track_name = decodeURI(params.slug);
  const track = await api.tracks.get_track.query({ track_name });
  if (track) {
    const records = await api.records.get_records.query({
      trackname: track_name,
    });

    return (
      <>
        <div className="m-4 flex gap-4">
          <CardImage name={track.name} image={track.image} />

          {records.length == 0 && <span>No records</span>}
          <ul>
            {!!records &&
              records.map((value) => {
                return (
                  <li key={value.id}>
                    <span>{value.user.name}</span>-
                    <span>{value.time + "ms"}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </>
    );
  } else redirect("/");
}
export default Records;
