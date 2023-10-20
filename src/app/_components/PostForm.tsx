"use client";
import { type Track } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState, type FormEvent } from "react";
import { api } from "~/trpc/react";

type Props = {
  track: Track;
};

export function PostForm(props: Props) {
  const { data: session, status } = useSession();
  const [time, setTime] = useState("");
  const [isLoading, setLoad] = useState(false);
  const utils = api.useContext();
  const mutation = api.records.post_record.useMutation({
    onError: (error) => {
      setLoad(false);
      console.log("ERROR!!!:", error);
    },
    onSuccess: () => {
      setLoad(false);
      void utils.records.get_records.invalidate({
        trackname: props.track.name,
      });
    },
  });
  if (!session || status !== "authenticated") return null;

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    setTime("");
    setLoad(true);
    mutation.mutate({
      track_id: props.track.id,
      time: Number(time),
    });
  };
  return (
    <form onSubmit={submitHandler} className="text-black">
      <input
        type="text"
        value={time}
        onChange={(event) => setTime(event.target.value)}
      ></input>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white"
      >
        Post
      </button>
    </form>
  );
}
