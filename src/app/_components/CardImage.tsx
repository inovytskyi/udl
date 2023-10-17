import Image from "next/image";
type Props = {
  name: string;
  image: string;
};

export const CardImage = (props: Props) => {
  return (
    <div className="rounded-2xlp-4 group flex flex-col ">
      <Image
        className="rounded-3xl"
        alt={props.name}
        src={"/images/" + props.image}
        height={160}
        width={330}
      />
      <div className="flex justify-center rounded-2xl bg-sky-700 group-hover:bg-sky-900 group-hover:text-indigo-200">
        {props.name}
      </div>
    </div>
  );
};
