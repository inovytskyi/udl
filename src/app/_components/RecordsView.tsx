import { api } from "~/trpc/server";

export const RecordsView = async ({ trackname }: { trackname: string }) => {
  const records = await api.records.get_records.query({ trackname });
  return (
    <>
      {records.length == 0 && <span>No records</span>}
      <ul>
        {!!records &&
          records.map((value) => {
            return (
              <li key={value.id}>
                <span>{value.user.name && value.user.name}</span>-
                <span>{value.time + "ms"}</span>
              </li>
            );
          })}
      </ul>
    </>
  );
};
