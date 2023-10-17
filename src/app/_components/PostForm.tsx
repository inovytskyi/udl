"use client";
import { type Track } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { api } from "~/trpc/react";
type Props = {
  track: Track;
  user_id: string;
};

export function PostForm(props: Props) {
  const [time, setTime] = useState("");
  const [isLoading, setLoad] = useState(false);
  const router = useRouter();
  const mutation = api.records.post_record.useMutation({
    onError: (error) => {
      console.log(error);
    },
    onMutate: () => {
      setLoad(true);
    },
    onSettled: () => {
      setLoad(false);
    },
    onSuccess: () => {
      // router.refresh();
    },
  });

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    setTime("");
    mutation.mutate({
      track_id: props.track.id,
      user_id: props.user_id,
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
