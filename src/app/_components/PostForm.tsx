"use client";
import { useState, type FormEvent } from "react";
import { api } from "~/trpc/react";
type Props = {
  trackname: string;
};

export function PostForm(props: Props) {
  const [time, setTime] = useState("");
  const [isLoading, setLoad] = useState(false);
  const utils = api.useContext();
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
      setLoad(false);
      void utils.records.get_records.invalidate({ trackname: props.trackname });
    },
  });

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    setTime("");
    mutation.mutate({
      track_name: props.trackname,
      time: Number(time),
    });
  };
  return (
    <form
      onSubmit={submitHandler}
      className="flex h-fit items-center gap-2 text-black"
    >
      <input
        type="text"
        value={time}
        onChange={(event) => setTime(event.target.value)}
        disabled={isLoading}
        className="h-fit rounded-md border-2 border-indigo-700"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="rounded-md bg-blue-500 px-7 py-1 text-white"
      >
        Post
      </button>
    </form>
  );
}
