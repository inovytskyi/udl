import Link from "next/link";

type Props = {
  sim?: string;
  map?: string;
};
export const TreePath = (props: Props) => {
  return (
    <div className="flex border-b-2 border-blue-800 p-2">
      <Link href="/">Home</Link>
      <span className="mx-2">{">>"}</span>
      {!!props.sim && (
        <>
          <Link href={"/" + props.sim}>{props.sim}</Link>
        </>
      )}
      {!!props.sim && !!props.map && (
        <>
          <span className="mx-2">{">>"}</span>
          <Link href={"/" + props.sim + "/" + props.map}>{props.map}</Link>{" "}
        </>
      )}
    </div>
  );
};
