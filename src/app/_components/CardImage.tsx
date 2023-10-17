type Props = {
  name: string;
  image: string;
  key: string;
};

export const CardImage = (props: Props) => {
  return (
    <div key={props.key} className="flex flex-col p-4 rounded-2xl group ">
      <img  className="h-80 rounded-3xl" alt={props.name} src={"/images/"+props.image} />
        <div className="flex justify-center bg-sky-700 rounded-2xl group-hover:bg-sky-900 group-hover:text-indigo-200">{props.name}</div>
    </div>
  );
};
